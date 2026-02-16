# package.json

```json
{
    "name": "agents",
    "version": "0.1.0",
    "private": true,
    "scripts": {
        "dev": "tsx watch src/runner.ts",
        "start": "tsx src/runner.ts",
        "build": "tsc"
    },
    "dependencies": {
        "@google/genai": "^1.0.0",
        "@upstash/redis": "^1.28.0",
        "@upstash/vector": "^1.1.0",
        "ethers": "^6.9.0",
        "dotenv": "^16.3.0",
        "zod": "^3.22.0"
    },
    "devDependencies": {
        "tsx": "^4.7.0",
        "typescript": "^5.3.0",
        "@types/node": "^20.0.0"
    }
}
```

# src\agents\architect.ts

```ts
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
        // Check queue BEFORE calling Gemini
        this.pendingSignal = await this.memory.popFromQueue("vitalis:inbox:architect");

        if (!this.pendingSignal) {
            // No work — return silently without burning a Gemini API call
            return {
                agentId: this.config.id,
                reasoning: "Queue empty — idle",
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

```

# src\agents\guardian.ts

```ts
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

```

# src\agents\strategist.ts

```ts
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

```

# src\agents\validator.ts

```ts
/**
 * Validator Agent — The Judge
 *
 * Role: Reads from vitalis:inbox:validator queue and validates submissions.
 *       On approval, triggers validate_and_pulse (pays worker + restores vitality).
 *
 * Trigger: Polling every 5s, checks vitalis:inbox:validator queue
 * Tools:   validate_and_pulse (via backend HTTP)
 *
 * Spec §4 — Agent 3
 */

import { BaseAgent, AgentConfig, AgentLog, ToolHandler } from "../core/base-agent";
import { AgentEngine } from "../core/engine";
import { MemoryAdapter } from "../core/memory";
import { LLMManager } from "../core/llm-manager";
import { VALIDATE_AND_PULSE } from "../core/tool-definitions";

// ─── Validator Config ────────────────────────────────────────────────

const VALIDATOR_CONFIG: AgentConfig = {
    id: "verification_agent",
    role: "VALIDATOR",
    objective: [
        "You are the Verification Agent — the Judge of Vitalis.",
        "PRIME DIRECTIVE: Review bounty submissions and approve or reject them.",
        "",
        "CONTEXT: You receive submissions from the validator inbox queue.",
        "Each submission contains a bountyId, submissionId, and content.",
        "",
        "RULES:",
        "1. Analyze the submission content against the bounty requirements.",
        "2. If the submission meets requirements, approve it (verdict: true).",
        "3. If insufficient, reject it (verdict: false) with reasoning.",
        "4. Approval triggers on-chain pulse() — restoring the worker's vitality.",
        "5. Be fair but thorough. The ecosystem depends on quality work.",
        "",
        "VALIDATION CRITERIA:",
        "- Relevance: Does the submission address the bounty?",
        "- Quality: Is the work adequate?",
        "- Completeness: Does it meet the stated requirements?",
    ].join("\n"),
    tools: [VALIDATE_AND_PULSE],
    intervalMs: 5_000, // 5 seconds for demo
};

// ─── Validator Agent ─────────────────────────────────────────────────

export class ValidatorAgent extends BaseAgent {
    private memory: MemoryAdapter;
    private dbAgentId: string;
    private pendingSubmission: any = null;

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
            const reasoning = params.reasoning as string || "Validated by AI";

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
     * Override tick: skip Gemini entirely when queue is empty.
     */
    async tick(): Promise<AgentLog> {
        // Check queue BEFORE calling Gemini
        this.pendingSubmission = await this.memory.popFromQueue("vitalis:inbox:validator");

        if (!this.pendingSubmission) {
            // No work — return silently without burning a Gemini API call
            return {
                agentId: this.config.id,
                reasoning: "Queue empty — idle",
                actionTaken: "none",
                timestamp: new Date(),
            };
        }

        console.log(`📬 [Validator] Received submission to validate`);

        // Submission found — NOW call Gemini
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
            pendingSubmission: this.pendingSubmission,
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
            console.log(`│  Submission: ${this.pendingSubmission ? "YES" : "none"}`);
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

```

