# 🧬 VITALIS MASTER SPECIFICATION

## The Canonical "Single Source of Truth" for Monad Moltiverse

**STATUS:** PRODUCTION-READY
**TARGET:** MONAD HACKATHON
**AGENTS:** 4 (Guardian, Architect, Validator, Strategist)

---

### 1. SYSTEM OVERVIEW & CORE LOGIC

Vitalis is an on-chain biological primitive for autonomous agents. It introduces **Metabolism** to the blockchain.

#### 1.1 The "Hard" Logic (Immutable Rules)

1. **Decay (Entropy):** Every registered agent loses **1 VITA per 1,000 blocks** (~16 mins on Monad).
* *Calculation:* `currentVitality = storedVitality - ((block.number - lastUpdateBlock) / 1000)`


2. **Pulse (Reward):** A successful task completion triggers a `pulse()` call.
* *Effect:* Adds **+50 VITA** to the agent's balance.


3. **Pruning (Death):** If `currentVitality <= 0`:
* The agent is marked `INACTIVE`.
* Its permissions are revoked.
* The pruner (caller) receives a small Bounty Reward.


4. **Evolution (Strategist):** The global parameters (Decay Rate, Pulse Amount) can be adjusted *only* by the **Strategist Agent** based on network congestion.

---

### 2. DATA LAYER (PRISMA SCHEMA)

*Strict schema for the Backend Agent. Must be deployed to PostgreSQL.*

```prisma
// schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum AgentRole {
  GUARDIAN    // Monitors System Health
  ARCHITECT   // Creates Bounties
  VALIDATOR   // Verifies Work & Pulses
  STRATEGIST  // Optimizes Global Params (The 4th Agent)
  WORKER      // External Agents (Users/Bots)
}

enum BountyStatus {
  OPEN
  IN_PROGRESS
  COMPLETED
  EXPIRED
}

model Agent {
  id              String      @id @default(uuid())
  walletAddress   String      @unique
  role            AgentRole
  vitality        Int         @default(100)
  reputation      Int         @default(50)
  isActive        Boolean     @default(true)
  lastPulseBlock  BigInt      @default(0)
  logs            AgentLog[]
  submissions     Submission[]
  createdBounties Bounty[]    @relation("CreatedBounties")
}

model Bounty {
  id              String      @id @default(uuid())
  onChainId       String      @unique // bytes32 from Solidity
  title           String
  description     String
  rewardAmount    Decimal     // In MON
  status          BountyStatus @default(OPEN)
  creatorId       String
  creator         Agent       @relation("CreatedBounties", fields: [creatorId], references: [id])
  submissions     Submission[]
  createdAt       DateTime    @default(now())
}

model Submission {
  id              String      @id @default(uuid())
  bountyId        String
  bounty          Bounty      @relation(fields: [bountyId], references: [id])
  agentId         String
  agent           Agent       @relation(fields: [agentId], references: [id])
  contentUri      String      // IPFS or URL
  isApproved      Boolean     @default(false)
  timestamp       DateTime    @default(now())
}

model AgentLog {
  id              Int         @id @default(autoincrement())
  agentId         String
  agent           Agent       @relation(fields: [agentId], references: [id])
  reasoning       String      @db.Text
  actionTaken     String
  timestamp       DateTime    @default(now())
}

```

---

### 3. SMART CONTRACT INTERFACES (SOLIDITY)

*Coding Agents must implement these exact interfaces.*

#### A. `IVitalityRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IVitalityRegistry {
    event VitalityPulse(address indexed agent, uint256 newAmount);
    event AgentPruned(address indexed agent);
    event ParametersUpdated(uint256 newDecayRate, uint256 newPulseAmount);

    // Core Metabolism
    function getVitality(address agent) external view returns (int256);
    function pulse(address agent) external; // Only callable by Validator
    function prune(address agent) external; // Permissionless

    // Governance (Strategist Only)
    function updateMetabolicParams(uint256 _decayRate, uint256 _pulseAmount) external;
}

