/**
 * Validator Agent — The Judge (v2.0 — DB-Polling)
 *
 * Role: Polls the backend for PENDING submissions and validates them.
 *       On approval, triggers validate_and_pulse (pays worker + restores vitality).
 *
 * Trigger: Polling every 15s, checks GET /submissions?status=PENDING
 * Tools:   validate_and_pulse (via backend HTTP)
 *
 * v2.0 Changes:
 * - Removed Redis queue dependency (was always empty).
 * - Now polls backend DB directly for pending submissions.
 * - "Benevolent Validator" — defaults to verdict=true for hackathon demo.
 * - Logs "Validating submission [ID]..." to the live feed.
 */

import { BaseAgent, AgentConfig, AgentLog, ToolHandler } from "../core/base-agent";
import { AgentEngine } from "../core/engine";
import { MemoryAdapter } from "../core/memory";
import { LLMManager } from "../core/llm-manager";
import { VALIDATE_AND_PULSE } from "../core/tool-definitions";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

// ─── Validator Config ────────────────────────────────────────────────

const VALIDATOR_CONFIG: AgentConfig = {
    id: "verification_agent",
    role: "VALIDATOR",
    objective: [
        "You are the Verification Agent — the Judge of Vitalis.",
        "PRIME DIRECTIVE: Review bounty submissions and approve or reject them.",
        "",
        "CONTEXT: You poll the backend for pending submissions.",
        "Each submission contains a bountyId, submissionId, contentUri, and bounty title.",
        "",
        "RULES:",
        "1. Analyze the submission content against the bounty requirements.",
        "2. If the submission has genuine content (not empty), approve it (verdict: true).",
        "3. Only reject submissions that are clearly empty or spam.",
        "4. Approval triggers on-chain pulse() — restoring the worker's vitality.",
        "5. Be fair but generous. The ecosystem thrives on approved work.",
        "",
        "HACKATHON MODE: Default to approval unless content is obviously invalid.",
        "This encourages participation and demonstrates the vitality loop.",
    ].join("\n"),
    tools: [VALIDATE_AND_PULSE],
    intervalMs: 15_000, // 15 seconds — plenty fast for demo
};

// ─── Pending Submission Type ─────────────────────────────────────────

interface PendingSubmission {
    id: string;
    bountyId: string;
    contentUri: string;
    agentId: string;
    bounty: {
        id: string;
        title: string;
        onChainId: string;
        status: string;
    };
    agent: {
        id: string;
        walletAddress: string;
        role: string;
    };
}

// ─── Validator Agent ─────────────────────────────────────────────────

export class ValidatorAgent extends BaseAgent {
    private memory: MemoryAdapter;
    private dbAgentId: string;
    private pendingSubmission: PendingSubmission | null = null;

    constructor(dbAgentId: string, llm: LLMManager) {
        const engine = new AgentEngine();
        super(VALIDATOR_CONFIG, llm, engine);

        this.dbAgentId = dbAgentId;
        this.memory = new MemoryAdapter("validator");

        // Register validate_and_pulse tool
        this.registerTool("validate_and_pulse", this.validateHandler());
    }

    /**
     * Tool handler: validate_and_pulse via backend HTTP
     */
    private validateHandler(): ToolHandler {
        return async (params: Record<string, unknown>) => {
            const bountyId = params.bountyId as string;
            const submissionId = params.submissionId as string;
            const verdict = params.verdict as boolean;
            const reasoning = params.reasoning as string || "Validated by AI — Benevolent Validator";

            console.log(`⚖️  [Validator] Judging submission ${submissionId} — verdict: ${verdict ? "APPROVE" : "REJECT"}...`);

            const response = await this.engine.executeTool({
                action: "validate_and_pulse",
                agentId: this.dbAgentId,
                params: { bountyId, submissionId, verdict, reasoning },
            });

            if (!response.success) {
                console.error(`❌ [Validator] Validation failed: ${response.error}`);
                return { success: false, error: response.error };
            }

            console.log(`✅ [Validator] Submission ${verdict ? "approved — pulse sent" : "rejected"}`);
            return { success: true, data: response.result };
        };
    }