# src\core\base-agent.ts

```ts
/**
 * Vitalis Agent Base Class
 *
 * Implements the common agent structure from the Spec:
 * - Agent ID
 * - Role
 * - Objective Prompt
 * - Tool Registry
 * - Memory Adapter (Upstash Redis + Vector)
 * - Execution Loop (via LLMManager — no direct Gemini calls)
 *
 * LLM: Routed through shared LLMManager (rate-limited, queued)
 * Temperature: <= 0.3 (deterministic)
 * Output: Structured JSON only
 */

import { LLMManager } from "./llm-manager";
import { AgentEngine } from "./engine";

// ─── Types ───────────────────────────────────────────────────────────

export interface ToolDefinition {
    name: string;
    description: string;
    parameters: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
    };
}

export interface ToolResult {
    success: boolean;
    data?: unknown;
    error?: string;
}

export type ToolHandler = (params: Record<string, unknown>) => Promise<ToolResult>;

export interface AgentConfig {
    id: string;
    role: "GUARDIAN" | "ARCHITECT" | "VALIDATOR" | "STRATEGIST";
    objective: string;
    tools: ToolDefinition[];
    intervalMs?: number; // Polling interval (e.g., 10 min for Guardian)
}

export interface AgentLog {
    agentId: string;
    reasoning: string;
    actionTaken: string;
    timestamp: Date;
}

// ─── Base Agent ──────────────────────────────────────────────────────

export abstract class BaseAgent {
    readonly config: AgentConfig;
    protected toolHandlers: Map<string, ToolHandler> = new Map();
    protected llm: LLMManager;
    protected engine: AgentEngine;
    private running: boolean = false;

    constructor(config: AgentConfig, llm: LLMManager, engine?: AgentEngine) {
        this.config = config;
        this.llm = llm;
        this.engine = engine || new AgentEngine();
    }

    /**
     * Register a tool handler for a given tool name.
     */
    registerTool(name: string, handler: ToolHandler): void {
        this.toolHandlers.set(name, handler);
    }

    /**
     * Core reasoning loop: sends objective + context to LLMManager,
     * receives structured JSON with tool calls, executes them.
     * All rate limiting, queuing, and retries are handled by LLMManager.
     */
    async reason(context: Record<string, unknown>): Promise<AgentLog> {
        const systemPrompt = [
            `You are ${this.config.id}, a Vitalis autonomous agent.`,
            `Role: ${this.config.role}`,
            `Objective: ${this.config.objective}`,
            ``,
            `Available tools: ${this.config.tools.map(t => t.name).join(", ")}`,
            ``,
            `You MUST respond with valid JSON in this exact format:`,
            `{`,
            `  "reasoning": "Your step-by-step analysis",`,
            `  "action": "tool_name_to_call" | "none",`,
            `  "params": { ... } // parameters for the tool, if action != "none"`,
            `}`,
        ].join("\n");

        const userPrompt = `Current system state:\n${JSON.stringify(context, null, 2)}\n\nAnalyze and decide your next action.`;

        try {
            const response = await this.llm.generate({
                agentId: this.config.id,
                model: this.llm.defaultModel,
                contents: userPrompt,
                config: {
                    temperature: 0.3,
                    responseMimeType: "application/json",
                    systemInstruction: systemPrompt,
                },
            });

            if (!response.success) {
                return {
                    agentId: this.config.id,
                    reasoning: `LLM error: ${response.error}`,
                    actionTaken: "error",
                    timestamp: new Date(),
                };
            }

            const decision = JSON.parse(response.text);

            // Execute tool if action specified
            let actionTaken = "none";
            if (decision.action && decision.action !== "none") {
                const handler = this.toolHandlers.get(decision.action);
                if (handler) {
                    const result = await handler(decision.params || {});
                    actionTaken = `${decision.action}: ${result.success ? "success" : "failed"}`;
                } else {
                    actionTaken = `${decision.action}: unknown_tool`;
                }
            }

            return {
                agentId: this.config.id,
                reasoning: decision.reasoning || "No reasoning provided",
                actionTaken,
                timestamp: new Date(),
            };
        } catch (error) {
            return {
                agentId: this.config.id,
                reasoning: `Error during reasoning: ${error}`,
                actionTaken: "error",
                timestamp: new Date(),
            };
        }
    }

    /**
     * Gather context for the reasoning loop.
     * Subclasses override this to provide agent-specific context.
     */
    abstract gatherContext(): Promise<Record<string, unknown>>;

    /**
     * Post-processing after reasoning completes.
     * Override in subclasses for logging, emitting events, etc.
     */
    abstract onReasoningComplete(log: AgentLog): Promise<void>;

    /**
     * Single execution cycle: gather context → reason → push to backend → process result.
     */
    async tick(): Promise<AgentLog> {
        const context = await this.gatherContext();
        const log = await this.reason(context);

        // Push reasoning to backend (feeds the Live Feed via SSE)
        try {
            await this.engine.logReasoning({
                agentId: log.agentId,
                reasoning: log.reasoning,
                actionTaken: log.actionTaken,
            });
        } catch (err) {
            console.error(`❌ [${this.config.id}] Failed to push log to backend:`, err);
        }

        await this.onReasoningComplete(log);
        return log;
    }

    /**
     * Start the agent's execution loop.
     */
    async start(): Promise<void> {
        this.running = true;
        console.log(`🤖 [${this.config.id}] Agent started (interval: ${this.config.intervalMs || "event-driven"}ms)`);

        if (this.config.intervalMs) {
            // Polling mode (Guardian, Strategist)
            while (this.running) {
                try {
                    await this.tick();
                } catch (error) {
                    console.error(`[${this.config.id}] Tick error:`, error);
                }
                await this.sleep(this.config.intervalMs);
            }
        }
        // Event-driven agents (Architect, Validator) subscribe via Redis
    }

    /**
     * Stop the agent's execution loop.
     */
    stop(): void {
        this.running = false;
        console.log(`🛑 [${this.config.id}] Agent stopped`);
    }

    protected sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

