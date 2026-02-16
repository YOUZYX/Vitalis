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
