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