```

# src\core\engine.ts

```ts
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
                    headers: { "Content-Type": "application/json" },
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
            const response = await fetch(`${this.backendUrl}/agent-logs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    agentId: entry.agentId,
                    reasoning: entry.reasoning,
                    actionTaken: entry.actionTaken,
                }),
            });
            if (!response.ok) {
                console.error(`❌ [Engine] Failed to push log to backend: HTTP ${response.status}`);
            }
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

```

# src\core\llm-manager.ts

```ts
/**
 * LLMManager — Serialized Gemini API Gateway (v2.0 — Rate-Limit Stable)
 *
 * Architecture:
 *   All Agents → single LLMManager (serialized queue + inter-request delay) → Gemini API
 *
 * Features:
 * - Global concurrency = 1: only ONE request active at a time
 * - 6500ms minimum delay between consecutive requests (~9 RPM, well under free-tier 10 RPM)
 * - Per-request exponential backoff on 429: 5s → 10s → 20s (NO global cooldown)
 * - Priority queue with depth ordering
 * - Deterministic logging: agent ID, queue wait, attempt count, success/failure
 * - Per-agent API key rotation: each request uses the key assigned to its agent
 *
 * Environment:
 *   GEMINI_MODEL  (default gemini-2.5-flash)
 *   INTER_REQUEST_DELAY_MS (default 6500)
 */

import { GoogleGenAI } from "@google/genai";

// ─── Types ───────────────────────────────────────────────────────────

export interface LLMRequest {
    agentId: string;
    model: string;
    contents: string;
    config: {
        temperature: number;
        responseMimeType: string;
        systemInstruction: string;
    };
}

export interface LLMResponse {
    text: string;
    success: boolean;
    error?: string;
}

interface QueuedRequest {
    request: LLMRequest;
    resolve: (value: LLMResponse) => void;
    enqueueTime: number;
    depth: number;
}

// ─── LLM Manager (Singleton) ────────────────────────────────────────

export class LLMManager {
    // Per-agent Gemini clients (each with its own API key)
    private clients: Map<string, GoogleGenAI> = new Map();
    private model: string;

    // Serialized queue
    private queue: QueuedRequest[] = [];
    private processing: boolean = false;
    private requestCounter: number = 0;

    // Inter-request delay: enforce minimum gap between consecutive Gemini calls
    private lastRequestEnd: number = 0;
    private readonly interRequestDelayMs: number;

    // Retry config — per-request backoff, NO global cooldown
    private readonly MAX_RETRIES = 3;
    private readonly RETRY_DELAYS_MS = [5_000, 10_000, 20_000];
    private readonly JITTER_MS = 500;

    constructor() {
        this.model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        this.interRequestDelayMs = parseInt(process.env.INTER_REQUEST_DELAY_MS || "6500", 10);

        console.log(`🔒 [LLMManager] Serialized queue | model: ${this.model} | delay: ${this.interRequestDelayMs}ms (~${Math.floor(60_000 / this.interRequestDelayMs)} RPM)`);
    }

    /**
     * Register an agent's API key. Must be called before that agent submits requests.
     */
    registerAgent(agentId: string, apiKey: string): void {
        if (!apiKey) {
            console.warn(`⚠️  [LLMManager] No API key for agent "${agentId}" — will fail on generate()`);
            return;
        }
        this.clients.set(agentId, new GoogleGenAI({ apiKey }));
        console.log(`   🔑 [LLMManager] Registered "${agentId}" key: ...${apiKey.slice(-6)}`);
    }

    get defaultModel(): string {
        return this.model;
    }

    /**
     * Submit a request to the LLM. Queues and processes sequentially.
     * Never throws — errors are returned in the LLMResponse.
     */
    async generate(request: LLMRequest, depth: number = 0): Promise<LLMResponse> {
        return new Promise<LLMResponse>((resolve) => {
            const id = ++this.requestCounter;
            console.log(`📥 [LLM] #${id} queued (agent: ${request.agentId}, queue: ${this.queue.length + 1})`);

            this.queue.push({
                request,
                resolve,
                enqueueTime: Date.now(),
                depth,
            });

            // Sort by depth (lower = higher priority) for fairness
            this.queue.sort((a, b) => a.depth - b.depth);

            this.processQueue();
        });
    }

    // ─── Queue Processor (Sequential) ────────────────────────────────

    private async processQueue(): Promise<void> {
        if (this.processing) return;
        this.processing = true;

        while (this.queue.length > 0) {
            // ── Inter-request delay gate ──
            await this.enforceDelay();

            const item = this.queue.shift();
            if (!item) break;

            await this.executeWithRetry(item);
        }

        this.processing = false;
    }

    /**
     * Enforce minimum delay between consecutive Gemini API calls.
     */
    private async enforceDelay(): Promise<void> {
        const elapsed = Date.now() - this.lastRequestEnd;
        const remaining = this.interRequestDelayMs - elapsed;

        if (remaining > 0) {
            console.log(`⏳ [LLM] Inter-request delay: ${Math.ceil(remaining / 1000)}s (${this.queue.length} queued)`);
            await this.sleep(remaining);
        }
    }

    /**
     * Execute a single request with per-request exponential backoff.
     * No global cooldown — only this request retries; queue continues after.
     */
    private async executeWithRetry(item: QueuedRequest): Promise<void> {
        const { request, resolve, enqueueTime } = item;
        const waitedMs = Date.now() - enqueueTime;

        const client = this.clients.get(request.agentId);
        if (!client) {
            console.error(`❌ [LLM] No API key registered for agent "${request.agentId}"`);
            resolve({ text: "{}", success: false, error: `No API key for agent ${request.agentId}` });
            this.lastRequestEnd = Date.now();
            return;
        }

        console.log(`🚀 [LLM] Executing (agent: ${request.agentId}, waited: ${Math.ceil(waitedMs / 1000)}s)`);

        for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
            try {
                const response = await client.models.generateContent({
                    model: request.model || this.model,
                    contents: request.contents,
                    config: {
                        temperature: request.config.temperature,
                        responseMimeType: request.config.responseMimeType,
                        systemInstruction: request.config.systemInstruction,
                    },
                });

                const text = response.text ?? "{}";
                this.lastRequestEnd = Date.now();
                console.log(`✅ [LLM] Complete (agent: ${request.agentId}, attempt: ${attempt}/${this.MAX_RETRIES})`);
                resolve({ text, success: true });
                return;
            } catch (error: any) {
                const is429 = error?.status === 429 ||
                    error?.message?.includes("429") ||
                    error?.message?.includes("RESOURCE_EXHAUSTED") ||
                    error?.message?.includes("rate") ||
                    error?.message?.includes("quota");

                const isTransient = is429 ||
                    error?.status === 503 ||
                    error?.message?.includes("UNAVAILABLE");

                if (isTransient && attempt < this.MAX_RETRIES) {
                    const backoffMs = this.RETRY_DELAYS_MS[attempt - 1] || 20_000;
                    const jitter = Math.floor(Math.random() * this.JITTER_MS * 2) - this.JITTER_MS;
                    const waitMs = backoffMs + jitter;

                    console.warn(`⚠️  [LLM] ${is429 ? "429" : "transient"} (agent: ${request.agentId}, attempt ${attempt}/${this.MAX_RETRIES}) — retry in ${Math.ceil(waitMs / 1000)}s`);
                    await this.sleep(waitMs);
                    continue;
                }

                // Final attempt failed or non-transient error
                const errorMsg = error?.message || String(error);
                console.error(`❌ [LLM] Failed (agent: ${request.agentId}, attempt ${attempt}/${this.MAX_RETRIES}): ${errorMsg.substring(0, 120)}`);
                this.lastRequestEnd = Date.now();
                resolve({ text: "{}", success: false, error: errorMsg });
                return;
            }
        }

        this.lastRequestEnd = Date.now();
        resolve({ text: "{}", success: false, error: "Max retries exhausted" });
    }

    /**
     * Get queue stats for monitoring.
     */
    getStats(): { queueLength: number; isProcessing: boolean } {
        return { queueLength: this.queue.length, isProcessing: this.processing };
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((r) => setTimeout(r, ms));
    }
}

