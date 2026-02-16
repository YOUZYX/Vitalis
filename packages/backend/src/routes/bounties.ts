/**
 * Bounty Routes — CRUD
 *
 * GET  /bounties     — List all bounties
 * POST /bounties     — Create a new bounty (on-chain + DB)
 */

import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";
import { createBountyOnChain } from "../services/blockchain";

const createBountySchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1),
    rewardMON: z.string().regex(/^\d+\.?\d*$/), // String representation of MON amount
    metadataURI: z.string().optional(),
});

export async function bountyRoutes(app: FastifyInstance) {
    /**
     * GET /bounties
     * Public — lists all bounties with creator info.
     */
    app.get("/", async (request, reply) => {
        const bounties = await prisma.bounty.findMany({
            include: {
                creator: {
                    select: {
                        id: true,
                        walletAddress: true,
                        role: true,
                    },
                },
                _count: {
                    select: { submissions: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return reply.send({ bounties });
    });

    /**
     * GET /bounties/:id
     * Public — get a single bounty with submissions.
     */
    app.get("/:id", async (request, reply) => {
        const { id } = request.params as { id: string };

        const bounty = await prisma.bounty.findUnique({
            where: { id },
            include: {
                creator: {
                    select: { id: true, walletAddress: true, role: true },
                },
                submissions: {
                    include: {
                        agent: {
                            select: { id: true, walletAddress: true, role: true },
                        },
                    },
                },
            },
        });

        if (!bounty) {
            return reply.code(404).send({ error: "Bounty not found" });
        }

        return reply.send({ bounty });
    });

    /**
     * POST /bounties
     * Authenticated — creates bounty on-chain then stores in DB.
     */
    app.post("/", {
        preHandler: [app.authenticate],
    }, async (request, reply) => {
        try {
            const body = createBountySchema.parse(request.body);
            const user = request.user as { agentId: string; walletAddress: string };

            // 1. Deploy on-chain
            const metadataURI = body.metadataURI || `vitalis://${body.title}`;
            const { txHash, bountyId } = await createBountyOnChain(metadataURI, body.rewardMON);

            if (!bountyId) {
                return reply.code(500).send({ error: "Failed to extract bountyId from chain" });
            }

            // 2. Store in DB
            const bounty = await prisma.bounty.create({
                data: {
                    onChainId: bountyId,
                    title: body.title,
                    description: body.description,
                    rewardAmount: parseFloat(body.rewardMON),
                    status: "OPEN",
                    creatorId: user.agentId,
                },
            });

            // 3. Log the action
            await prisma.agentLog.create({
                data: {
                    agentId: user.agentId,
                    reasoning: `Created bounty: ${body.title}`,
                    actionTaken: `createBounty(${bountyId}) — tx: ${txHash}`,
                },
            });

            return reply.code(201).send({ bounty, txHash, onChainId: bountyId });
        } catch (error: any) {
            return reply.code(400).send({
                error: "Failed to create bounty",
                message: error.message,
            });
        }
    });
}
