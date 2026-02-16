/**
 * Chain Routes — On-chain reads and user registration
 *
 * GET  /chain/block          → current Monad block number
 * GET  /chain/agent/:address → on-chain agent data + current block
 * GET  /chain/leaderboard    → all agents ranked by vitality
 * POST /chain/register       → register user as WORKER agent on-chain
 */

import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";
import {
    getBlockNumber,
    getAgentData,
    registerAgent,
    getAllAgents,
    getMetabolicParams,
} from "../services/blockchain";

export async function chainRoutes(app: FastifyInstance) {
    // ─── GET /chain/block ─────────────────────────────────────────
    app.get("/block", async (_request, reply) => {
        try {
            const blockNumber = await getBlockNumber();
            return reply.send({ blockNumber });
        } catch (err: any) {
            return reply.code(500).send({ error: err.message });
        }
    });

    // ─── GET /chain/agent/:address ────────────────────────────────
    app.get("/agent/:address", async (request, reply) => {
        const { address } = request.params as { address: string };

        try {
            const [agentData, blockNumber, metabolicParams] = await Promise.all([
                getAgentData(address),
                getBlockNumber(),
                getMetabolicParams(),
            ]);

            const stored = Number(agentData.storedVitality);
            const lastUpdate = Number(agentData.lastUpdateBlock);
            const decayRate = metabolicParams.decayRate;
            const blockDelta = blockNumber - lastUpdate;
            const decayed = decayRate > 0 ? Math.floor(blockDelta / decayRate) : 0;
            const currentVitality = Math.max(stored - decayed, 0);
            const blocksUntilDeath = decayRate > 0 ? stored * decayRate - blockDelta : Infinity;

            return reply.send({
                address,
                storedVitality: stored,
                lastUpdateBlock: lastUpdate,
                isActive: agentData.isActive,
                isRegistered: agentData.isRegistered,
                currentVitality,
                blocksUntilDeath: Math.max(blocksUntilDeath, 0),
                blockNumber,
                decayRate,
                pulseAmount: metabolicParams.pulseAmount,
            });
        } catch (err: any) {
            return reply.code(500).send({ error: err.message });
        }
    });

    // ─── GET /chain/leaderboard ───────────────────────────────────
    app.get("/leaderboard", async (_request, reply) => {
        try {
            // Get all agent addresses + metadata from DB
            const dbAgents = await prisma.agent.findMany({
                select: {
                    walletAddress: true,
                    role: true,
                    id: true,
                    createdAt: true,
                    _count: {
                        select: {
                            submissions: { where: { isApproved: true } },
                        },
                    },
                },
            });

            const addresses = dbAgents
                .map((a: { walletAddress: string | null }) => a.walletAddress)
                .filter((addr: string | null): addr is string => !!addr && addr.length > 0);

            const onChainData = await getAllAgents(addresses);

            // Merge DB + on-chain data
            const SYSTEM_ROLES = ["GUARDIAN", "ARCHITECT", "VALIDATOR", "STRATEGIST"];

            const leaderboard = onChainData
                .map((chain: any) => {
                    const dbAgent = dbAgents.find(
                        (a: any) => a.walletAddress?.toLowerCase() === chain.address.toLowerCase()
                    );
                    const role = dbAgent?.role || "WORKER";

                    // System agents are infrastructure — always alive at 100
                    const isSystem = SYSTEM_ROLES.includes(role);

                    return {
                        address: chain.address,
                        name: dbAgent?.walletAddress?.slice(0, 10) || chain.address.slice(0, 10),
                        role,
                        currentVitality: isSystem ? 100 : chain.currentVitality,
                        storedVitality: isSystem ? 100 : chain.storedVitality,
                        isActive: isSystem ? true : chain.isActive,
                        isRegistered: isSystem ? true : chain.isRegistered,
                        bountiesCompleted: dbAgent?._count.submissions || 0,
                        createdAt: dbAgent?.createdAt || new Date(),
                    };
                })
                .sort((a, b) => {
                    // Sort primarily by Vitality, secondarily by Score
                    if (b.currentVitality !== a.currentVitality) {
                        return b.currentVitality - a.currentVitality;
                    }
                    return (b.bountiesCompleted || 0) - (a.bountiesCompleted || 0);
                });

            return reply.send({ leaderboard });
        } catch (err: any) {
            return reply.code(500).send({ error: err.message });
        }
    });

    // ─── POST /chain/register ─────────────────────────────────────
    const registerSchema = z.object({
        address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
    });

    app.post("/register", async (request, reply) => {
        const parsed = registerSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.code(400).send({ error: parsed.error.flatten() });
        }

        const { address } = parsed.data;

        try {
            // Check if already registered on-chain
            const existing = await getAgentData(address);
            if (existing.isRegistered) {
                return reply.code(409).send({ error: "Already registered on-chain" });
            }

            // Register on-chain (backend pays gas)
            const { txHash } = await registerAgent(address);

            // Create DB record
            const agent = await prisma.agent.create({
                data: {
                    role: "WORKER",
                    walletAddress: address,
                    isActive: true,
                },
            });

            return reply.send({
                success: true,
                agentId: agent.id,
                txHash,
                initialVitality: 100,
            });
        } catch (err: any) {
            console.error("❌ Registration failed:", err.message);
            return reply.code(500).send({ error: err.message });
        }
    });
}
