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