// ─── Singleton Export ────────────────────────────────────────────────

let _instance: LLMManager | null = null;

/**
 * Get or create the global LLMManager singleton.
 * All agents share this single serialized queue.
 */
export function getSharedLLMManager(): LLMManager {
    if (!_instance) {
        _instance = new LLMManager();
    }
    return _instance;
}

```

# src\core\memory.ts

```ts
/**
 * Upstash Memory Adapter
 *
 * Short-term memory: Upstash Redis (key-value, TTL-based)
 * Long-term memory: Upstash Vector (semantic search)
 *
 * Each agent gets a namespaced key prefix in Redis.
 */

import { Redis } from "@upstash/redis";

// ─── Types ───────────────────────────────────────────────────────────

export interface MemoryEntry {
    key: string;
    value: unknown;
    ttlSeconds?: number;
}

// ─── Memory Adapter ──────────────────────────────────────────────────

export class MemoryAdapter {
    private redis: Redis;
    private prefix: string;

    constructor(agentId: string) {
        const url = process.env.UPSTASH_REDIS_REST_URL;
        const token = process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!url || !token) {
            console.warn(`⚠️  Upstash Redis not configured. Memory will be in-memory only.`);
            // Fallback: create a dummy redis-like object
            this.redis = null as any;
        } else {
            this.redis = new Redis({ url, token });
        }

