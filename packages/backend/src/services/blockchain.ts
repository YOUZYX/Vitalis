/**
 * Blockchain Service — ethers v6 wrapper for Vitalis contracts
 *
 * Reads deployed addresses from contracts/deployments.json.
 * Reads ABIs from contract artifacts.
 * Provides typed functions: getVitality, createBounty, approveSubmission.
 */

import { ethers, JsonRpcProvider, Wallet, Contract } from "ethers";
import * as deployments from "../../../contracts/deployments.json";

// ─── ABI Imports (only the function fragments we need) ───────────────

const REGISTRY_ABI = [
    "function getVitality(address agent) view returns (int256)",
    "function pulse(address agent)",
    "function prune(address agent)",
    "function registerAgent(address agent)",
    "function updateMetabolicParams(uint256 _decayRate, uint256 _pulseAmount)",
    "function setBountyContract(address _bountyContract)",
    "function setStrategist(address _strategist)",
    "function decayRate() view returns (uint256)",
    "function pulseAmount() view returns (uint256)",
    "function agents(address) view returns (int256 storedVitality, uint256 lastUpdateBlock, bool isActive, bool isRegistered)",
    "event VitalityPulse(address indexed agent, uint256 newAmount)",
    "event AgentPruned(address indexed agent)",
    "event ParametersUpdated(uint256 newDecayRate, uint256 newPulseAmount)",
    "event AgentRegistered(address indexed agent, int256 initialVitality)",
];

const BOUNTY_ABI = [
    "function createBounty(string metadataURI) payable returns (bytes32)",
    "function approveSubmission(bytes32 bountyId, address worker)",
    "function getBounty(bytes32 bountyId) view returns (address creator, string metadataURI, uint256 reward, bool isActive, bool isCompleted)",
    "function addApprover(address _approver)",
    "function removeApprover(address _approver)",
    "function bountyCount() view returns (uint256)",
    "event BountyCreated(bytes32 indexed bountyId, uint256 reward)",
    "event SubmissionApproved(bytes32 indexed bountyId, address indexed worker)",
];

// ─── Contract Addresses ──────────────────────────────────────────────

const REGISTRY_ADDRESS = deployments.contracts.VitalityRegistry;
const BOUNTY_ADDRESS = deployments.contracts.VitalisBounty;

// ─── Provider & Wallet Setup ─────────────────────────────────────────

const RPC_URL = process.env.MONAD_RPC_URL || "https://testnet-rpc.monad.xyz";
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

let provider: JsonRpcProvider;
let wallet: Wallet;
let registryContract: Contract;
let bountyContract: Contract;

export function initBlockchain() {
    // ─── Validate private key before ethers touches it ───────────
    const key = process.env.WALLET_PRIVATE_KEY || PRIVATE_KEY;
    if (!key || !key.startsWith("0x") || key.length < 64) {
        console.error("❌ FATAL: WALLET_PRIVATE_KEY is missing or invalid (must start with 0x)");
        console.error("   Current value length:", key ? key.length : 0);
        console.error("   Starts with 0x:", key ? key.startsWith("0x") : false);
        process.exit(1);
    }

    provider = new JsonRpcProvider(RPC_URL);
    wallet = new Wallet(key, provider);

    registryContract = new Contract(REGISTRY_ADDRESS, REGISTRY_ABI, wallet);
    bountyContract = new Contract(BOUNTY_ADDRESS, BOUNTY_ABI, wallet);

    console.log(`⛓️  Blockchain service initialized`);
    console.log(`   Registry: ${REGISTRY_ADDRESS}`);
    console.log(`   Bounty:   ${BOUNTY_ADDRESS}`);
    console.log(`   Wallet:   ${wallet.address}`);
}

// ─── Nonce Mutex — serializes ALL wallet writes ──────────────────────
// Prevents "nonce too low" when Architect + Validator fire simultaneously.

let nonceLock: Promise<void> = Promise.resolve();

async function withNonceLock<T>(fn: () => Promise<T>): Promise<T> {
    let release: () => void;
    const prev = nonceLock;
    nonceLock = new Promise<void>((res) => { release = res; });

    await prev; // wait for previous tx to finish

    try {
        const result = await fn();
        // 2s sleep — let mempool catch up before next tx
        await new Promise((r) => setTimeout(r, 2000));
        return result;
    } finally {
        release!();
    }
}

// ─── Registry Functions ──────────────────────────────────────────────

export async function getVitality(agentAddress: string): Promise<bigint> {
    return registryContract.getVitality(agentAddress);
}

