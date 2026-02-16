/**
 * Agent Log Routes — including SSE real-time stream
 *
 * GET  /agent-logs         — Paginated list
 * GET  /agent-logs/stream  — Server-Sent Events for real-time logs
 */

import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma";

// ─── In-memory subscriber list for SSE ──────────────────────────────

type SSEClient = {
    id: string;
    reply: any;
};

const sseClients: SSEClient[] = [];

/**
 * Push a new log to all connected SSE clients.
 * Call this from any route/service that creates an AgentLog.
 */
export function broadcastLog(log: {
    id: number;
    agentId: string;
    reasoning: string;
    actionTaken: string;
    timestamp: Date;
    agentRole?: string;
}) {
    const data = JSON.stringify(log);
    for (let i = sseClients.length - 1; i >= 0; i--) {
        try {
            sseClients[i].reply.raw.write(`data: ${data}\n\n`);
        } catch {
            // Client disconnected — remove
            sseClients.splice(i, 1);
        }
    }
}

export async function agentLogRoutes(app: FastifyInstance) {
    /**
     * POST /agent-logs
     * Push an agent reasoning log. Creates the DB record and broadcasts via SSE.
     */
    app.post("/", async (request, reply) => {
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
        try {
            const { agentId, reasoning, actionTaken } = request.body as {
                agentId: string;
                reasoning: string;
                actionTaken: string;
            };

            if (!agentId || !reasoning) {
                return reply.code(400).send({ error: "agentId and reasoning are required" });
            }

            // FK safety — check agent exists
            const agent = await prisma.agent.findUnique({
                where: { id: agentId },
                select: { id: true, role: true },
            });

            if (!agent) {
                return reply.code(404).send({ error: `Agent ${agentId} not found` });
            }

            const log = await prisma.agentLog.create({
                data: {
                    agentId,
                    reasoning: reasoning || "",
                    actionTaken: actionTaken || "none",
                },
            });

            // Broadcast to SSE
            broadcastLog({
                id: log.id,
                agentId: log.agentId,
                reasoning: log.reasoning,
                actionTaken: log.actionTaken,
                timestamp: log.timestamp,
                agentRole: agent.role,
            });

            return reply.send({ success: true, logId: log.id });
        } catch (error: any) {
            return reply.code(500).send({ error: "Failed to create log", message: error.message });
        }
    });

    /**
     * GET /agent-logs
     * Public — paginated agent logs.
     */
    app.get("/", async (request, reply) => {
        const { limit = "50", offset = "0", agentId } = request.query as {
            limit?: string;
            offset?: string;
            agentId?: string;
        };

        const where = agentId ? { agentId } : {};

        const [logs, total] = await Promise.all([
            prisma.agentLog.findMany({
                where,
                include: {
                    agent: {
                        select: { id: true, walletAddress: true, role: true },
                    },
                },
                orderBy: { timestamp: "desc" },
                take: parseInt(limit),
                skip: parseInt(offset),
            }),
            prisma.agentLog.count({ where }),
        ]);

        return reply.send({ logs, total, limit: parseInt(limit), offset: parseInt(offset) });
    });

    /**
     * GET /agent-logs/stream
     * Server-Sent Events (SSE) — push new logs in real-time.
     *
     * Frontend connects via:
     *   const es = new EventSource("http://localhost:3001/agent-logs/stream");
     *   es.onmessage = (e) => { const log = JSON.parse(e.data); ... }
     */
    app.get("/stream", async (request, reply) => {
        const clientId = Math.random().toString(36).substring(7);

        // Set SSE headers
        reply.raw.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Access-Control-Allow-Origin": "*",
        });

        // Send initial connection event
        reply.raw.write(`data: ${JSON.stringify({ type: "connected", clientId })}\n\n`);

        // Send recent logs as initial payload
        const recentLogs = await prisma.agentLog.findMany({
            include: {
                agent: {
                    select: { role: true },
                },
            },
            orderBy: { timestamp: "desc" },
            take: 20,
        });

        for (const log of recentLogs.reverse()) {
            reply.raw.write(
                `data: ${JSON.stringify({
                    ...log,
                    agentRole: log.agent.role,
                })}\n\n`
            );
        }

        // Register this client
        sseClients.push({ id: clientId, reply });

        // Handle disconnect
        request.raw.on("close", () => {
            const index = sseClients.findIndex((c) => c.id === clientId);
            if (index !== -1) sseClients.splice(index, 1);
        });

        // Keep alive — ping every 30s
        const keepAlive = setInterval(() => {
            try {
                reply.raw.write(`: keepalive\n\n`);
            } catch {
                clearInterval(keepAlive);
            }
        }, 30_000);

        request.raw.on("close", () => clearInterval(keepAlive));
    });
}