        this.prefix = `vitalis:${agentId}:`;
    }

    /**
     * Store a value in short-term memory with optional TTL.
     */
    async set(key: string, value: unknown, ttlSeconds: number = 3600): Promise<void> {
        if (!this.redis) return;
        await this.redis.setex(`${this.prefix}${key}`, ttlSeconds, JSON.stringify(value));
    }

    /**
     * Retrieve a value from short-term memory.
     */
    async get<T = unknown>(key: string): Promise<T | null> {
        if (!this.redis) return null;
        const data = await this.redis.get(`${this.prefix}${key}`);
        if (!data) return null;
        return typeof data === "string" ? JSON.parse(data) : data as T;
    }

    /**
     * Store the latest reasoning cycle results.
     */
    async storeLastCycle(data: {
        reasoning: string;
        action: string;
        result: unknown;
        timestamp: string;
    }): Promise<void> {
        await this.set("last_cycle", data, 7200); // 2 hour TTL

        // Also append to cycle history (keep last 20)
        const history = await this.getCycleHistory();
        history.push(data);
        if (history.length > 20) history.shift();
        await this.set("cycle_history", history, 86400); // 24 hour TTL
    }

    /**
     * Get cycle history for context building.
     */
    async getCycleHistory(): Promise<any[]> {
        return (await this.get<any[]>("cycle_history")) || [];
    }

    /**
     * Store ecosystem health snapshot (Guardian-specific).
     */
    async storeHealthSnapshot(data: unknown): Promise<void> {
        await this.set("health_snapshot", data, 1800); // 30 min TTL
    }

    /**
     * Get last health snapshot.
     */
    async getHealthSnapshot(): Promise<any> {
        return this.get("health_snapshot");
    }

    /**
     * Push a message onto a Redis queue (Upstash HTTP-compatible).
     * Uses RPUSH — new items go to the end of the list.
     */
    async pushToQueue(queueName: string, data: unknown): Promise<void> {
        if (!this.redis) return;
        await this.redis.rpush(queueName, JSON.stringify(data));
    }

    /**
     * Pop a message from a Redis queue (Upstash HTTP-compatible).
     * Uses LPOP — oldest item first (FIFO).
     * Returns null if queue is empty.
     */
    async popFromQueue(queueName: string): Promise<any | null> {
        if (!this.redis) return null;
        const raw = await this.redis.lpop(queueName);
        if (!raw) return null;
        try {
            return typeof raw === "string" ? JSON.parse(raw) : raw;
        } catch {
            return raw;
        }
    }

    /**
     * Check queue length without consuming messages.
     */
    async queueLength(queueName: string): Promise<number> {
        if (!this.redis) return 0;
        return this.redis.llen(queueName);
    }
}