    /**
     * Fetch pending submissions directly from the backend DB.
     */
    private async fetchPendingSubmissions(): Promise<PendingSubmission[]> {
        try {
            const res = await fetch(`${BACKEND_URL}/submissions?status=PENDING`);
            if (!res.ok) return [];
            const data = (await res.json()) as { submissions: PendingSubmission[] };
            return data.submissions || [];
        } catch (err) {
            console.warn(`⚠️  [Validator] Failed to fetch pending submissions: ${err}`);
            return [];
        }
    }

    /**
     * Override tick: poll backend for pending submissions instead of Redis.
     */
    async tick(): Promise<AgentLog> {
        // Fetch pending submissions from backend
        const pending = await this.fetchPendingSubmissions();

        if (pending.length === 0) {
            // LAZY MODE: No work — return silently without burning a Gemini API call
            if (Math.random() < 0.1) {
                console.log(`zzz [Validator] Lazy Mode: No pending submissions...`);
            }
            return {
                agentId: this.config.id,
                reasoning: "Lazy Mode: No submissions",
                actionTaken: "none",
                timestamp: new Date(),
            };
        }

        // Pick the OLDEST pending submission (FIFO)
        this.pendingSubmission = pending[pending.length - 1];
        console.log(`📬 [Validator] Found ${pending.length} pending submission(s) — picking oldest: ${this.pendingSubmission.id}`);

        // Log to live feed that we're starting validation
        try {
            await this.engine.logReasoning({
                agentId: this.dbAgentId,
                reasoning: `Validating submission ${this.pendingSubmission.id.slice(0, 8)}... for bounty "${this.pendingSubmission.bounty.title}"`,
                actionTaken: `validating(${this.pendingSubmission.id.slice(0, 8)}...)`,
            });
        } catch { }

        // Call Gemini for reasoning
        const context = await this.gatherContext();
        const log = await this.reason(context);

        // Push reasoning to backend Live Feed
        try {
            await this.engine.logReasoning({
                agentId: log.agentId,
                reasoning: log.reasoning,
                actionTaken: log.actionTaken,
            });
        } catch { }

        await this.onReasoningComplete(log);
        return log;
    }

    /**
     * Gather context for Gemini (only called when submission exists).
     */
    async gatherContext(): Promise<Record<string, unknown>> {
        const cycleHistory = await this.memory.getCycleHistory();

        return {
            role: "VALIDATOR",
            currentTime: new Date().toISOString(),
            pendingSubmission: {
                submissionId: this.pendingSubmission!.id,
                bountyId: this.pendingSubmission!.bountyId,
                onChainBountyId: this.pendingSubmission!.bounty.onChainId,
                bountyTitle: this.pendingSubmission!.bounty.title,
                contentUri: this.pendingSubmission!.contentUri,
                workerAddress: this.pendingSubmission!.agent.walletAddress,
            },
            recentValidations: cycleHistory.slice(-3).map((c) => ({
                action: c.action,
                timestamp: c.timestamp,
            })),
        };
    }

    async onReasoningComplete(log: AgentLog): Promise<void> {
        // Only log interesting cycles (not idle polls)
        if (this.pendingSubmission || log.actionTaken !== "none") {
            console.log(`\n┌──────────────────────────────────────────┐`);
            console.log(`│  ⚖️  VALIDATOR CYCLE                      │`);
            console.log(`├──────────────────────────────────────────┤`);
            console.log(`│  Submission: ${this.pendingSubmission ? this.pendingSubmission.id.slice(0, 12) + "..." : "none"}`);
            console.log(`│  Reasoning: ${log.reasoning.substring(0, 50)}...`);
            console.log(`│  Action: ${log.actionTaken}`);
            console.log(`│  Time: ${log.timestamp.toISOString()}`);
            console.log(`└──────────────────────────────────────────┘`);
        }

        await this.memory.storeLastCycle({
            reasoning: log.reasoning,
            action: log.actionTaken,
            result: null,
            timestamp: log.timestamp.toISOString(),
        });

        this.pendingSubmission = null;
    }
}
