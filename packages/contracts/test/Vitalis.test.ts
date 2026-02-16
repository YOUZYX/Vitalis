import { expect } from "chai";
import { ethers } from "hardhat";
import { VitalityRegistry, VitalisBounty } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Vitalis Smart Contracts", function () {
    let registry: VitalityRegistry;
    let bounty: VitalisBounty;
    let owner: HardhatEthersSigner;
    let validator: HardhatEthersSigner;
    let worker: HardhatEthersSigner;
    let pruner: HardhatEthersSigner;
    let strategist: HardhatEthersSigner;

    beforeEach(async function () {
        [owner, validator, worker, pruner, strategist] = await ethers.getSigners();

        // Deploy VitalityRegistry
        const RegistryFactory = await ethers.getContractFactory("VitalityRegistry");
        registry = await RegistryFactory.deploy();
        await registry.waitForDeployment();

        // Deploy VitalisBounty (linked to Registry)
        const BountyFactory = await ethers.getContractFactory("VitalisBounty");
        bounty = await BountyFactory.deploy(await registry.getAddress());
        await bounty.waitForDeployment();

        // Wire up: authorize VitalisBounty to call pulse()
        await registry.setBountyContract(await bounty.getAddress());

        // Set strategist
        await registry.setStrategist(strategist.address);

        // Register worker agent with 100 VITA
        await registry.registerAgent(worker.address);

        // Add validator as an approver on the bounty contract
        await bounty.addApprover(validator.address);

        // Fund registry for prune rewards
        await owner.sendTransaction({
            to: await registry.getAddress(),
            value: ethers.parseEther("1"),
        });
    });

    // ─── Test 1: Decay ───────────────────────────────────────────────

    describe("Decay", function () {
        it("should start with 100 vitality", async function () {
            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.equal(100);
        });

        it("should decay by 1 VITA after 1000 blocks", async function () {
            // Mine 1000 blocks
            await mineBlocks(1000);

            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.equal(99); // 100 - (1000/1000) = 99
        });

        it("should decay by 5 VITA after 5000 blocks", async function () {
            await mineBlocks(5000);

            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.equal(95); // 100 - (5000/1000) = 95
        });

        it("should return 0 for unregistered agents", async function () {
            const vitality = await registry.getVitality(pruner.address);
            expect(vitality).to.equal(0);
        });

        it("should go negative after enough blocks", async function () {
            // 100 * 1000 = 100_000 blocks to fully decay, then more
            await mineBlocks(110_000);

            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.be.lessThanOrEqual(0);
        });
    });

    // ─── Test 2: Pulse ───────────────────────────────────────────────

    describe("Pulse", function () {
        it("should add +50 VITA on successful bounty approval", async function () {
            // Decay a bit first
            await mineBlocks(10_000); // -10 VITA → 90

            // Create a bounty (as owner/agent)
            const tx = await bounty.createBounty("ipfs://test-bounty", {
                value: ethers.parseEther("0.01"),
            });
            const receipt = await tx.wait();

            // Extract bountyId from event
            const bountyId = await getBountyIdFromReceipt(receipt!);

            // Approve submission (validator)
            await bounty.connect(validator).approveSubmission(bountyId, worker.address);

            // Vitality should be ~90 + 50 = ~140 (accounting for a few extra blocks)
            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.be.greaterThanOrEqual(138); // Allow 2 blocks for tx processing
            expect(vitality).to.be.lessThanOrEqual(140);
        });

        it("should revert if caller is not the bounty contract", async function () {
            await expect(
                registry.connect(validator).pulse(worker.address)
            ).to.be.revertedWithCustomError(registry, "NotAuthorized");
        });

        it("should revert for inactive agents", async function () {
            // Force decay and prune
            await mineBlocks(110_000);
            await registry.prune(worker.address);

            // Try to pulse via bounty
            const tx = await bounty.createBounty("ipfs://test", {
                value: ethers.parseEther("0.01"),
            });
            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);

            await expect(
                bounty.connect(validator).approveSubmission(bountyId, worker.address)
            ).to.be.revertedWithCustomError(registry, "AgentNotActive");
        });
    });

    // ─── Test 3: Pruning ─────────────────────────────────────────────

    describe("Pruning", function () {
        it("should prune agent at 0 vitality and mark inactive", async function () {
            // Decay all vitality: 100 * 1000 = 100_000 blocks
            await mineBlocks(101_000);

            const vitalityBefore = await registry.getVitality(worker.address);
            expect(vitalityBefore).to.be.lessThanOrEqual(0);

            // Prune (anyone can call)
            await registry.connect(pruner).prune(worker.address);

            // Agent should be inactive
            const agentData = await registry.agents(worker.address);
            expect(agentData.isActive).to.equal(false);
        });

        it("should emit AgentPruned event", async function () {
            await mineBlocks(101_000);

            await expect(registry.connect(pruner).prune(worker.address))
                .to.emit(registry, "AgentPruned")
                .withArgs(worker.address);
        });

        it("should revert if agent is still alive", async function () {
            await expect(
                registry.connect(pruner).prune(worker.address)
            ).to.be.revertedWithCustomError(registry, "AgentStillAlive");
        });

        it("should revert if agent is already pruned", async function () {
            await mineBlocks(101_000);
            await registry.connect(pruner).prune(worker.address);

            await expect(
                registry.connect(pruner).prune(worker.address)
            ).to.be.revertedWithCustomError(registry, "AgentNotActive");
        });

        it("should return 0 vitality for pruned agents", async function () {
            await mineBlocks(101_000);
            await registry.connect(pruner).prune(worker.address);

            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.equal(0);
        });
    });

    // ─── Test 4: Bounty Lifecycle ────────────────────────────────────

    describe("Bounty Lifecycle", function () {
        it("should create a bounty with locked MON", async function () {
            const reward = ethers.parseEther("0.1");

            const tx = await bounty.createBounty("ipfs://bounty-metadata", {
                value: reward,
            });

            await expect(tx).to.emit(bounty, "BountyCreated");

            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);
            const bountyData = await bounty.getBounty(bountyId);

            expect(bountyData.isActive).to.equal(true);
            expect(bountyData.reward).to.equal(reward);
        });

        it("should revert createBounty with 0 value", async function () {
            await expect(
                bounty.createBounty("ipfs://zero")
            ).to.be.revertedWithCustomError(bounty, "InsufficientReward");
        });

        it("should pay worker and pulse on approval", async function () {
            const reward = ethers.parseEther("0.1");

            const tx = await bounty.createBounty("ipfs://task", { value: reward });
            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);

            const workerBalBefore = await ethers.provider.getBalance(worker.address);

            await bounty.connect(validator).approveSubmission(bountyId, worker.address);

            const workerBalAfter = await ethers.provider.getBalance(worker.address);
            expect(workerBalAfter - workerBalBefore).to.equal(reward);
        });

        it("should not allow double approval", async function () {
            const tx = await bounty.createBounty("ipfs://task", {
                value: ethers.parseEther("0.01"),
            });
            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);

            await bounty.connect(validator).approveSubmission(bountyId, worker.address);

            await expect(
                bounty.connect(validator).approveSubmission(bountyId, worker.address)
            ).to.be.revertedWithCustomError(bounty, "BountyNotActive");
        });

        it("should revert if non-approver tries to approve", async function () {
            const tx = await bounty.createBounty("ipfs://task", {
                value: ethers.parseEther("0.01"),
            });
            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);

            await expect(
                bounty.connect(pruner).approveSubmission(bountyId, worker.address)
            ).to.be.revertedWithCustomError(bounty, "NotApprover");
        });
    });

    // ─── Test 5: Governance (Strategist) ─────────────────────────────

    describe("Governance", function () {
        it("should allow strategist to update metabolic params", async function () {
            await expect(
                registry.connect(strategist).updateMetabolicParams(2000, 75)
            )
                .to.emit(registry, "ParametersUpdated")
                .withArgs(2000, 75);

            expect(await registry.decayRate()).to.equal(2000);
            expect(await registry.pulseAmount()).to.equal(75);
        });

        it("should revert if non-strategist tries to update", async function () {
            await expect(
                registry.connect(worker).updateMetabolicParams(2000, 75)
            ).to.be.revertedWithCustomError(registry, "NotAuthorized");
        });

        it("should revert for zero decay rate", async function () {
            await expect(
                registry.connect(strategist).updateMetabolicParams(0, 50)
            ).to.be.revertedWithCustomError(registry, "InvalidDecayRate");
        });

        it("should affect decay calculation after param change", async function () {
            // Change decay rate to 500 (faster decay: 1 VITA per 500 blocks)
            await registry.connect(strategist).updateMetabolicParams(500, 50);

            await mineBlocks(1000);

            const vitality = await registry.getVitality(worker.address);
            // With decayRate=500: 100 - (1000/500) = 98
            expect(vitality).to.equal(98);
        });
    });

    // ─── Helpers ─────────────────────────────────────────────────────

    async function mineBlocks(count: number): Promise<void> {
        await ethers.provider.send("hardhat_mine", [
            "0x" + count.toString(16),
        ]);
    }

    async function getBountyIdFromReceipt(
        receipt: any
    ): Promise<string> {
        const iface = bounty.interface;
        for (const log of receipt.logs) {
            try {
                const parsed = iface.parseLog({
                    topics: log.topics as string[],
                    data: log.data,
                });
                if (parsed && parsed.name === "BountyCreated") {
                    return parsed.args[0]; // bountyId
                }
            } catch {
                // Not our event, skip
            }
        }
        throw new Error("BountyCreated event not found in receipt");
    }
});