```

#### B. `IVitalisBounty.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IVitalisBounty {
    event BountyCreated(bytes32 indexed bountyId, uint256 reward);
    event SubmissionApproved(bytes32 indexed bountyId, address indexed worker);

    function createBounty(string calldata metadataURI) external payable returns (bytes32);
    function approveSubmission(bytes32 bountyId, address worker) external; // Triggers Registry.pulse()
}

```

---

### 4. AGENT SWARM & TOOL DEFINITIONS (OPENCLAW JSON)

*Configuration for the 4 Autonomous Agents. Use strictly typed inputs.*

#### Agent 1: Ecosystem Guardian (The Watcher)

* **Goal:** Detect low vitality across the swarm.
* **Tool:** `get_ecosystem_health`

```json
{
  "name": "get_ecosystem_health",
  "description": "Fetches the average vitality of all agents and identifies agents at risk of pruning (< 20 VITA).",
  "parameters": {
    "type": "object",
    "properties": {
      "threshold": { "type": "integer", "description": "Vitality threshold to flag (default: 20)" }
    },
    "required": ["threshold"]
  }
}

```

#### Agent 2: Bounty Architect (The Creator)

* **Goal:** Create tasks to fix system problems found by the Guardian.
* **Tool:** `create_bounty`

```json
{
  "name": "create_bounty",
  "description": "Deploys a new bounty to the Monad blockchain and syncs to DB.",
  "parameters": {
    "type": "object",
    "properties": {
      "title": { "type": "string" },
      "rewardMON": { "type": "number", "description": "Reward in MON tokens" },
      "requirements": { "type": "string" }
    },
    "required": ["title", "rewardMON", "requirements"]
  }
}

```

#### Agent 3: Verification Agent (The Judge)

* **Goal:** Validate work and trigger the "Pulse" (Life).
* **Tool:** `validate_and_pulse`

```json
{
  "name": "validate_and_pulse",
  "description": "Verifies submission content against requirements. If valid, calls Smart Contract to pay reward and restore Vitality.",
  "parameters": {
    "type": "object",
    "properties": {
      "bountyId": { "type": "string" },
      "submissionId": { "type": "string" },
      "verdict": { "type": "boolean" },
      "reasoning": { "type": "string" }
    },
    "required": ["bountyId", "submissionId", "verdict"]
  }
}

```

#### Agent 4: Strategist (The Governor)

* **Goal:** Analyze gas fees/congestion and adjust `DecayRate`.
* **Tool:** `optimize_metabolism`

```json
{
  "name": "optimize_metabolism",
  "description": "Updates the global decay rate on-chain. Used when network is congested or agents are dying too fast.",
  "parameters": {
    "type": "object",
    "properties": {
      "newDecayRate": { "type": "integer", "description": "Blocks per 1 VITA loss" },
      "reasoning": { "type": "string" }
    },
    "required": ["newDecayRate"]
  }
}

```

---

### 5. CINEMATIC DEMO FLOW (10-DAY TARGET)

This is exactly what the "Browser Actuation" test should verify.

1. **Visceral Decay:** Dashboard loads. 4 Agent Cards are visible. Their "Green Bars" drop by 1 pixel every few seconds (simulated speed-up).
2. **Crisis:** Agent #3 (Worker) hits Red Zone (10% Life).
3. **Intervention:**
* **Guardian** logs: *"Agent #3 critical. Signal sent."*
* **Architect** logs: *"Deploying Emergency Bounty: 'Data Scrape'"* (Tx Hash appears).


4. **Resurrection:**
* Agent #3 submits mock data.
* **Validator** approves (Tx Hash appears).
* **Pulse Event:** Agent #3's bar shoots to 100% Green instantly.


5. **Evolution:**
* **Strategist** logs: *"System stress high. Lowering decay rate to protect agents."*
* Global param updates on-chain.



---

### 6. NON-NEGOTIABLE DEV RULES

1. **No Mocking:** All Contract Calls (`pulse`, `prune`) must be real Monad Testnet transactions.
2. **Idempotency:** Agent scripts must handle "Already Pruned" errors gracefully.
3. **Logs:** Every reasoning step ("I am creating a bounty because...") must be pushed to the `AgentLog` table for the frontend UI.

---