```

# src\core\tool-definitions.ts

```ts
/**
 * OpenClaw-Compatible Tool Definitions
 *
 * Exact JSON schemas from Vitalis_Master_Spec.md §4.
 * These define the "function calling" interface for each agent.
 */

import { ToolDefinition } from "./base-agent";

// ─── Agent 1: Ecosystem Guardian ─────────────────────────────────────

export const GET_ECOSYSTEM_HEALTH: ToolDefinition = {
    name: "get_ecosystem_health",
    description:
        "Fetches the average vitality of all agents and identifies agents at risk of pruning (< 20 VITA).",
    parameters: {
        type: "object",
        properties: {
            threshold: {
                type: "integer",
                description: "Vitality threshold to flag (default: 20)",
            },
        },
        required: ["threshold"],
    },
};

// ─── Agent 2: Bounty Architect ───────────────────────────────────────

export const CREATE_BOUNTY: ToolDefinition = {
    name: "create_bounty",
    description:
        "Deploys a new bounty to the Monad blockchain and syncs to DB.",
    parameters: {
        type: "object",
        properties: {
            title: { type: "string" },
            rewardMON: {
                type: "number",
                description: "Reward in MON tokens",
            },
            requirements: { type: "string" },
        },
        required: ["title", "rewardMON", "requirements"],
    },
};

// ─── Agent 3: Verification Agent ─────────────────────────────────────

export const VALIDATE_AND_PULSE: ToolDefinition = {
    name: "validate_and_pulse",
    description:
        "Verifies submission content against requirements. If valid, calls Smart Contract to pay reward and restore Vitality.",
    parameters: {
        type: "object",
        properties: {
            bountyId: { type: "string" },
            submissionId: { type: "string" },
            verdict: { type: "boolean" },
            reasoning: { type: "string" },
        },
        required: ["bountyId", "submissionId", "verdict"],
    },
};

// ─── Agent 4: Strategist ─────────────────────────────────────────────

export const OPTIMIZE_METABOLISM: ToolDefinition = {
    name: "optimize_metabolism",
    description:
        "Updates the global decay rate on-chain. Used when network is congested or agents are dying too fast.",
    parameters: {
        type: "object",
        properties: {
            newDecayRate: {
                type: "integer",
                description: "Blocks per 1 VITA loss",
            },
            reasoning: { type: "string" },
        },
        required: ["newDecayRate"],
    },
};

