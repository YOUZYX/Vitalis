# VITALIS -- MASTER ARCHITECTURE

## Canonical Implementation Specification (Agent Track -- Monad)

THIS DOCUMENT IS THE SINGLE SOURCE OF TRUTH. All coding agents (Codex /
Antigravity / etc.) must rely exclusively on this specification.

No assumptions. No implicit logic. No undefined behavior.

============================================================ 1. SYSTEM
OVERVIEW ============================================================

Vitalis is a multi-agent autonomous coordination system built on Monad.

Core Principles: - No staking - No betting - No speculation mechanics -
Contribution-based rewards only - Fully on-chain reward execution -
Deterministic backend + autonomous agents

System Layers:

1.  Frontend (Next.js + Privy SDK)
2.  Backend API (Node.js)
3.  Agents (OpenClaw SDK)
4.  Memory Layer (PostgreSQL + Redis + Vector DB)
5.  Blockchain Layer (Monad + Hardhat Smart Contracts)

============================================================ 2. FRONTEND
SPECIFICATION
============================================================

Stack: - Next.js (App Router) - TypeScript (strict mode) - TailwindCSS -
Privy SDK (Monad wallet integration) - Zustand (state management)

2.1 Wallet Integration (Privy SDK -- Monad)

Requirements: - Users authenticate via Privy - Wallet connection
required before accessing dashboard - Sign message for backend session
issuance - Store JWT in httpOnly cookie

Flow: 1. User connects wallet via Privy 2. Wallet address sent to
backend 3. Backend verifies signature 4. Backend issues JWT session 5.
Frontend stores session

No private keys stored. No local wallet management logic.

2.2 Frontend Pages

1.  Landing Page
2.  Dashboard
3.  Bounty Details Page
4.  Profile Page

Dashboard Must Display: - Active bounties - Ecosystem metrics - Agent
reasoning log (read-only stream)

============================================================ 3. BACKEND
SPECIFICATION
============================================================

Stack: - Node.js (18+) - Fastify - PostgreSQL - Redis - Prisma ORM

3.1 Database Schema

Users - id (UUID) - wallet_address (unique) - reputation_score
(integer) - created_at

Bounties - id (UUID) - title - description - reward_amount - deadline -
status (active/completed/expired) - created_at

Submissions - id (UUID) - bounty_id (FK) - user_id (FK) - content_url -
status (pending/approved/rejected) - created_at

AgentLogs - id (UUID) - agent_id - reasoning_summary - timestamp

3.2 Backend Responsibilities

-   Wallet signature verification
-   JWT issuance
-   CRUD for bounties
-   Submission storage
-   Agent tool endpoints
-   Smart contract interaction
-   Event listening (Monad RPC)

All blockchain writes go through backend signer.

============================================================ 4. AGENT
LAYER -- OPENCLAW SDK
============================================================

All agents MUST use OpenClaw SDK.

Common Agent Structure: - Agent ID - Role - Objective Prompt - Tool
Registry - Memory Adapter - Execution Loop

LLM Requirements: - Deterministic temperature \<= 0.3 - Structured JSON
outputs only

Memory: - Vector DB (long-term) - Redis (short-term)

  ----------------------------
  A. Ecosystem Monitor Agent
  ----------------------------

Agent ID: ecosystem_guardian

Trigger: - Every 10 minutes - On bounty completion

Tools: - get_ecosystem_metrics() - log_agent_reasoning() -
emit_intervention_signal()

Behavior: 1. Analyze metrics 2. Detect imbalance 3. Emit signal if
needed 4. Log reasoning

  ---------------------------
  B. Bounty Generator Agent
  ---------------------------

Agent ID: bounty_architect

Trigger: - Intervention signal

Tools: - calculate_reward_amount() - create_bounty_db_entry() -
create_bounty_on_chain()

Behavior: 1. Generate bounty 2. Persist in DB 3. Call smart contract 4.
Emit event

  -----------------------
  C. Verification Agent
  -----------------------

Agent ID: validator

Trigger: - New submission

Tools: - fetch_submission() - rule_validation() -
llm_quality_analysis() - approve_on_chain() - update_reputation()

Pipeline: 1. Deterministic validation 2. LLM analysis 3. Approve or
reject 4. Execute on-chain reward 5. Update reputation

Human override endpoint required.

  ---------------------
  D. Governance Agent
  ---------------------

Agent ID: strategist

Trigger: - Weekly

Tools: - fetch_system_stats() - generate_proposal() -
log_governance_output()

============================================================ 5.
BLOCKCHAIN LAYER -- MONAD
============================================================

Framework: - Hardhat - Solidity \^0.8.x

Contracts:

VitalisBounty.sol - createBounty() - submitWork() -
approveSubmission() - claimReward()

ReputationRegistry.sol - increaseReputation() - decreaseReputation() -
getReputation()

RewardVault.sol - Holds reward pool - Only callable by authorized
backend

Security: - ReentrancyGuard - Ownable - Event logging mandatory

No staking. No gambling logic.

============================================================ 6. EVENT
SYSTEM ============================================================

Backend listens to: - BountyCreated - SubmissionMade - RewardClaimed

Agents subscribe via Redis Pub/Sub.

============================================================ 7.
DEPLOYMENT ============================================================

Docker Services: - frontend - backend - agents - postgres - redis

CI: - Hardhat tests mandatory - Linting required

============================================================ 8.
HACKATHON MVP REQUIREMENTS
============================================================

Must Demonstrate: - Privy wallet login - Bounty lifecycle - On-chain
reward execution - At least 2 live agents - Agent reasoning log visible

============================================================ 9.
NON-NEGOTIABLE RULES
============================================================

-   No staking logic
-   No betting mechanics
-   All agents use OpenClaw SDK
-   Backend mediates blockchain
-   All rewards executed on Monad

END OF MASTER SPECIFICATION