export async function getAgentData(agentAddress: string) {
    const data = await registryContract.agents(agentAddress);
    return {
        storedVitality: data.storedVitality as bigint,
        lastUpdateBlock: data.lastUpdateBlock as bigint,
        isActive: data.isActive as boolean,
        isRegistered: data.isRegistered as boolean,
    };
}

export async function registerAgent(agentAddress: string) {
    return withNonceLock(async () => {
        const tx = await registryContract.registerAgent(agentAddress);
        const receipt = await tx.wait();
        return { txHash: tx.hash, receipt };
    });
}

export async function pruneAgent(agentAddress: string) {
    return withNonceLock(async () => {
        const tx = await registryContract.prune(agentAddress);
        const receipt = await tx.wait();
        return { txHash: tx.hash, receipt };
    });
}

export async function getMetabolicParams() {
    const [decayRate, pulseAmount] = await Promise.all([
        registryContract.decayRate(),
        registryContract.pulseAmount(),
    ]);
    return {
        decayRate: Number(decayRate),
        pulseAmount: Number(pulseAmount),
    };
}

export async function updateMetabolicParams(decayRate: number, pulseAmount: number) {
    return withNonceLock(async () => {
        const tx = await registryContract.updateMetabolicParams(decayRate, pulseAmount);
        const receipt = await tx.wait();
        return { txHash: tx.hash, receipt };
    });
}

// ─── Bounty Functions ────────────────────────────────────────────────

export async function createBountyOnChain(metadataURI: string, rewardMON: string) {
    return withNonceLock(async () => {
        const tx = await bountyContract.createBounty(metadataURI, {
            value: ethers.parseEther(rewardMON),
        });
        const receipt = await tx.wait();

        // Extract bountyId from event
        let bountyId: string = "";
        for (const log of receipt.logs) {
            try {
                const parsed = bountyContract.interface.parseLog({
                    topics: log.topics as string[],
                    data: log.data,
                });
                if (parsed && parsed.name === "BountyCreated") {
                    bountyId = parsed.args[0];
                    break;
                }
            } catch {
                // Not our event
            }
        }

        return { txHash: tx.hash, bountyId, receipt };
    });
}

export async function approveSubmissionOnChain(bountyId: string, workerAddress: string) {
    return withNonceLock(async () => {
        const tx = await bountyContract.approveSubmission(bountyId, workerAddress);
        const receipt = await tx.wait();
        return { txHash: tx.hash, receipt };
    });
}

export async function getBountyOnChain(bountyId: string) {
    const data = await bountyContract.getBounty(bountyId);
    return {
        creator: data[0] as string,
        metadataURI: data[1] as string,
        reward: ethers.formatEther(data[2]),
        isActive: data[3] as boolean,
        isCompleted: data[4] as boolean,
    };
}

// ─── Block & Leaderboard ─────────────────────────────────────────────

export async function getBlockNumber(): Promise<number> {
    const block = await provider.getBlockNumber();
    return block;
}

export async function getAllAgents(agentAddresses: string[]): Promise<
    Array<{
        address: string;
        storedVitality: number;
        lastUpdateBlock: number;
        isActive: boolean;
        isRegistered: boolean;
        currentVitality: number;
    }>
> {
    const currentBlock = await getBlockNumber();
    const decayRate = Number(await registryContract.decayRate());

    const results = await Promise.allSettled(
        agentAddresses.map(async (address) => {
            const data = await registryContract.agents(address);
            const stored = Number(data.storedVitality);
            const lastUpdate = Number(data.lastUpdateBlock);
            const blockDelta = currentBlock - lastUpdate;
            const decayed = decayRate > 0 ? Math.floor(blockDelta / decayRate) : 0;
            const currentVitality = Math.max(stored - decayed, 0);

            return {
                address,
                storedVitality: stored,
                lastUpdateBlock: lastUpdate,
                isActive: data.isActive as boolean,
                isRegistered: data.isRegistered as boolean,
                currentVitality,
            };
        })
    );

    return results
        .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
        .map((r) => r.value);
}

// ─── Chain Query Utilities ───────────────────────────────────────────

export async function getAgentCount(): Promise<number> {
    try {
        const count = await bountyContract.bountyCount();
        return Number(count);
    } catch {
        return 0;
    }
}

export async function getGasPrice(): Promise<bigint> {
    const feeData = await provider.getFeeData();
    return feeData.gasPrice ?? 0n;
}

export async function isAgentActive(agentAddress: string): Promise<boolean> {
    const data = await registryContract.agents(agentAddress);
    return data.isActive as boolean;
}

// ─── Utility ─────────────────────────────────────────────────────────

export function getProvider() {
    return provider;
}

export function getWallet() {
    return wallet;
}

export function getWalletAddress() {
    return wallet.address;
}

export { REGISTRY_ADDRESS, BOUNTY_ADDRESS };