```

# src\runner.ts

```ts
/**
 * Vitalis Agent Runner — Full Swarm Orchestrator (v2.0 — Serialized)
 *
 * Architecture:
 *   Runner → creates ONE shared LLMManager → registers per-agent API keys
 *   Each Agent → shared LLMManager (serialized queue) → Gemini API
 *
 * Boot Staggering:
 *   Guardian     → immediate
 *   Architect    → +5s delay
 *   Validator    → +10s delay
 *   Strategist   → +15s delay
 */

import dotenv from "dotenv";
import path from "path";

// Load env from monorepo root using absolute paths
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env.local") });

import { getSharedLLMManager } from "./core/llm-manager";
import { GuardianAgent } from "./agents/guardian";
import { ArchitectAgent } from "./agents/architect";
import { ValidatorAgent } from "./agents/validator";
import { StrategistAgent } from "./agents/strategist";

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    console.log("╔══════════════════════════════════════════╗");
    console.log("║     🧬 VITALIS AGENT SWARM v2.0         ║");
    console.log("║     LLM: Shared Serialized Queue        ║");
    console.log(`║     Model: ${model.padEnd(28)}║`);
    console.log("║     Backend: http://localhost:3001       ║");
    console.log("║     Agents: 4 (Staggered Boot)          ║");
    console.log("╚══════════════════════════════════════════╝");
    console.log("");

    // ── Create single shared LLM gateway ──
    const llm = getSharedLLMManager();
    const fallbackKey = process.env.GEMINI_OPENCLAW_API_KEY || "";

    // Register per-agent API keys (each agent still uses its own key for quota separation)
    llm.registerAgent("ecosystem_guardian", process.env.GUARDIAN_GEMINI_OPENCLAW_API_KEY || fallbackKey);
    llm.registerAgent("bounty_architect", process.env.ARCHITECT_GEMINI_OPENCLAW_API_KEY || fallbackKey);
    llm.registerAgent("verification_agent", process.env.VALIDATOR_GEMINI_OPENCLAW_API_KEY || fallbackKey);
    llm.registerAgent("network_strategist", process.env.STRATEGIST_GEMINI_OPENCLAW_API_KEY || fallbackKey);
    console.log("");

    // Fetch agent DB IDs from the backend
    let guardianDbId = "guardian-placeholder";
    let architectDbId = "architect-placeholder";
    let validatorDbId = "validator-placeholder";
    let strategistDbId = "strategist-placeholder";

    try {
        const response = await fetch("http://localhost:3001/agent/status");
        if (response.ok) {
            const data = await response.json() as any;
            const agents = data.agents || [];

            const guardian = agents.find((a: any) => a.role === "GUARDIAN");
            const architect = agents.find((a: any) => a.role === "ARCHITECT");
            const validator = agents.find((a: any) => a.role === "VALIDATOR");
            const strategist = agents.find((a: any) => a.role === "STRATEGIST");

            if (guardian) { guardianDbId = guardian.id; console.log(`📋 Guardian ID:   ${guardianDbId}`); }
            if (architect) { architectDbId = architect.id; console.log(`📋 Architect ID:  ${architectDbId}`); }
            if (validator) { validatorDbId = validator.id; console.log(`📋 Validator ID:  ${validatorDbId}`); }
            if (strategist) { strategistDbId = strategist.id; console.log(`📋 Strategist ID: ${strategistDbId}`); }
        }
    } catch {
        console.warn("⚠️  Backend not reachable. Using placeholder agent IDs.");
    }

    // ── Initialize agents — ALL share the SAME LLMManager ──
    const guardian = new GuardianAgent(guardianDbId, llm);
    const architect = new ArchitectAgent(architectDbId, llm);
    const validator = new ValidatorAgent(validatorDbId, llm);
    const strategist = new StrategistAgent(strategistDbId, llm);

    // Graceful shutdown
    const shutdown = () => {
        console.log("\n🛑 Shutting down agent swarm...");
        guardian.stop();
        architect.stop();
        validator.stop();
        strategist.stop();
        process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    // ── Staggered boot: prevent burst collisions at startup ──
    console.log("\n🚀 Starting 4 agents (Staggered Boot)...\n");

    const BOOT_STAGGER_MS = 5000; // 5s between each agent start

    guardian.start();
    console.log("   🛡️  Guardian started (immediate)");

    await sleep(BOOT_STAGGER_MS);
    architect.start();
    console.log("   🏗️  Architect started (+5s)");

    await sleep(BOOT_STAGGER_MS);
    validator.start();
    console.log("   ⚖️  Validator started (+10s)");

    await sleep(BOOT_STAGGER_MS);
    strategist.start();
    console.log("   🧠  Strategist started (+15s)");

    console.log("\n✅ All agents running. Queue is serialized — no 429s expected.\n");

    // Keep process alive
    await new Promise(() => { });
}

