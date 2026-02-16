/**
 * Prisma Seed Script — Insert System Agents
 *
 * Creates the 4 Core Agents + 1 Worker:
 *   1. Guardian   — Ecosystem health monitor
 *   2. Architect  — Bounty creator
 *   3. Validator  — Submission verifier
 *   4. Strategist — Metabolism optimizer
 *   5. Worker     — Demo external agent
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
dotenv.config({ path: "../../.env.local" });

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding Vitalis database...\n");

    // Use the deployer wallet as the system agent address base
    // In production, each agent would have its own wallet
    const DEPLOYER = process.env.WALLET_PRIVATE_KEY
        ? "deployer" // Will be derived below
        : "0x0000000000000000000000000000000000000000";

    // Create deterministic addresses for system agents
    // For MVP, we use the deployer address for all system agents
    // In production, each has its own key pair
    const systemAgents = [
        {
            walletAddress: "0x0000000000000000000000000000000000000001",
            role: "GUARDIAN" as const,
            vitality: 100,
            reputation: 100,
        },
        {
            walletAddress: "0x0000000000000000000000000000000000000002",
            role: "ARCHITECT" as const,
            vitality: 100,
            reputation: 100,
        },
        {
            walletAddress: "0x0000000000000000000000000000000000000003",
            role: "VALIDATOR" as const,
            vitality: 100,
            reputation: 100,
        },
        {
            walletAddress: "0x0000000000000000000000000000000000000004",
            role: "STRATEGIST" as const,
            vitality: 100,
            reputation: 100,
        },
        {
            walletAddress: "0x0000000000000000000000000000000000000005",
            role: "WORKER" as const,
            vitality: 100,
            reputation: 50,
        },
    ];

    for (const agent of systemAgents) {
        const result = await prisma.agent.upsert({
            where: { walletAddress: agent.walletAddress },
            update: {},
            create: {
                walletAddress: agent.walletAddress,
                role: agent.role,
                vitality: agent.vitality,
                reputation: agent.reputation,
                isActive: true,
                lastPulseBlock: BigInt(0),
            },
        });

        console.log(`  ✅ ${agent.role.padEnd(12)} — ${result.id} (${agent.walletAddress})`);
    }

    // Create initial logs for each system agent
    const agents = await prisma.agent.findMany({
        where: {
            role: { in: ["GUARDIAN", "ARCHITECT", "VALIDATOR", "STRATEGIST"] },
        },
    });

    for (const agent of agents) {
        await prisma.agentLog.create({
            data: {
                agentId: agent.id,
                reasoning: `${agent.role} agent initialized. Standing by.`,
                actionTaken: "system_boot",
            },
        });
    }

    console.log("\n  📋 Created initial boot logs for all system agents");
    console.log("\n🌱 Seed complete!\n");
}

main()
    .catch((e) => {
        console.error("Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
