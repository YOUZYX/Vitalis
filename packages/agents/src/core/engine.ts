/**
 * Vitalis Agent Engine — HTTP Tool Bridge
 *
 * This is the runtime that powers all agents. Instead of importing ethers
 * or Prisma directly, the engine makes HTTP calls to the backend API.
 *
 * Architecture:
 *   Agent → Engine.executeTool() → HTTP POST /agent/action → Backend → Chain
 *   Agent → Engine.logReasoning() → HTTP POST /agent-logs → Backend → SSE
 */

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

// ─── Retry Config ────────────────────────────────────────────────────

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Types ───────────────────────────────────────────────────────────

export interface ToolCall {
    action: string;
    agentId: string;
    params: Record<string, unknown>;
}

export interface ToolResponse {
    success: boolean;
    action: string;
    result: unknown;
    error?: string;
}

export interface LogEntry {
    agentId: string;
    reasoning: string;
    actionTaken: string;
}

// ─── Agent Engine ────────────────────────────────────────────────────

export class AgentEngine {
    private backendUrl: string;

    constructor(backendUrl?: string) {
        this.backendUrl = backendUrl || BACKEND_URL;
    }

    /**
     * Execute a tool via the backend's /agent/action endpoint.
     * This is the ONLY way agents interact with the chain.
     * Retries up to 3 times with 2s delay on network failure.
     */
    async executeTool(call: ToolCall): Promise<ToolResponse> {
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const response = await fetch(`${this.backendUrl}/agent/action`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-agent-secret": process.env.OPENCLAW_API_KEY || "vitalis-secret-key"
                    },
                    body: JSON.stringify(call),
                });

                if (!response.ok) {
                    const error = await response.text();
                    // Don't retry 4xx errors — they won't fix themselves
                    if (response.status >= 400 && response.status < 500) {
                        return {
                            success: false,
                            action: call.action,
                            result: null,
                            error: `Backend error (${response.status}): ${error}`,
                        };
                    }
                    // 5xx — retry
                    throw new Error(`Backend error (${response.status}): ${error}`);
                }

                const data = await response.json() as any;
                return {
                    success: data.success ?? true,
                    action: call.action,
                    result: data.result,
                };
            } catch (error: any) {
                const isLastAttempt = attempt === MAX_RETRIES;
                if (isLastAttempt) {
                    console.error(`❌ [Engine] executeTool failed after ${MAX_RETRIES} attempts: ${error.message}`);
                    return {
                        success: false,
                        action: call.action,
                        result: null,
                        error: `Network error after ${MAX_RETRIES} retries: ${error.message}`,
                    };
                }
                console.warn(`⚠️  [Engine] Attempt ${attempt}/${MAX_RETRIES} failed, retrying in ${RETRY_DELAY_MS}ms...`);
                await sleep(RETRY_DELAY_MS);
            }
        }

        // Unreachable but TypeScript needs it
        return { success: false, action: call.action, result: null, error: "Unknown error" };
    }

    /**
     * Log agent reasoning to the backend.
     * This feeds the SSE stream that the frontend consumes.
     */
    async logReasoning(entry: LogEntry): Promise<void> {
        try {
            await this.executeTool({
                action: "log_thought",
                agentId: entry.agentId,
                params: {
                    reasoning: entry.reasoning,
                    actionTaken: entry.actionTaken,
                },
            });
        } catch (error: any) {
            console.error(`❌ [Engine] Failed to push log to backend:`, error.message);
        }
    }

    /**
     * Fetch ecosystem health from the backend (shorthand).
     */
    async getEcosystemHealth(agentId: string, threshold: number = 20): Promise<ToolResponse> {
        return this.executeTool({
            action: "get_ecosystem_health",
            agentId,
            params: { threshold },
        });
    }

    /**
     * Fetch agent status overview from the backend.
     * Returns a placeholder object if backend is unavailable.
     */
    async getAgentStatus(): Promise<any> {
        try {
            const response = await fetch(`${this.backendUrl}/agent/status`);
            if (!response.ok) {
                return {
                    agents: [],
                    metabolicParams: { decayRate: 1000, pulseAmount: 50 },
                    totalAgents: 0,
                    activeAgents: 0,
                    _backendStatus: "error",
                };
            }
            return response.json() as Promise<any>;
        } catch {
            console.warn("⚠️  [Engine] Backend unavailable for getAgentStatus");
            return {
                agents: [],
                metabolicParams: { decayRate: 1000, pulseAmount: 50 },
                totalAgents: 0,
                activeAgents: 0,
                _backendStatus: "unavailable",
            };
        }
    }

    /**
     * Fetch recent agent logs from the backend.
     */
    async getRecentLogs(agentId?: string, limit: number = 10): Promise<any[]> {
        try {
            const params = new URLSearchParams({ limit: limit.toString() });
            if (agentId) params.set("agentId", agentId);

            const response = await fetch(`${this.backendUrl}/agent-logs?${params}`);
            if (!response.ok) return [];
            const data = await response.json() as any;
            return data.logs || [];
        } catch {
            return [];
        }
    }
}
