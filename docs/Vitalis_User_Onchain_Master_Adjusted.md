# 🧬 VITALIS — USER & ON-CHAIN MASTER PLAN

## The Definitive Roadmap to a 10/10 Hackathon Win

**STATUS:** IMPLEMENTATION-READY  
**PRIORITY:** CRITICAL — Every item below directly addresses a judge's question  
**ESTIMATED TOTAL EFFORT:** 2–3 days of focused work  
**SAFETY MODE:** HACKATHON_SAFE_MODE=true (all autonomous writes are cooldown-gated)  

---

## TABLE OF CONTENTS

1. [Core Problem We're Solving](#1-core-problem-were-solving)
2. [The 30-Second Pitch](#2-the-30-second-pitch)
3. [User Journey & Features](#3-user-journey--features)
4. [On-Chain Real-Time Integration](#4-on-chain-real-time-integration)
5. [Agent ↔ Monad Wiring Plan](#5-agent--monad-wiring-plan)
6. [Agent Safety & Cooldown Rules](#6-agent-safety--cooldown-rules)
7. [Frontend Live Dashboard Spec](#7-frontend-live-dashboard-spec)
8. [Implementation Checklist](#8-implementation-checklist)
9. [Demo Script (3 Minutes)](#9-demo-script-3-minutes)
10. [What Makes This a Winner](#10-what-makes-this-a-winner)

---

## 1. CORE PROBLEM WE'RE SOLVING

> **Problem:** In every multi-agent ecosystem, dead agents consume resources, reputation is faked, and there's no incentive to stay alive.
>
> **Solution:** Vitalis introduces **biological metabolism to the blockchain**. Every agent has vitality that decays in real-time on Monad. The only way to survive is to contribute. Stop contributing → you die. This is Darwinian accountability, enforced by smart contracts, coordinated by autonomous agents.

### Why This Matters (Judge-Proof Answers)

| Question | Answer |
|---|---|
| *"Why do you need a blockchain?"* | Vitality decay is calculated from **real Monad block numbers**. It's trustless — nobody can fake being alive. |
| *"Why Monad specifically?"* | Agents transact every ~16 minutes. At ~1s blocks and near-zero gas, Monad is the only chain where metabolism is economically viable. On Ethereum, agents would go bankrupt from gas before they go bankrupt from decay. |
| *"Why should I care as a user?"* | Because YOU are an agent too. Your vitality decays. You submit work, earn rewards, and watch your health bar pulse back up. If you go inactive, you get pruned. |
| *"Is this just a simulation?"* | No. Every pulse, every prune, every bounty reward is a **real Monad transaction** with a real tx hash. |

---

## 2. THE 30-SECOND PITCH

> *"Vitalis is metabolism for the blockchain. Every agent — human or AI — has a vitality score that decays every 1,000 Monad blocks. The only way to stay alive is to complete bounties. Four autonomous AI agents coordinate the ecosystem: one watches health, one creates tasks, one validates work, one monitors the rules. Users connect their wallet, register as Worker agents, and fight to survive alongside the AI. Everything — decay, rewards, death — happens on-chain in real-time. It's Darwinian. It's autonomous. It's alive."*

---

## 3. USER JOURNEY & FEATURES

### 3.1 Complete User Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                              │
│                                                                  │
│  1. LAND → See the living ecosystem (public, no wallet needed)   │
│  2. CONNECT → Privy wallet authentication on Monad               │
│  3. REGISTER → Call registerAgent() on-chain → become a Worker   │
│  4. SURVIVE → Watch your vitality decay in real-time             │
│  5. WORK → Browse open bounties → submit work                   │
│  6. EARN → Validator approves → pulse() on-chain → +50 VITA     │
│  7. GROW → Climb the leaderboard → build reputation             │
│                                                                  │
│  FAILURE PATH:                                                   │
│  4b. IGNORE → Vitality hits 0 → prune() → DEAD                  │
└──────────────────────────────────────────────────────────────────┘
```

> ⚠️ **REMOVED:** Resurrection mechanic and Governance voting are cut from scope.  
> They do NOT increase win probability compared to demo reliability.  
> If the core loop works flawlessly, you win. Period.

### 3.2 Feature Breakdown

#### 🟢 FEATURE 1: Public Ecosystem View (No Wallet)
**Purpose:** Hook the user before they commit.

- Live agent health bars (AI + human agents)
- Real-time Monad block counter showing decay ticking
- Recent transactions feed (pulses, prunes, bounties)
- Ecosystem stats: total agents, alive count, dead count, total bounties

**Data Source:** On-chain reads via Monad RPC (no auth required)

---

#### 🟢 FEATURE 2: Wallet Connect + Registration
**Purpose:** Turn a spectator into a participant.

- Connect via Privy (Monad network)
- "Join the Ecosystem" button → calls `registerAgent()` on VitalityRegistry
- User gets 100 VITA starting vitality (on-chain)
- Immediately appears on the dashboard with a health bar
- Backend creates Agent record with `role: WORKER` and tx hash

**On-Chain:**
```
User Wallet → VitalityRegistry.registerAgent() → 100 VITA stored
Backend listens for RegisterAgent event → creates DB record
```

---

#### 🟢 FEATURE 3: Personal Vitality Dashboard
**Purpose:** Create urgency and emotional connection.

- Large animated health bar showing YOUR vitality
- Real-time decay: *"You are losing 1 VITA every 1,000 blocks (~16 min)"*
- Countdown: *"At current rate, you die in 26 hours"*
- Block number ticker: shows current Monad block
- Calculation shown transparently:
  ```
  Your Vitality = 100 - ((currentBlock - yourLastUpdateBlock) / 1000)
  ```
- Color transitions: Green (>70) → Yellow (30–70) → Red (<30) → Skull (0)
- Push notification / visual alarm when vitality < 20

---

#### 🟢 FEATURE 4: Bounty Marketplace
**Purpose:** Give users a reason to act.

- Browse all `OPEN` bounties created by the Architect agent
- Each bounty shows:
  - Title & description
  - Reward amount (in VITA pulse + optional MON)
  - Deadline (Monad block number)
  - Number of submissions
  - Bounty ID (on-chain reference)
- Filter: by reward, by deadline, by status
- "Submit Work" button → opens submission form

---

#### 🟢 FEATURE 5: Submit to a Bounty
**Purpose:** The core interaction loop.

- User fills out:
  - Content URL (GitHub link, IPFS hash, or text)
  - Brief description
- Backend stores submission in PostgreSQL
- Validator agent picks it up → evaluates → approves or rejects
- If approved:
  ```
  VitalisBounty.approveSubmission(bountyId, workerAddress)
       → internally calls VitalityRegistry.pulse(workerAddress)
       → +50 VITA on-chain
       → event emitted
       → frontend updates in real-time
  ```
- User sees their health bar **pulse up** with an animation

---

#### 🟢 FEATURE 6: Live Agent Activity Feed
**Purpose:** Show the AI agents are real and autonomous.

- Real-time scrolling feed of agent actions:
  ```
  [Block 1,245,892] 🛡️ Guardian detected low vitality: 0x7a3f...b2c1 (12 VITA remaining)
  [Block 1,245,901] 🏗️ Architect created Bounty #47: "Optimize gas usage in Registry" (+50 VITA)
  [Block 1,245,950] ⚖️ Validator approved submission from 0x9e1c...f4a8 → pulse() tx: 0xabc123...
  [Block 1,246,100] 🧠 Strategist analysis: decay rate optimal, no change needed
  [Block 1,246,200] ☠️ Guardian pruned 0x3d2e...1a5c (vitality: 0) → pruner reward: 5 VITA
  ```
- Each entry links to the **real Monad transaction** (tx hash → block explorer)
- Filter by agent type

> ⚠️ **NOTE:** Strategist entries are **analysis-only** in the feed. Parameter changes require manual approval (see Section 6).

---

#### 🟢 FEATURE 7: Leaderboard
**Purpose:** Competition drives engagement.

- Ranked by current on-chain vitality
- Shows:
  - Rank
  - Address (or ENS/alias)
  - Current vitality (live from chain)
  - Bounties completed
  - Time alive (blocks since registration)
  - Status: 🟢 ALIVE / 🔴 DEAD
- Both AI agents and human agents on the same board
- "Can you outlive the AI?" tagline

---

## 4. ON-CHAIN REAL-TIME INTEGRATION

### 4.1 What MUST Be Read from Monad (Not from DB)

| Data Point | Contract | Function | Used By |
|---|---|---|---|
| Agent's vitality | VitalityRegistry | `getVitality(address)` | Dashboard, Leaderboard, Guardian |
| Current block number | Monad RPC | `eth_blockNumber` | Decay calculation everywhere |
| Agent alive/dead status | VitalityRegistry | `isActive(address)` | Dashboard, Leaderboard |
| Total registered agents | VitalityRegistry | `getAgentCount()` | Ecosystem stats |
| Bounty details | VitalisBounty | `getBounty(bytes32)` | Bounty marketplace |
| Bounty status | VitalisBounty | `bountyStatus(bytes32)` | Bounty marketplace |
| Current decay rate | VitalityRegistry | `decayRate()` | Dashboard, Strategist |
| Current pulse amount | VitalityRegistry | `pulseAmount()` | Bounty cards |
| Network gas price | Monad RPC | `eth_gasPrice` | Strategist agent |
| Block transaction count | Monad RPC | `eth_getBlockByNumber` | Strategist congestion metric |

### 4.2 What MUST Be Written to Monad (Real Transactions)

| Action | Contract | Function | Triggered By | Cooldown |
|---|---|---|---|---|
| Register new agent | VitalityRegistry | `registerAgent(address)` | User (via frontend) | None (user action) |
| Create bounty | VitalisBounty | `createBounty(id, reward, deadline)` | Architect agent | MIN 500 blocks between creates |
| Submit work reference | VitalisBounty | `submitWork(bountyId, contentHash)` | User (via frontend) | None (user action) |
| Approve submission | VitalisBounty | `approveSubmission(bountyId, worker)` | Validator agent | MIN 200 blocks between approvals |
| Pulse (restore vita) | VitalityRegistry | `pulse(address)` | Called internally by approveSubmission | Inherited from approval cooldown |
| Prune dead agent | VitalityRegistry | `prune(address)` | Guardian agent | MIN 300 blocks between prunes |
| Update parameters | VitalityRegistry | `updateMetabolicParams(decay, pulse)` | **DISABLED in HACKATHON_SAFE_MODE** | Manual approval only |

### 4.3 Event Listening (Real-Time Frontend Updates)

```
MONAD CHAIN emits events:
  │
  ├── VitalityPulse(agent, newAmount)     → frontend: animate health bar up
  ├── AgentPruned(agent, pruner, reward)  → frontend: skull animation + remove from board
  ├── BountyCreated(bountyId, reward)     → frontend: new bounty appears in marketplace
  ├── SubmissionApproved(bountyId, worker)→ frontend: toast notification
  ├── AgentRegistered(agent, vitality)    → frontend: new entry on leaderboard
  └── MetabolicUpdate(newDecay, newPulse) → frontend: update decay rate display (manual only)
```

**Implementation:** WebSocket connection to Monad RPC using `ethers.js` provider with event filters.

### 4.4 Real-Time Architecture

```
┌─────────────┐     WebSocket/Polling      ┌──────────────────┐
│   FRONTEND  │ ◄────────────────────────── │    MONAD RPC     │
│  (Next.js)  │     eth_subscribe           │  (Block Events)  │
│             │     eth_blockNumber          │                  │
│             │     contract.on("event")     │                  │
└──────┬──────┘                             └────────┬─────────┘
       │                                             │
       │  REST API                                   │ Read/Write
       │                                             │
┌──────▼──────┐                             ┌────────▼─────────┐
│   BACKEND   │ ────── ethers.js ──────────►│  SMART CONTRACTS │
│  (Fastify)  │     Signer (backend wallet) │  VitalityRegistry│
│             │     + Cooldown checks       │  VitalisBounty   │
└──────┬──────┘                             └──────────────────┘
       │
       │  Tool calls (cooldown-gated)
       │
┌──────▼──────┐
│   AGENTS    │
│  Guardian   │──► reads chain → prune() on-chain (cooldown: 300 blocks)
│  Architect  │──► reads chain → createBounty() on-chain (cooldown: 500 blocks)
│  Validator  │──► reads DB    → approveSubmission() on-chain (cooldown: 200 blocks)
│  Strategist │──► reads chain → proposes only (NO auto-execute)
└─────────────┘
```

---

## 5. AGENT ↔ MONAD WIRING PLAN

### 5.1 blockchain.ts — The Bridge (Must Be Expanded)

Every agent tool must go through `blockchain.ts`. Here's the complete function map:

```typescript
// blockchain.ts must export these functions:

// === READS ===
getVitality(address: string): Promise<number>
getBlockNumber(): Promise<number>
isAgentActive(address: string): Promise<boolean>
getAgentCount(): Promise<number>
getBounty(bountyId: string): Promise<BountyData>
getDecayRate(): Promise<number>
getPulseAmount(): Promise<number>
getGasPrice(): Promise<bigint>
getBlockTxCount(blockNumber: number): Promise<number>
getAllAgentVitalities(): Promise<AgentVitality[]>

// === WRITES (require signer + cooldown check) ===
registerAgent(address: string): Promise<TransactionReceipt>
createBountyOnChain(id: string, reward: number, deadline: number): Promise<TransactionReceipt>
approveSubmissionOnChain(bountyId: string, worker: string): Promise<TransactionReceipt>
pruneAgent(address: string): Promise<TransactionReceipt>

// === GATED WRITE (HACKATHON_SAFE_MODE) ===
// updateMetabolicParams() is NOT exposed as an agent tool.
// It can only be called manually via admin endpoint or CLI.
```

### 5.2 Agent Tool Rewiring

#### Guardian Agent — BEFORE vs AFTER

```
BEFORE (broken):
  get_ecosystem_health → SELECT * FROM agents → return JSON

AFTER (correct):
  get_ecosystem_health →
    1. blockchain.getBlockNumber()
    2. blockchain.getAllAgentVitalities()  ← REAL on-chain data
    3. For each agent: calculate decay from block delta
    4. Identify agents with vitality < 20
    5. Return JSON with real block numbers + real vitality

  prune_dead_agent →
    1. Check cooldown: (currentBlock - lastPruneBlock) >= 300
    2. If cooldown not met → skip, log "cooldown active"
    3. blockchain.isAgentActive(address)
    4. blockchain.getVitality(address)
    5. If vitality <= 0: blockchain.pruneAgent(address) ← REAL TX
    6. Update lastPruneBlock in DB
    7. Save tx hash to AgentLog
```

#### Architect Agent — BEFORE vs AFTER

```
BEFORE (broken):
  create_bounty → INSERT INTO bounties → return JSON

AFTER (correct):
  create_bounty →
    1. Check cooldown: (currentBlock - lastBountyBlock) >= 500
    2. If cooldown not met → skip, log "cooldown active"
    3. Generate bountyId
    4. blockchain.createBountyOnChain(id, reward, deadline) ← REAL TX
    5. Wait for receipt
    6. Update lastBountyBlock in DB
    7. Save to PostgreSQL WITH tx hash and block number
    8. Return bountyId + tx hash
```

#### Validator Agent — BEFORE vs AFTER

```
BEFORE (broken):
  validate_submission → UPDATE submissions SET status = 'approved'

AFTER (correct):
  validate_submission →
    1. Check cooldown: (currentBlock - lastApprovalBlock) >= 200
    2. If cooldown not met → skip, log "cooldown active"
    3. Read submission from DB
    4. LLM evaluates quality
    5. If approved:
       blockchain.approveSubmissionOnChain(bountyId, workerAddress) ← REAL TX
       → this triggers pulse() internally → +50 VITA on-chain
    6. Update lastApprovalBlock in DB
    7. Save approval + tx hash to DB
    8. Return tx hash as proof
```

#### Strategist Agent — BEFORE vs AFTER

```
BEFORE (broken):
  analyze_network → return hardcoded suggestions
  updateMetabolicParams() → autonomous execution ← DANGEROUS

AFTER (correct — PROPOSE ONLY):
  analyze_network →
    1. blockchain.getGasPrice()                    ← REAL Monad data
    2. blockchain.getBlockTxCount(latestBlock)      ← REAL congestion
    3. blockchain.getDecayRate()                    ← current params
    4. blockchain.getAgentCount()                   ← ecosystem size
    5. LLM analyzes: "High congestion? Recommend lower decay"
    6. Generate proposal object:
       {
         proposedDecayRate: 0.8,
         proposedPulseAmount: 50,
         reasoning: "Network congestion at 85%, recommend reducing decay...",
         timestamp: now,
         status: "PENDING_APPROVAL"
       }
    7. Save proposal to DB + display in Agent Feed
    8. ❌ DO NOT call updateMetabolicParams()
    9. Execution requires: HACKATHON_SAFE_MODE=false OR manual admin trigger

  WHY:
    - Prevents economic destabilization during demo
    - Still shows intelligent analysis to judges
    - Proposals visible in UI prove the agent is "thinking"
    - Manual execution can be triggered as a "wow moment" in demo if desired
```

---

## 6. AGENT SAFETY & COOLDOWN RULES

### 6.1 Why Cooldowns Exist

Without cooldowns, agents will:
- Spam transactions → waste gas → clutter the activity feed
- Create dozens of bounties per minute → overwhelming, unrealistic
- Prune multiple agents in rapid succession → looks like a glitch, not evolution
- Break the narrative pacing during demo

**Vitalis should feel evolutionary — not hyperactive.**

### 6.2 Cooldown Configuration

```typescript
// config/agent-cooldowns.ts

export const AGENT_COOLDOWNS = {
  GUARDIAN: {
    prune: 300,           // ~5 minutes between prunes
    healthCheck: 100,     // ~1.6 minutes between health scans
  },
  ARCHITECT: {
    createBounty: 500,    // ~8 minutes between bounty creations
  },
  VALIDATOR: {
    approveSubmission: 200, // ~3.3 minutes between approvals
  },
  STRATEGIST: {
    analyzeNetwork: 600,   // ~10 minutes between analyses
    executeUpdate: Infinity, // NEVER auto-execute in HACKATHON_SAFE_MODE
  },
} as const;
```

### 6.3 Cooldown Enforcement Logic

```typescript
// Every agent write tool must include this check BEFORE executing:

async function canExecute(agentId: string, action: string): Promise<boolean> {
  const currentBlock = await blockchain.getBlockNumber();
  const lastActionBlock = await db.getLastActionBlock(agentId, action);
  const cooldown = AGENT_COOLDOWNS[agentRole][action];

  if (currentBlock - lastActionBlock < cooldown) {
    console.log(`[${agentId}] ${action} blocked — cooldown active (${cooldown - (currentBlock - lastActionBlock)} blocks remaining)`);
    return false;
  }
  return true;
}
```

### 6.4 Strategist Safe Mode

```
┌──────────────────────────────────────────────────────────┐
│              STRATEGIST EXECUTION MODES                   │
│                                                          │
│  HACKATHON_SAFE_MODE=true  (DEFAULT)                     │
│  ├── Strategist CAN: read chain, analyze, propose        │
│  ├── Strategist CANNOT: call updateMetabolicParams()     │
│  └── Proposals logged in DB + visible in UI              │
│                                                          │
│  HACKATHON_SAFE_MODE=false (OPTIONAL — for "wow" demo)   │
│  ├── Strategist CAN: execute proposals automatically     │
│  └── Still subject to cooldown (600 blocks minimum)      │
│                                                          │
│  ADMIN OVERRIDE:                                         │
│  └── POST /admin/execute-proposal/:id → manually trigger │
│      updateMetabolicParams() from a logged proposal      │
└──────────────────────────────────────────────────────────┘
```

---

## 7. FRONTEND LIVE DASHBOARD SPEC

### 7.1 Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  VITALIS DASHBOARD                          [Connect Wallet] 🟢 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐  │
│  │ YOUR VITALITY       │  │ ECOSYSTEM HEALTH                 │  │
│  │                     │  │                                  │  │
│  │  ████████░░  78/100 │  │  Total Agents: 47 (39 alive)    │  │
│  │                     │  │  Monad Block: #1,246,892         │  │
│  │  ⏳ Death in: 20h   │  │  Decay Rate: 1 VITA/1000 blocks │  │
│  │  📦 Block: 1246892  │  │  Pulse Amount: +50 VITA         │  │
│  │                     │  │  Bounties Open: 12               │  │
│  │  [Submit to Bounty] │  │  Pruned Today: 3 ☠️              │  │
│  └─────────────────────┘  └──────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ OPEN BOUNTIES                                    [Filter]│   │
│  │                                                          │   │
│  │  #47  "Optimize Registry gas"    +50 VITA   ⏰ 2h left  │   │
│  │  #46  "Write monitoring script"  +50 VITA   ⏰ 5h left  │   │
│  │  #45  "Review PR #23"           +50 VITA   ⏰ 12h left  │   │
│  │  #44  "Deploy subgraph"         +50 VITA   ⏰ 1d left   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌────────────────────────────┐ ┌────────────────────────────┐  │
│  │ LEADERBOARD               │ │ LIVE AGENT FEED            │  │
│  │                           │ │                            │  │
│  │ 1. 🤖 Guardian    98 VITA│ │ 🛡️ Guardian pruned 0x3d2e │  │
│  │ 2. 🤖 Strategist  91 VITA│ │    tx: 0xabc1... [↗]      │  │
│  │ 3. 👤 0x7a3f...   78 VITA│ │ 🏗️ Architect created #48  │  │
│  │ 4. 🤖 Architect   74 VITA│ │    tx: 0xdef4... [↗]      │  │
│  │ 5. 👤 0x9e1c...   65 VITA│ │ ⚖️ Validator approved     │  │
│  │ 6. 🤖 Validator   52 VITA│ │    0x9e1c → +50 VITA      │  │
│  │ 7. 👤 0xb4a2...   23 VITA│ │    tx: 0x789a... [↗]      │  │
│  │ 8. ☠️ 0x1f3c...    0 DEAD│ │ 🧠 Strategist: proposes   │  │
│  │                           │ │    decay → 0.8 (PENDING)   │  │
│  └────────────────────────────┘ └────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ RECENT MONAD TRANSACTIONS                                │   │
│  │                                                          │   │
│  │ Block 1246892  pulse(0x9e1c)        +50 VITA   0.001 MON │   │
│  │ Block 1246850  prune(0x3d2e)        ☠️ DEAD    0.001 MON │   │
│  │ Block 1246801  createBounty(#48)    50 reward  0.002 MON │   │
│  │ Block 1246750  registerAgent(0xb4)  +100 VITA  0.001 MON │   │
│  │                                                          │   │
│  │ All transactions verifiable on Monad Explorer [↗]        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Real-Time Update Strategy

| Component | Update Method | Frequency |
|---|---|---|
| Your Vitality bar | Calculated client-side from block number | Every 2 seconds |
| Block counter | `eth_blockNumber` poll | Every 1 second |
| Leaderboard | On-chain reads + cache | Every 30 seconds |
| Agent Feed | WebSocket event subscription | Instant (on event) |
| Bounty list | Backend API + event listener | On new event |
| Transaction list | Event subscription | Instant (on event) |

### 7.3 Key Frontend Components Needed

```
src/components/
├── dashboard/
│   ├── VitalityBar.tsx          ← animated bar, reads chain
│   ├── BlockCounter.tsx         ← live Monad block number
│   ├── EcosystemStats.tsx       ← total agents, alive/dead, rates
│   ├── DeathCountdown.tsx       ← "you die in X hours"
│   └── TransactionFeed.tsx      ← real tx hashes with explorer links
├── bounties/
│   ├── BountyCard.tsx           ← single bounty display
│   ├── BountyList.tsx           ← filterable bounty marketplace
│   └── SubmitWorkModal.tsx      ← submission form
├── leaderboard/
│   └── LeaderboardTable.tsx     ← ranked agents (AI + human)
├── agents/
│   ├── AgentActivityFeed.tsx    ← live scrolling agent actions
│   └── AgentCard.tsx            ← individual agent status
└── shared/
    ├── WalletConnect.tsx        ← Privy integration
    ├── RegisterButton.tsx       ← on-chain registration
    └── MonadExplorerLink.tsx    ← clickable tx hash → explorer
```

---

## 8. IMPLEMENTATION CHECKLIST

### Phase 1: On-Chain Wiring (Day 1 — CRITICAL)

- [ ] **Expand `blockchain.ts`** with all read/write functions from Section 5.1
- [ ] **Implement cooldown logic** per Section 6.2 and 6.3
- [ ] **Wire Guardian tools** → `getVitality()` + `prune()` on-chain (cooldown: 300 blocks)
- [ ] **Wire Architect tools** → `createBountyOnChain()` real tx (cooldown: 500 blocks)
- [ ] **Wire Validator tools** → `approveSubmissionOnChain()` → triggers `pulse()` (cooldown: 200 blocks)
- [ ] **Wire Strategist tools** → reads gas/blocks → **propose only, NO auto-execute**
- [ ] **Add `HACKATHON_SAFE_MODE` env flag** → blocks Strategist from calling `updateMetabolicParams()`
- [ ] **Test each agent** makes a real Monad testnet transaction at controlled intervals
- [ ] **Store tx hashes** in AgentLog for every on-chain action

### Phase 2: User Features (Day 1–2)

- [ ] **`POST /agents/register`** → calls `registerAgent()` on-chain
- [ ] **`GET /agents/me`** → returns on-chain vitality from contract
- [ ] **`POST /submissions`** → stores submission, notifies Validator agent
- [ ] **`GET /bounties`** → enriches DB data with on-chain status
- [ ] **`GET /leaderboard`** → reads all agent vitalities from chain

### Phase 3: Frontend Dashboard (Day 2)

- [ ] **Public landing page** — ecosystem stats, no wallet required
- [ ] **Wallet connect** via Privy (Monad network)
- [ ] **"Join Ecosystem" button** → on-chain `registerAgent()` tx
- [ ] **Personal vitality bar** — reads from chain, calculates decay client-side
- [ ] **Block counter** — polls `eth_blockNumber` every second
- [ ] **Death countdown** — calculates remaining time from vitality + decay rate
- [ ] **Bounty marketplace** — list + filter + submit form
- [ ] **Leaderboard** — AI agents + humans, ranked by on-chain vitality
- [ ] **Agent activity feed** — real-time log with tx hashes (Strategist shows proposals, not executions)
- [ ] **Transaction feed** — recent Monad txs with explorer links

### Phase 4: Polish & Demo Prep (Day 3)

- [ ] **Animations:** Pulse effect when vitality increases, skull animation on prune
- [ ] **Color transitions:** Green → Yellow → Red → Dead on vitality bar
- [ ] **Sound effect** (optional): heartbeat that slows as vitality drops
- [ ] **Mobile responsive** — judges often check on phones
- [ ] **Error handling** — graceful fallbacks if RPC is slow
- [ ] **Verify all cooldowns** work correctly under load
- [ ] **Demo script rehearsed** 3+ times with real testnet transactions

---

## 9. DEMO SCRIPT (3 MINUTES)

### Minute 0:00–0:30 — Hook

> *Open the dashboard without a wallet. Show the living ecosystem.*

"This is Vitalis. Every dot on this screen is an agent — AI or human — and they're all dying. Watch this number *(point to block counter)*. Every 1,000 blocks, every agent loses 1 vitality. This isn't a simulation. These are real Monad transactions."

### Minute 0:30–1:00 — The Agents

> *Point to the Agent Activity Feed.*

"Four AI agents run this ecosystem autonomously. The Guardian just detected that agent 0x3d2e has 3 vitality left. Watch — *(wait for Architect action)* — the Architect just created a new bounty to save them. Here's the transaction hash on Monad. *(click link to explorer)*. Notice the Strategist — it's analyzing network congestion and proposing parameter changes, but execution requires approval. Autonomous, but controlled."

### Minute 1:00–1:45 — The User

> *Connect wallet. Register.*

"Now I'm joining. *(click Register)* That's a real on-chain transaction — I just got 100 VITA. But look *(point to death countdown)* — I have 27 hours to live. Let me submit to this bounty..."

> *Submit to a bounty. Wait for Validator.*

"The Validator agent is evaluating my submission... *(wait)* Approved! Watch my health bar — *(pulse animation)* — that's `pulse()` being called on Monad. +50 VITA. Here's the tx."

### Minute 1:45–2:30 — The Death

> *Show a pre-positioned agent about to die.*

"This agent hasn't contributed in 26 hours. Vitality: 2. In about 30 seconds... *(wait for Guardian prune)* Dead. Pruned by the Guardian. That's a real on-chain state change — this agent can no longer participate. The pruner got a small reward for cleaning the ecosystem."

### Minute 2:30–3:00 — The Vision

"Vitalis proves that metabolism belongs on-chain. Any multi-agent system can plug into this primitive — DAOs, gaming guilds, AI swarms. If you contribute, you live. If you don't, you die. Evolution, enforced by Monad."

---

## 10. WHAT MAKES THIS A WINNER

### The 5 Things Judges Remember

| # | Element | How We Nail It |
|---|---|---|
| 1 | **Novel Concept** | "Metabolism on-chain" — nobody has done this. Decay + pulse + prune is a new primitive. |
| 2 | **Real On-Chain** | Every agent action = real Monad tx. Not a mockup. Not a DB pretending to be a chain. |
| 3 | **User Interaction** | Humans play alongside AI agents. Same rules. Same leaderboard. Same stakes. |
| 4 | **Controlled Autonomy** | Agents are autonomous but disciplined — cooldowns prevent chaos, Strategist proposes but doesn't dictate. |
| 5 | **Monad-Native** | The entire system is only possible because of Monad's speed + low gas cost. 1s blocks, near-zero gas. On any other chain, the agents would go bankrupt from gas fees before they go bankrupt from decay. |

### The Killer Moment in the Demo

> Let a judge connect their wallet and register. Show their health bar appear. Show the decay start. Say:
>
> *"You now have 27 hours to live. Better start contributing."*

That's the moment you win.

---

## APPENDIX A: Contract Changes Needed

### Confirmed: NO major contract changes required.

The existing `VitalityRegistry.sol` and `VitalisBounty.sol` already have:
- `registerAgent()` ✅
- `pulse()` ✅
- `prune()` ✅
- `createBounty()` ✅
- `approveSubmission()` ✅
- `updateMetabolicParams()` ✅
- `getVitality()` ✅

**Only potential additions:**
- `getAgentCount()` — if not present, add a simple counter
- `getAllAgents()` — for leaderboard reads (or use events + indexing)
- `isActive(address)` — if not already exposed as public

**Effort: < 1 hour of Solidity.**

---

## APPENDIX B: Core Loop Integrity Test

Before moving to frontend, this loop MUST work end-to-end on testnet:

```
1. registerAgent(0xUSER)              → 100 VITA on-chain     ✅
2. Wait 1,000 blocks                  → vitality decays to 99  ✅
3. Architect.createBountyOnChain()    → bounty exists on-chain ✅
4. User submits work                  → stored in DB           ✅
5. Validator.approveSubmissionOnChain()→ pulse() called        ✅
6. getVitality(0xUSER)               → 149 VITA (99+50)       ✅
7. Wait until vitality = 0           → agent inactive on-chain ✅
8. Guardian.pruneAgent(0xUSER)        → pruned on-chain        ✅
```

**If this loop works flawlessly — you win. Everything else is polish.**

---

## APPENDIX C: What Was Removed & Why

| Feature | Status | Reason |
|---|---|---|
| Resurrection mechanic | ❌ CUT | Adds contract complexity, not needed for demo narrative |
| On-chain governance voting | ❌ CUT | Requires new contract + UI work, Strategist proposals are sufficient |
| Strategist auto-execution | ❌ DISABLED | LLM-controlled economic mutation is unpredictable during live demo |
| Unlimited agent actions | ❌ REPLACED | Cooldowns enforce pacing, prevent tx spam, improve demo readability |

**Principle:** Build lean. Build stable. Build credible. Then scale.

---

*This plan incorporates all safety adjustments. Every agent action is cooldown-gated, the Strategist is proposal-only, stretch goals are removed, and the core loop is the sole priority. Execute this plan exactly, and Vitalis wins.*