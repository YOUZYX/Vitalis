/**
 * Agent Action Routes (v2.0 — Cooldown-Enforced + HACKATHON_SAFE_MODE)
 *
 * POST /agent/action — Endpoint for AI agents to request on-chain actions.
 * Mediates between agent decision-making and the deployer wallet.
 *
 * Features:
 * - Block-based cooldown enforcement per agent per action type
 * - HACKATHON_SAFE_MODE: blocks Strategist from auto-executing updateMetabolicParams()
 * - All chain writes logged with tx hashes
 * - SSE broadcast on every action
 */

import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";
import {
    createBountyOnChain,
    approveSubmissionOnChain,
    pruneAgent,
    updateMetabolicParams,
    getVitality,
    getMetabolicParams,
    getBlockNumber,
} from "../services/blockchain";
import { broadcastLog } from "./agent-logs";

// ─── Cooldown Configuration (in Monad blocks, ~1s per block) ─────────

const COOLDOWNS: Record<string, number> = {
    create_bounty: 500,  // ~8 min between bounty creations
    validate_and_pulse: 200,  // ~3.3 min between approvals
    prune_agent: 300,  // ~5 min between prunes
    optimize_metabolism: 600, // ~10 min between analyses
};

// HACKATHON_SAFE_MODE — prevents Strategist from auto-executing chain writes
const HACKATHON_SAFE_MODE = process.env.HACKATHON_SAFE_MODE !== "false"; // default: true

// ─── Schemas ─────────────────────────────────────────────────────────

const actionSchema = z.discriminatedUnion("action", [
    z.object({
        action: z.literal("get_ecosystem_health"),
        agentId: z.string(),
        params: z.object({
            threshold: z.number().int().default(20),
        }),
    }),
    z.object({
        action: z.literal("log_thought"),
        agentId: z.string(),
        params: z.object({
            reasoning: z.string(),
            actionTaken: z.string(),
        }),
    }),
    z.object({
        action: z.literal("create_bounty"),
        agentId: z.string(),
        params: z.object({
            title: z.string(),
            rewardMON: z.string(),
            requirements: z.string(),
        }),
    }),
    z.object({
        action: z.literal("validate_and_pulse"),
        agentId: z.string(),
        params: z.object({
            bountyId: z.string(),
            submissionId: z.string(),
            verdict: z.boolean(),
            reasoning: z.string().optional(),
        }),
    }),
    z.object({
        action: z.literal("optimize_metabolism"),
        agentId: z.string(),
        params: z.object({
            newDecayRate: z.number().int(),
            reasoning: z.string().optional(),
        }),
    }),
    z.object({
        action: z.literal("prune_agent"),
        agentId: z.string(),
        params: z.object({
            targetAddress: z.string(),
        }),
    }),
]);

// ─── Cooldown Check ──────────────────────────────────────────────────

async function checkCooldown(agentId: string, action: string): Promise<{ allowed: boolean; remaining: number }> {
    const cooldown = COOLDOWNS[action];
    if (!cooldown) return { allowed: true, remaining: 0 };

    const currentBlock = await getBlockNumber();

    // Find the most recent log for this agent + action type
    const lastLog = await prisma.agentLog.findFirst({
        where: {
            agentId,
            actionTaken: { startsWith: action },
        },
        orderBy: { timestamp: "desc" },
        select: { timestamp: true },
    });

    if (!lastLog) return { allowed: true, remaining: 0 };

    // Estimate the block at the time of last action
    // Since we log timestamps, approximate: 1 block ≈ 1 second on Monad
    const secondsSinceLastAction = (Date.now() - lastLog.timestamp.getTime()) / 1000;
    const blocksSinceLastAction = Math.floor(secondsSinceLastAction);

    if (blocksSinceLastAction < cooldown) {
        const remaining = cooldown - blocksSinceLastAction;
        return { allowed: false, remaining };
    }

    return { allowed: true, remaining: 0 };
}

