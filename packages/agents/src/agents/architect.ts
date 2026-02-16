/**
 * Bounty Architect Agent — The Builder
 *
 * Role: Reads emergency signals from the Guardian's queue and creates
 *       targeted bounties to rescue at-risk agents.
 *
 * Trigger: Polling every 5s, checks vitalis:inbox:architect queue
 * Tools:   create_bounty (via backend HTTP)
 * Memory:  Upstash Redis queue (LPOP from inbox)
 *
 * Spec §4 — Agent 2
 */

import { BaseAgent, AgentConfig, AgentLog, ToolHandler } from "../core/base-agent";
import { AgentEngine } from "../core/engine";
import { MemoryAdapter } from "../core/memory";
import { LLMManager } from "../core/llm-manager";
import { CREATE_BOUNTY } from "../core/tool-definitions";

// ─── Architect Config ────────────────────────────────────────────────

const ARCHITECT_CONFIG: AgentConfig = {
    id: "bounty_architect",
    role: "ARCHITECT",
    objective: [
        "You are the Bounty Architect — the Builder of Vitalis.",
        "PRIME DIRECTIVE: Create bounties that will restore vitality to at-risk agents.",
        "",
        "CONTEXT: You receive emergency signals from the Guardian agent.",
        "Each signal contains urgency level and a list of at-risk agents.",
        "",
        "RULES:",
        "1. Analyze the signal to understand which agents need help.",
        "2. Create a targeted bounty with a descriptive title and requirements.",
        "3. Set rewards proportional to urgency (0.001 MON for demo).",
        "4. Title format: 'Emergency: Restore [agent_role] Vitality'",
        "5. Requirements should describe what work is needed to help the ecosystem.",
        "",
        "REWARD GUIDE (demo MON amounts):",
        "- low urgency: 0.001 MON",
        "- medium urgency: 0.001 MON",
        "- high urgency: 0.001 MON",
        "- critical urgency: 0.001 MON",
    ].join("\n"),
    tools: [CREATE_BOUNTY],
    intervalMs: 5_000, // 5 seconds for demo
};

// ─── Architect Agent ─────────────────────────────────────────────────

export class ArchitectAgent extends BaseAgent {
    private memory: MemoryAdapter;
    private dbAgentId: string;
    private pendingSignal: any = null;

    constructor(dbAgentId: string, llm: LLMManager) {
        const engine = new AgentEngine();
        super(ARCHITECT_CONFIG, llm, engine);

        this.dbAgentId = dbAgentId;
        this.memory = new MemoryAdapter("architect");

        // Register create_bounty tool
        this.registerTool("create_bounty", this.createBountyHandler());
    }

    /**
     * Tool handler: create_bounty via backend HTTP
     */
    private createBountyHandler(): ToolHandler {
        return async (params: Record<string, unknown>) => {
            const title = params.title as string || "Emergency Bounty";
            const rewardMON = String(params.rewardMON || "0.001");
            // Gemini sometimes returns requirements as an array — sanitize to string
            const requirements = Array.isArray(params.requirements)
                ? params.requirements.join("\n")
                : String(params.requirements || "Contribute to ecosystem");

            console.log(`📝 [Architect] Creating bounty: "${title}" (${rewardMON} MON)...`);

            const response = await this.engine.executeTool({
                action: "create_bounty",
                agentId: this.dbAgentId,
                params: { title, rewardMON, requirements },
            });

            if (!response.success) {
                console.error(`❌ [Architect] Bounty creation failed: ${response.error}`);
                return { success: false, error: response.error };
            }

            console.log(`✅ [Architect] Bounty created successfully`);
            return { success: true, data: response.result };
        };
    }

    /**
     * Override tick: skip Gemini entirely when queue is empty.
     * Only call reason() when there's actual work to do.
     */
    async tick(): Promise<AgentLog> {
        // LAZY CHECK: Check queue BEFORE calling Gemini
        const queueLength = await this.memory.queueLength("vitalis:inbox:architect");

        if (queueLength === 0) {
            // No work — return silently without burning a Gemini API call
            // Log intermittently or just return to avoid noise
            if (Math.random() < 0.1) {
                // Occasional heartbeat log
                console.log(`zzz [Architect] Lazy Mode: Inbox empty, sleeping...`);
            }
            return {
                agentId: this.config.id,
                reasoning: "Lazy Mode: Inbox empty",
                actionTaken: "none",
                timestamp: new Date(),
            };
        }

        // Work exists! Pop the signal
        this.pendingSignal = await this.memory.popFromQueue("vitalis:inbox:architect");

        if (!this.pendingSignal) {
            // Race condition or empty? safe fallback
            return {
                agentId: this.config.id,
                reasoning: "Lazy Mode: Signal vanished?",
                actionTaken: "none",
                timestamp: new Date(),
            };
        }

        console.log(`📬 [Architect] Received signal from Guardian (urgency: ${this.pendingSignal.urgency})`);

        // Signal found — NOW call Gemini
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
     * Gather context for Gemini (only called when signal exists).
     */
    async gatherContext(): Promise<Record<string, unknown>> {
        const cycleHistory = await this.memory.getCycleHistory();

        return {
            role: "ARCHITECT",
            currentTime: new Date().toISOString(),
            pendingSignal: this.pendingSignal,
            recentBounties: cycleHistory.slice(-3).map((c) => ({
                action: c.action,
                timestamp: c.timestamp,
            })),
        };
    }

    async onReasoningComplete(log: AgentLog): Promise<void> {
        // Only log interesting cycles (not idle polls)
        if (this.pendingSignal || log.actionTaken !== "none") {
            console.log(`\n┌──────────────────────────────────────────┐`);
            console.log(`│  🏗️  ARCHITECT CYCLE                      │`);
            console.log(`├──────────────────────────────────────────┤`);
            console.log(`│  Signal: ${this.pendingSignal ? "YES" : "none"}`);
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

        this.pendingSignal = null;
    }
}