function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

main().catch((error) => {
    console.error("Fatal error in agent runner:", error);
    process.exit(1);
});

```

# src\tools\guardianTools.ts

```ts
/**
 * Guardian Tools — HTTP Bridge to Backend
 *
 * Tool: get_ecosystem_health (auto-escalates to Architect queue when at-risk)
 * Tool: signal_architect (manual queue push — also available for LLM)
 *
 * Spec §4 — Agent 1: Ecosystem Guardian
 */

import { ToolHandler } from "../core/base-agent";
import { AgentEngine } from "../core/engine";
import { MemoryAdapter } from "../core/memory";

/**
 * Create the get_ecosystem_health tool handler.
 *
 * Auto-escalation: if agentsAtRisk > 0, automatically pushes a signal
 * to the Architect's inbox queue so the full pipeline fires.
 */
export function createGetEcosystemHealth(
    engine: AgentEngine,
    agentId: string,
    memory: MemoryAdapter
): ToolHandler {
    return async (params: Record<string, unknown>) => {
        const threshold = (params.threshold as number) || 20;

        console.log(`🔍 [Guardian] Checking ecosystem health (threshold: ${threshold})...`);

        const response = await engine.executeTool({
            action: "get_ecosystem_health",
            agentId,
            params: { threshold },
        });

        if (!response.success) {
            console.error(`❌ [Guardian] Health check failed: ${response.error}`);
            return {
                success: false,
                error: response.error,
            };
        }

        const result = response.result as any;
        const avgVitality = result?.averageVitality ?? 0;
        const atRisk = result?.agentsAtRisk ?? 0;
        console.log(`📊 [Guardian] Health: avg=${avgVitality}, at_risk=${atRisk}`);

        // Store health snapshot for context in future cycles
        await memory.storeHealthSnapshot(result);

        // Auto-escalation: if agents are at risk, push signal to Architect queue
        if (atRisk > 0) {
            const urgency =
                atRisk >= 4 ? "critical" :
                    atRisk >= 3 ? "high" :
                        atRisk >= 2 ? "medium" : "low";

            console.log(`🚨 [Guardian] Auto-escalating to Architect (urgency: ${urgency}, at_risk: ${atRisk})`);

            await memory.pushToQueue("vitalis:inbox:architect", {
                type: "guardian_alert",
                urgency,
                averageVitality: avgVitality,
                agentsAtRisk: atRisk,
                atRiskDetails: result?.atRiskAgents || [],
                timestamp: new Date().toISOString(),
            });

            console.log(`📬 [Guardian] Signal queued → vitalis:inbox:architect`);
        }

        return {
            success: true,
            data: result,
        };
    };
}

/**
 * Create a tool that manually signals the Architect to create emergency bounties.
 * Uses Upstash Redis RPUSH queue pattern (HTTP-compatible).
 */
export function createSignalArchitect(
    memory: MemoryAdapter
): ToolHandler {
    return async (params: Record<string, unknown>) => {
        const atRiskAgents = params.atRiskAgents as any[] || [];
        const urgency = params.urgency as string || "medium";

        console.log(`🚨 [Guardian] Manually signaling Architect (urgency: ${urgency})...`);

        await memory.pushToQueue("vitalis:inbox:architect", {
            type: "guardian_alert",
            urgency,
            atRiskAgents,
            timestamp: new Date().toISOString(),
        });

        console.log(`📬 [Guardian] Signal queued to vitalis:inbox:architect`);

        return {
            success: true,
            data: {
                signalSent: true,
                urgency,
                agentsSignaled: atRiskAgents.length,
            },
        };
    };
}

```

# tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "lib": [
            "ES2020"
        ],
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true,
        "resolveJsonModule": true,
        "declaration": true,
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

