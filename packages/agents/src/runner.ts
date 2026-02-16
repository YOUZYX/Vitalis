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
    const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";
    console.log(`║     Backend: ${BACKEND_URL.padEnd(26)}║`);
    console.log("║     Agents: 4 (Staggered Boot)          ║");
    console.log("╚══════════════════════════════════════════╝");
    console.log("");

    // ── Create single shared LLM gateway ──
    const llm = getSharedLLMManager();
    // Keys are now loaded internally by LLMManager from GEMINI_API_KEY_1..5

    // No need to manually register keys anymore
    console.log("");
    console.log("");

    // Fetch agent DB IDs from the backend
    let guardianDbId = "guardian-placeholder";
    let architectDbId = "architect-placeholder";
    let validatorDbId = "validator-placeholder";
    let strategistDbId = "strategist-placeholder";

    try {
        const response = await fetch(`${BACKEND_URL}/agent/status`);
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
