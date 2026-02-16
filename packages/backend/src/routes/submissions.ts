/**
 * Submission Routes (v2.0 — with status filter)
 *
 * POST /submissions — Submit work to a bounty.
 * GET  /submissions — List submissions, optionally filtered by status.
 *   ?status=PENDING  — returns only un-approved submissions
 *   ?status=APPROVED — returns only approved submissions
 *   ?bountyId=xxx    — filter by bounty
 */

import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";

const submitSchema = z.object({
    bountyId: z.string().uuid(),
    contentUri: z.string().min(1),
});

export async function submissionRoutes(app: FastifyInstance) {
    /**
     * POST /submissions
     * Authenticated — submit work for a bounty.
     */
    /**
     * POST /submissions
     * Public — submit work for a bounty.
     * (Hackathon Auth: trusts walletAddress from client)
     */
    app.post("/", async (request, reply) => {
        try {
            const body = submitSchema.extend({
                walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
            }).parse(request.body);

            // Find agent by wallet address
            let agent = await prisma.agent.findUnique({
                where: { walletAddress: body.walletAddress.toLowerCase() },
            });

            // Auto-create WORKER agent if not exists (lazy registration)
            if (!agent) {
                console.log(`🆕 Auto-creating agent for submission: ${body.walletAddress}`);
                agent = await prisma.agent.create({
                    data: {
                        walletAddress: body.walletAddress.toLowerCase(),
                        role: "WORKER",
                        vitality: 100,
                        isActive: true,
                        lastPulseBlock: BigInt(0),
                    },
                });
            }

            // Check bounty exists and is OPEN
            const bounty = await prisma.bounty.findUnique({
                where: { id: body.bountyId },
            });

            if (!bounty) {
                return reply.code(404).send({ error: "Bounty not found" });
            }

            if (bounty.status !== "OPEN" && bounty.status !== "IN_PROGRESS") {
                return reply.code(400).send({ error: "Bounty is not accepting submissions" });
            }

            // Create submission
            const submission = await prisma.submission.create({
                data: {
                    bountyId: body.bountyId,
                    agentId: agent.id,
                    contentUri: body.contentUri,
                },
            });

            // Update bounty status to IN_PROGRESS
            await prisma.bounty.update({
                where: { id: body.bountyId },
                data: { status: "IN_PROGRESS" },
            });

            // Log the action (FK-safe)
            await prisma.agentLog.create({
                data: {
                    agentId: agent.id,
                    reasoning: `Submitted work for bounty ${bounty.title}`,
                    actionTaken: `submitWork(${body.bountyId})`,
                },
            });

            return reply.code(201).send({ submission });
        } catch (error: any) {
            return reply.code(400).send({
                error: "Failed to create submission",
                message: error.message,
            });
        }
    });

    /**
     * GET /submissions?bountyId=xxx&status=PENDING|APPROVED
     * Public — list submissions, optionally filtered.
     */
    app.get("/", async (request, reply) => {
        const { bountyId, status } = request.query as {
            bountyId?: string;
            status?: string;
        };

        // Build where clause
        const where: any = {};

        if (bountyId) {
            where.bountyId = bountyId;
        }

        // status filter: PENDING = not approved, APPROVED = approved
        if (status === "PENDING") {
            where.isApproved = false;
        } else if (status === "APPROVED") {
            where.isApproved = true;
        }

        const submissions = await prisma.submission.findMany({
            where,
            include: {
                agent: {
                    select: { id: true, walletAddress: true, role: true },
                },
                bounty: {
                    select: { id: true, title: true, status: true, onChainId: true },
                },
            },
            orderBy: { timestamp: "desc" },
        });

        return reply.send({ submissions });
    });
}
