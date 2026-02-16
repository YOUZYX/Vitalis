/**
 * RESET DEMO SCRIPT
 *
 * Wipes all submissions, bounties, and logs.
 * Resets user/worker vitality to 100.
 * Resets system agents to 100.
 *
 * Usage: npx tsx scripts/reset-demo.ts
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
dotenv.config({ path: "../../.env.local" });

const prisma = new PrismaClient();

async function main() {
    console.log("🔄 STARTING DEMO RESET...");

    // 1. Delete all transactional data
    console.log("🗑️  Deleting Submissions...");
    await prisma.submission.deleteMany();

    console.log("🗑️  Deleting Bounties...");
    await prisma.bounty.deleteMany();

    console.log("🗑️  Deleting Agent Logs (audit trail)...");
    await prisma.agentLog.deleteMany();

    // 2. Reset Agents
    console.log("❤️  Resetting Vitality for all agents...");

    // Reset everyone to 100 vitality, 0 lastPulseBlock, active=true
    await prisma.agent.updateMany({
        data: {
            vitality: 100,
            lastPulseBlock: BigInt(0),
            isActive: true,
            createdAt: new Date(), // Reset "Age" too
        },
    });

    // 3. Create fresh "System Boot" logs
    const agents = await prisma.agent.findMany();
    for (const agent of agents) {
        await prisma.agentLog.create({
            data: {
                agentId: agent.id,
                reasoning: "System Reset. Vitality restored to 100%.",
                actionTaken: "system_reset",
            },
        });
    }

    console.log("✅ DEMO RESET COMPLETE!");
    console.log(`   - Wiped ${agents.length} agents' history.`);
    console.log(`   - Restored full health.`);
}

main()
    .catch((e) => {
        console.error("❌ Reset failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
