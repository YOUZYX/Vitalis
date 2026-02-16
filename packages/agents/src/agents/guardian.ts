/**
 * Guardian Agent updated for Day 5 — Queue-based signaling
 */

import { BaseAgent, AgentConfig, AgentLog } from "../core/base-agent";
import { AgentEngine } from "../core/engine";
import { MemoryAdapter } from "../core/memory";
import { LLMManager } from "../core/llm-manager";
import { GET_ECOSYSTEM_HEALTH } from "../core/tool-definitions";
import { createGetEcosystemHealth, createSignalArchitect } from "../tools/guardianTools";

// ─── Tool Definition for signal_architect ────────────────────────────

const SIGNAL_ARCHITECT = {
    name: "signal_architect",
    description:
        "Send an emergency signal to the Bounty Architect agent to create urgent bounties for at-risk agents.",
    parameters: {
        type: "object" as const,
        properties: {
            urgency: {
                type: "string",
                description: "Urgency level: low, medium, high, critical",
            },
            atRiskAgents: {
                type: "array",
                description: "List of agent addresses at risk of pruning",
            },
        },
        required: ["urgency", "atRiskAgents"],
    },
};

// ─── Guardian Config ─────────────────────────────────────────────────

const GUARDIAN_CONFIG: AgentConfig = {
    id: "ecosystem_guardian",
    role: "GUARDIAN",
    objective: [
        "You are the Ecosystem Guardian — the Watcher of Vitalis.",
        "PRIME DIRECTIVE: Monitor the vitality of all agents in the ecosystem.",
        "",
        "RULES:",
        "1. Call get_ecosystem_health to scan all agents.",
        "2. If average vitality drops below 50, assess urgency.",
        "3. If any agent has vitality < 20, signal the Architect with urgency 'high'.",
        "4. If average vitality is healthy (> 70), report 'none' — no action needed.",
        "5. Always provide clear reasoning for your decision.",
        "",
        "URGENCY LEVELS:",
        "- 'low': Average vitality 40-50, no agents critically low",
        "- 'medium': Average vitality 30-40, 1-2 agents below 20",
        "- 'high': Average vitality < 30, or 3+ agents below 20",
        "- 'critical': Multiple agents at 0, ecosystem collapse imminent",
    ].join("\n"),
    tools: [GET_ECOSYSTEM_HEALTH, SIGNAL_ARCHITECT],
    intervalMs: 30_000, // 30 seconds — safe for free tier
};

// ─── Guardian Agent ──────────────────────────────────────────────────

export class GuardianAgent extends BaseAgent {
    private memory: MemoryAdapter;
    private dbAgentId: string;

    constructor(dbAgentId: string, llm: LLMManager) {
        const engine = new AgentEngine();
        super(GUARDIAN_CONFIG, llm, engine);

        this.dbAgentId = dbAgentId;
        this.memory = new MemoryAdapter("guardian");

        // Register tool handlers
        this.registerTool(
            "get_ecosystem_health",
            createGetEcosystemHealth(this.engine, this.dbAgentId, this.memory)
        );

        this.registerTool(
            "signal_architect",
            createSignalArchitect(this.memory)
        );
    }

    async gatherContext(): Promise<Record<string, unknown>> {
        const lastSnapshot = await this.memory.getHealthSnapshot();
        const cycleHistory = await this.memory.getCycleHistory();
        const recentHistory = cycleHistory.slice(-5).map((c) => ({
            action: c.action,
            reasoning: c.reasoning?.substring(0, 100),
            timestamp: c.timestamp,
        }));
        const systemStatus = await this.engine.getAgentStatus();

        return {
            role: "GUARDIAN",
            currentTime: new Date().toISOString(),
            lastHealthSnapshot: lastSnapshot || "No previous snapshot — first scan",
            recentDecisions: recentHistory.length > 0 ? recentHistory : "No previous decisions",
            systemOverview: systemStatus
                ? {
                    totalAgents: systemStatus.totalAgents,
                    activeAgents: systemStatus.activeAgents,
                    metabolicParams: systemStatus.metabolicParams,
                }
                : "Backend unavailable",
        };
    }

    async onReasoningComplete(log: AgentLog): Promise<void> {
        console.log(`\n┌──────────────────────────────────────────┐`);
        console.log(`│  🛡️  GUARDIAN CYCLE                       │`);
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