// ─── Routes ──────────────────────────────────────────────────────────

export async function agentActionRoutes(app: FastifyInstance) {
    /**
     * POST /agent/action
     *
     * Central endpoint for AI agents to execute on-chain actions.
     * The backend wallet mediates all chain interactions.
     * All write actions are cooldown-gated.
     */
    app.post("/action", async (request, reply) => {
        try {
            const body = actionSchema.parse(request.body);
            let result: any;
            let logReasoning = "";
            let logAction = "";

            // ─── Auth Check (API Key or JWT) ─────────────────────
            const apiKey = request.headers["x-agent-secret"];
            const validApiKey = process.env.OPENCLAW_API_KEY || "vitalis-secret-key";

            if (apiKey !== validApiKey) {
                try {
                    await request.jwtVerify();
                } catch {
                    return reply.code(401).send({ error: "Unauthorized: Missing valid API Key or JWT" });
                }
            }

            // ── Cooldown enforcement (skip for read-only actions and logging) ──
            if (body.action !== "get_ecosystem_health" && body.action !== "log_thought") {
                const { allowed, remaining } = await checkCooldown(body.agentId, body.action);
                if (!allowed) {
                    console.log(`⏳ [Cooldown] ${body.action} blocked for agent ${body.agentId} — ${remaining} blocks remaining`);
                    return reply.code(429).send({
                        error: "Cooldown active",
                        action: body.action,
                        remainingBlocks: remaining,
                        message: `Action "${body.action}" is on cooldown. ${remaining} blocks (~${Math.ceil(remaining)}s) remaining.`,
                    });
                }
            }

            switch (body.action) {
                // ─── Guardian: Get Ecosystem Health ───────────────
                case "get_ecosystem_health": {
                    const agents = await prisma.agent.findMany({
                        where: { isActive: true },
                    });

                    const healthData = await Promise.all(
                        agents.map(async (agent: any) => {
                            const vitality = await getVitality(agent.walletAddress);
                            return {
                                agentId: agent.id,
                                walletAddress: agent.walletAddress,
                                role: agent.role,
                                vitality: Number(vitality),
                                atRisk: Number(vitality) < body.params.threshold,
                            };
                        })
                    );

                    const avgVitality =
                        healthData.reduce((sum: number, a: any) => sum + a.vitality, 0) / healthData.length || 0;
                    const atRisk = healthData.filter((a: any) => a.atRisk);

                    result = {
                        averageVitality: Math.round(avgVitality),
                        totalAgents: healthData.length,
                        agentsAtRisk: atRisk.length,
                        atRiskAgents: atRisk,
                        allAgents: healthData,
                    };

                    logAction = `get_ecosystem_health → avg: ${Math.round(avgVitality)}, at risk: ${atRisk.length}`;
                    break;
                }

                // ─── Log Thought (Live Feed) ─────────────────────
                case "log_thought": {
                    logReasoning = body.params.reasoning;
                    logAction = body.params.actionTaken;
                    result = { logged: true };
                    break;
                }

                // ─── Architect: Create Bounty (ON-CHAIN) ─────────
                case "create_bounty": {
                    const metadataURI = `vitalis://${body.params.title}`;

                    let txHash = "";
                    let bountyId = "";

                    try {
                        const chainResult = await createBountyOnChain(
                            metadataURI,
                            body.params.rewardMON
                        );
                        txHash = chainResult.txHash;
                        bountyId = chainResult.bountyId;
                    } catch (chainErr: any) {
                        console.error(`❌ [Chain] createBounty failed: ${chainErr.message}`);
                        // Fall back to DB-only if chain fails
                        bountyId = `local-${Date.now()}`;
                        txHash = "chain-error";
                    }

                    // Store in DB
                    const bounty = await prisma.bounty.create({
                        data: {
                            onChainId: bountyId,
                            title: body.params.title,
                            description: body.params.requirements,
                            rewardAmount: parseFloat(body.params.rewardMON),
                            status: "OPEN",
                            creatorId: body.agentId,
                        },
                    });

                    result = { bounty, txHash, onChainId: bountyId };
                    logReasoning = `Created bounty: ${body.params.title} (${body.params.rewardMON} MON)`;
                    logAction = `create_bounty(${bountyId}) — tx: ${txHash}`;
                    break;
                }

                // ─── Validator: Validate & Pulse (ON-CHAIN) ──────
                case "validate_and_pulse": {
                    const submission = await prisma.submission.findUnique({
                        where: { id: body.params.submissionId },
                        include: {
                            bounty: true,
                            agent: true,
                        },
                    });

                    if (!submission) {
                        return reply.code(404).send({ error: "Submission not found" });
                    }

                    if (body.params.verdict) {
                        let txHash = "";

                        try {
                            // Approve on-chain → triggers pulse() internally → +50 VITA
                            const chainResult = await approveSubmissionOnChain(
                                submission.bounty.onChainId,
                                submission.agent.walletAddress
                            );
                            txHash = chainResult.txHash;
                        } catch (chainErr: any) {
                            console.error(`❌ [Chain] approveSubmission failed: ${chainErr.message}`);
                            txHash = "chain-error";
                        }

                        // Update DB
                        await prisma.submission.update({
                            where: { id: body.params.submissionId },
                            data: { isApproved: true },
                        });

                        await prisma.bounty.update({
                            where: { id: submission.bountyId },
                            data: { status: "COMPLETED" },
                        });

                        // Sync vitality from chain to DB
                        try {
                            const newVitality = await getVitality(submission.agent.walletAddress);
                            await prisma.agent.update({
                                where: { id: submission.agentId },
                                data: { vitality: Number(newVitality) },
                            });
                        } catch {
                            // Non-critical — chain sync can fail gracefully
                        }

                        result = { approved: true, txHash };
                        logAction = `validate_and_pulse(${body.params.bountyId}, APPROVED) — tx: ${txHash}`;
                    } else {
                        result = { approved: false };
                        logAction = `validate_and_pulse(${body.params.bountyId}, REJECTED)`;
                    }

                    logReasoning = body.params.reasoning || `Validated submission ${body.params.submissionId}`;
                    break;
                }

                // ─── Strategist: Optimize Metabolism ─────────────
                case "optimize_metabolism": {
                    const currentParams = await getMetabolicParams();

                    if (HACKATHON_SAFE_MODE) {
                        // PROPOSE ONLY — do NOT execute on-chain
                        result = {
                            mode: "PROPOSAL_ONLY",
                            currentDecayRate: currentParams.decayRate,
                            proposedDecayRate: body.params.newDecayRate,
                            reasoning: body.params.reasoning || "No reasoning provided",
                            status: "PENDING_APPROVAL",
                            note: "HACKATHON_SAFE_MODE=true — execution requires manual approval",
                        };

                        logReasoning = body.params.reasoning || `Proposed decay rate change to ${body.params.newDecayRate}`;
                        logAction = `optimize_metabolism(PROPOSAL: ${currentParams.decayRate} → ${body.params.newDecayRate}) — NOT EXECUTED (safe mode)`;
                    } else {
                        // Execute on-chain (only if safe mode is OFF)
                        const { txHash } = await updateMetabolicParams(
                            body.params.newDecayRate,
                            currentParams.pulseAmount
                        );

                        result = {
                            mode: "EXECUTED",
                            previousDecayRate: currentParams.decayRate,
                            newDecayRate: body.params.newDecayRate,
                            txHash,
                        };

                        logReasoning = body.params.reasoning || `Adjusted decay rate to ${body.params.newDecayRate}`;
                        logAction = `optimize_metabolism(${body.params.newDecayRate}) — tx: ${txHash}`;
                    }
                    break;
                }

                // ─── Guardian: Prune Dead Agent (ON-CHAIN) ───────
                case "prune_agent": {
                    let txHash = "";

                    try {
                        const chainResult = await pruneAgent(body.params.targetAddress);
                        txHash = chainResult.txHash;
                    } catch (chainErr: any) {
                        console.error(`❌ [Chain] prune failed: ${chainErr.message}`);
                        txHash = "chain-error";
                    }

                    // Update DB
                    await prisma.agent.updateMany({
                        where: { walletAddress: body.params.targetAddress.toLowerCase() },
                        data: { isActive: false, vitality: 0 },
                    });

                    result = { pruned: true, txHash };
                    logReasoning = `Pruned agent ${body.params.targetAddress}`;
                    logAction = `prune_agent(${body.params.targetAddress}) — tx: ${txHash}`;
                    break;
                }
            }

            // Log the agent action (FK-safe: skip if agentId not in DB)
            try {
                const agentExists = await prisma.agent.findUnique({
                    where: { id: body.agentId },
                    select: { id: true },
                });

                if (agentExists) {
                    const log = await prisma.agentLog.create({
                        data: {
                            agentId: body.agentId,
                            reasoning: logReasoning,
                            actionTaken: logAction,
                        },
                        include: {
                            agent: { select: { role: true } },
                        },
                    });

                    // Broadcast to SSE clients
                    broadcastLog({
                        id: log.id,
                        agentId: log.agentId,
                        reasoning: log.reasoning,
                        actionTaken: log.actionTaken,
                        timestamp: log.timestamp,
                        agentRole: log.agent.role,
                    });
                } else {
                    console.warn(`⚠️  Skipping log: agentId "${body.agentId}" not found in DB`);
                }
            } catch (logErr: any) {
                console.warn(`⚠️  Failed to log agent action: ${logErr.message}`);
            }

            return reply.send({ success: true, action: body.action, result });
        } catch (error: any) {
            return reply.code(400).send({
                error: "Agent action failed",
                message: error.message,
            });
        }
    });

    /**
     * GET /agent/status
     * Public — get system-wide agent status overview.
     */
    app.get("/status", async (request, reply) => {
        const agents = await prisma.agent.findMany({
            include: {
                _count: {
                    select: { logs: true, submissions: true },
                },
            },
        });

        // Convert BigInt fields to Number for JSON serialization
        const serializedAgents = agents.map((agent: any) => ({
            ...agent,
            lastPulseBlock: Number(agent.lastPulseBlock),
        }));

        const metabolicParams = await getMetabolicParams().catch(() => ({
            decayRate: 1000,
            pulseAmount: 50,
        }));

        return reply.send({
            agents: serializedAgents,
            metabolicParams,
            totalAgents: serializedAgents.length,
            activeAgents: serializedAgents.filter((a: any) => a.isActive).length,
        });
    });

    /**
     * GET /agent/transactions
     * Public — get recent on-chain transactions (logs containing "tx:")
     */
    app.get("/transactions", async (request, reply) => {
        const recentTxLogs = await prisma.agentLog.findMany({
            where: {
                actionTaken: { contains: "tx:" },
            },
            orderBy: { timestamp: "desc" },
            take: 30,
            include: {
                agent: { select: { role: true, walletAddress: true } },
            },
        });

        const transactions = recentTxLogs.map((log: any) => {
            // Extract tx hash from actionTaken string
            const txMatch = log.actionTaken.match(/tx:\s*(0x[a-fA-F0-9]+)/);
            const txHash = txMatch ? txMatch[1] : null;

            // Extract action name from the beginning of actionTaken
            const actionName = log.actionTaken.split("(")[0]?.trim() || "unknown";

            return {
                id: log.id,
                agentRole: log.agent.role,
                action: actionName,
                txHash,
                reasoning: log.reasoning,
                timestamp: log.timestamp,
            };
        });

        return reply.send({ transactions });
    });
}
