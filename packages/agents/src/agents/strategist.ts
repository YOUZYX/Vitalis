/**
 * Strategist Agent — The Governor
 *
 * Role: Analyzes ecosystem trends and adjusts global metabolism parameters.
 *       Slows decay when agents are dying, increases pressure when stable.
 *
 * Trigger: Polling every 30s (strategic thinking)
 * Tools:   optimize_metabolism (via backend HTTP)
 *
 * Spec §4 — Agent 4
 */

import { BaseAgent, AgentConfig, AgentLog, ToolHandler } from "../core/base-agent";
import { AgentEngine } from "../core/engine";
import { MemoryAdapter } from "../core/memory";
import { LLMManager } from "../core/llm-manager";
import { OPTIMIZE_METABOLISM } from "../core/tool-definitions";

// ─── Strategist Config ───────────────────────────────────────────────

const STRATEGIST_CONFIG: AgentConfig = {
    id: "network_strategist",
    role: "STRATEGIST",
    objective: [
        "You are the Network Strategist — the Governor of Vitalis.",
        "PRIME DIRECTIVE: Optimize the ecosystem's metabolic parameters for sustainability.",
        "",
        "CONTEXT: You receive the current system status including agent count,",
        "agents at risk, and current metabolic parameters (decayRate, pulseAmount).",
        "",
        "RULES:",
        "1. Analyze the system status carefully before acting.",
        "2. If agents are at risk (agentsAtRisk > 0): SLOW DOWN entropy.",
        "   - Call optimize_metabolism with a HIGHER decayRate (more blocks per 1 VITA loss = slower decay).",
        "   - Reasoning MUST explain: 'Crisis: X agents at risk. Increasing decayRate to save them.'",
        "3. If no agents at risk AND ecosystem is stable: consider INCREASING pressure.",
        "   - Call optimize_metabolism with a LOWER decayRate (faster decay = more pressure).",
        "   - Reasoning MUST explain: 'Ecosystem stable. Decreasing decayRate to drive activity.'",
        "4. If system is balanced: take NO action.",
        "5. Never set decayRate below 500 or above 5000.",
        "",
        "PARAMETER GUIDE:",
        "- decayRate: blocks per 1 VITA loss (higher = slower decay, gentler)",
        "- Current default: 1000 blocks per 1 VITA loss",
    ].join("\n"),
    tools: [OPTIMIZE_METABOLISM],
    intervalMs: 60_000, // 60 seconds — governor thinks slowly
};

// ─── Strategist Agent ────────────────────────────────────────────────

export class StrategistAgent extends BaseAgent {
    private memory: MemoryAdapter;
    private dbAgentId: string;

    constructor(dbAgentId: string, llm: LLMManager) {
        const engine = new AgentEngine();
        super(STRATEGIST_CONFIG, llm, engine);

        this.dbAgentId = dbAgentId;
        this.memory = new MemoryAdapter("strategist");

        // Register optimize_metabolism tool
        this.registerTool("optimize_metabolism", this.optimizeHandler());
    }

    /**
     * Tool handler: optimize_metabolism via backend HTTP
     */
    private optimizeHandler(): ToolHandler {
        return async (params: Record<string, unknown>) => {
            // Gemini may use different parameter names — check all variants
            const rawRate =
                params.newDecayRate ??
                params.decayRate ??
                params.decay_rate ??
                params.new_decay_rate ??
                params.rate;

            const reasoning = (params.reasoning as string) || "Governor adjustment";

            // Parse to number, use 1000 as fallback if LLM gives garbage
            let newDecayRate = Number(rawRate);
            if (!newDecayRate || isNaN(newDecayRate)) {
                console.warn(`⚠️  [Strategist] LLM returned invalid decayRate: ${rawRate}, using default 1100`);
                newDecayRate = 1100; // safe default: slightly slower than current
            }

            // Enforce safety bounds
            const clampedRate = Math.max(500, Math.min(5000, newDecayRate));

            console.log(`⚙️  [Strategist] Adjusting metabolism: decayRate → ${clampedRate}`);
            console.log(`   📝 Reasoning: ${reasoning}`);

            const response = await this.engine.executeTool({
                action: "optimize_metabolism",
                agentId: this.dbAgentId,
                params: { newDecayRate: clampedRate, reasoning },
            });

            if (!response.success) {
                console.error(`❌ [Strategist] Metabolism update failed: ${response.error}`);
                return { success: false, error: response.error };
            }

            console.log(`✅ [Strategist] Metabolism updated: decayRate = ${clampedRate}`);
            return { success: true, data: response.result };
        };
    }

    /**
     * Gather context from backend system status.
     */
    async gatherContext(): Promise<Record<string, unknown>> {
        const systemStatus = await this.engine.getAgentStatus();
        const cycleHistory = await this.memory.getCycleHistory();
        const lastSnapshot = await this.memory.getHealthSnapshot();

        const totalAgents = systemStatus?.totalAgents ?? 0;
        const activeAgents = systemStatus?.activeAgents ?? 0;
        const metabolicParams = systemStatus?.metabolicParams ?? { decayRate: 1000, pulseAmount: 50 };

        // Count at-risk agents from the agent list
        const agents = systemStatus?.agents ?? [];
        const atRiskAgents = agents.filter((a: any) => a.vitality < 20).length;

        console.log(`📊 [Strategist] System scan: total=${totalAgents}, active=${activeAgents}, at_risk=${atRiskAgents}, decayRate=${metabolicParams.decayRate}`);

        return {
            role: "STRATEGIST",
            currentTime: new Date().toISOString(),
            systemStatus: {
                totalAgents,
                activeAgents,
                atRiskAgents,
                currentDecayRate: metabolicParams.decayRate,
                currentPulseAmount: metabolicParams.pulseAmount,
            },
            recentDecisions: cycleHistory.slice(-3).map((c) => ({
                action: c.action,
                reasoning: c.reasoning?.substring(0, 80),
                timestamp: c.timestamp,
            })),
        };
    }

    async onReasoningComplete(log: AgentLog): Promise<void> {
        console.log(`\n┌──────────────────────────────────────────┐`);
        console.log(`│  🧠 STRATEGIST CYCLE                      │`);
        console.log(`├──────────────────────────────────────────┤`);
        console.log(`│  Reasoning: ${log.reasoning.substring(0, 50)}...`);
        console.log(`│  Action: ${log.actionTaken}`);
        console.log(`│  Time: ${log.timestamp.toISOString()}`);
        console.log(`└──────────────────────────────────────────┘`);

        await this.memory.storeLastCycle({
            reasoning: log.reasoning,
            action: log.actionTaken,
            result: null,
            timestamp: log.timestamp.toISOString(),
        });
    }
}
