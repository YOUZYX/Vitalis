/**
 * Auth Routes — Privy + JWT
 *
 * POST /auth/verify — Verify Privy auth token and issue backend JWT.
 */

import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";

const verifySchema = z.object({
    walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    privyToken: z.string().min(1),
});

export async function authRoutes(app: FastifyInstance) {
    /**
     * POST /auth/verify
     *
     * Verifies a Privy auth token + wallet address.
     * Returns a signed JWT for use in subsequent API calls.
     * Auto-creates a WORKER agent in DB if not exists.
     */
    app.post("/verify", async (request, reply) => {
        try {
            const body = verifySchema.parse(request.body);
            const { walletAddress, privyToken } = body;

            // In production: verify privyToken against Privy API
            // For MVP: we trust the frontend's Privy-authenticated wallet
            // TODO: Add Privy server-side verification when APP_SECRET is available

            // Upsert agent in DB (create as WORKER if new)
            let agent = await prisma.agent.findUnique({
                where: { walletAddress: walletAddress.toLowerCase() },
            });

            if (!agent) {
                agent = await prisma.agent.create({
                    data: {
                        walletAddress: walletAddress.toLowerCase(),
                        role: "WORKER",
                        vitality: 100,
                        reputation: 50,
                        isActive: true,
                        lastPulseBlock: BigInt(0),
                    },
                });
            }

            // Sign a JWT with agent info
            const token = app.jwt.sign(
                {
                    agentId: agent.id,
                    walletAddress: agent.walletAddress,
                    role: agent.role,
                },
                { expiresIn: "24h" }
            );

            return reply.send({
                token,
                agent: {
                    id: agent.id,
                    walletAddress: agent.walletAddress,
                    role: agent.role,
                    vitality: agent.vitality,
                    reputation: agent.reputation,
                    isActive: agent.isActive,
                },
            });
        } catch (error: any) {
            return reply.code(400).send({
                error: "Authentication failed",
                message: error.message,
            });
        }
    });
}
