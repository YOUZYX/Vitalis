import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
    console.log("╔══════════════════════════════════════════╗");
    console.log("║  🧬 Deploying Vitalis to Monad Testnet  ║");
    console.log("╚══════════════════════════════════════════╝\n");

    const [deployer] = await ethers.getSigners();
    console.log(`Deployer: ${deployer.address}`);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log(`Balance:  ${ethers.formatEther(balance)} MON\n`);

    // ─── 1. Deploy VitalityRegistry ──────────────────────────────────

    console.log("1/3 Deploying VitalityRegistry...");
    const RegistryFactory = await ethers.getContractFactory("VitalityRegistry");
    const registry = await RegistryFactory.deploy();
    await registry.waitForDeployment();
    const registryAddr = await registry.getAddress();
    console.log(`    ✅ VitalityRegistry: ${registryAddr}\n`);

    // ─── 2. Deploy VitalisBounty ─────────────────────────────────────

    console.log("2/3 Deploying VitalisBounty...");
    const BountyFactory = await ethers.getContractFactory("VitalisBounty");
    const bountyContract = await BountyFactory.deploy(registryAddr);
    await bountyContract.waitForDeployment();
    const bountyAddr = await bountyContract.getAddress();
    console.log(`    ✅ VitalisBounty:    ${bountyAddr}\n`);

    // ─── 3. Authorize Bounty contract in Registry ────────────────────

    console.log("3/3 Authorizing VitalisBounty in VitalityRegistry...");
    const authTx = await registry.setBountyContract(bountyAddr);
    await authTx.wait();
    console.log(`    ✅ Bounty contract authorized (tx: ${authTx.hash})\n`);

    // ─── Save Deployment Addresses ───────────────────────────────────

    const deployments = {
        network: "monad-testnet",
        chainId: 10143,
        deployer: deployer.address,
        contracts: {
            VitalityRegistry: registryAddr,
            VitalisBounty: bountyAddr,
        },
        transactions: {
            registryDeploy: registry.deploymentTransaction()?.hash,
            bountyDeploy: bountyContract.deploymentTransaction()?.hash,
            setBountyContract: authTx.hash,
        },
        deployedAt: new Date().toISOString(),
    };

    fs.writeFileSync("deployments.json", JSON.stringify(deployments, null, 2));

    console.log("═══════════════════════════════════════════");
    console.log("  Deployment Complete! 🎉");
    console.log("  Addresses saved to deployments.json");
    console.log("═══════════════════════════════════════════");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
