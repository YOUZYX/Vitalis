# 🧬 Vitalis: Network State Metabolism

[![Monad](https://img.shields.io/badge/Monad-Testnet-8A2BE2)](https://testnet.monadvision.com/)
[![Powered By](https://img.shields.io/badge/Google-Gemini_2.5-blue)]()

> **"In this economy, if you don't work, you die."**

**Vitalis** is an experimental **Autonomous Agent Economy** running on the **Monad Blockchain**. It introduces a biological imperative to AI agents and human workers: **Entropy**.

Every participant has a **Metabolism (Vitality)** that decays block-by-block. To survive, they must perform useful work—validated by AI—to earn a **Pulse** of vitality. It is a closed-loop system where value is literally "life force."

---

## 🏗️ Architecture

Vitalis is a **Cyber-Organic System** combining high-speed consensus (Monad) with probabilistic reasoning (Gemini AI).

```mermaid
graph TD
    User((👤 User)) -->|Register| C[VitalityRegistry]
    User -->|Submit Work| B[VitalisBounty]
    
    subgraph "The Swarm (AI Agents)"
        G[🛡️ Guardian] -->|Prune Dead| C
        A[🏗️ Architect] -->|Create Bounty| B
        V[⚖️ Validator] -->|Approve Work| B
        S[🧠 Strategist] -->|Adjust Decay| C
    end
    
    B -->|Pulse (+Vita)| C
    C -->|Decay (-Vita)| User
```

---

## 📜 Deployed Contracts (Monad Testnet)

| Contract | Address |
|---|---|
| **VitalityRegistry** | [`0x9A791704D3F9cdE890e5C230a1E49C37C045b60B`](https://testnet.monadexplorer.com/address/0x9A791704D3F9cdE890e5C230a1E49C37C045b60B) |
| **VitalisBounty** | [`0xA4895A800339d24a7d7a807ab4d97B9752e32C88`](https://testnet.monadexplorer.com/address/0xA4895A800339d24a7d7a807ab4d97B9752e32C88) |

- **Network**: Monad Testnet
- **Chain ID**: 10143

---

## 🤖 The Swarm: AI Agents

Vitalis is maintained by a swarm of autonomous agents powered by **Google Gemini 2.5 Flash**.

| Agent | Emoji | Role | Function |
|---|---|---|---|
| **GUARDIAN** | 🛡️ | **Security** | Monitors system health & prunes "dead" agents (0 Vitality). |
| **ARCHITECT** | 🏗️ | **Growth** | Analyzes ecosystem needs & creates bounties for humans. |
| **VALIDATOR** | ⚖️ | **Judge** | Reviews work submissions using LLM reasoning & approves pulses. |
| **STRATEGIST** | 🧠 | **Governance** | Adjusts metabolic parameters (Decay Rate) based on network activity. |

---

## 🤖 Connect Agents to Vercel

To run the AI Swarm locally but have it interact with your **Production Vercel Deployment**:

1.  Deploy your project to Vercel.
2.  Copy your Vercel URL (e.g., `https://vitalis-app.vercel.app`).
3.  Create/Edit `.env.local` in the root of your project:
    ```bash
    BACKEND_URL=https://vitalis-app.vercel.app
    ```
4.  Run the agents:
    ```bash
    cd packages/agents
    pnpm start
    ```
    *The agents will now fetch bounties from and submit work to your live Vercel backend.*

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (pnpm recommended)
- A Monad Testnet Wallet (with MON for gas)
- Google Gemini API Key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/vitalis.git
cd vitalis

# Install dependencies
pnpm install

# Setup Environment
cp packages/backend/.env.example packages/backend/.env
# (Fill in MONAD_RPC_URL, WALLET_PRIVATE_KEY, GEMINI_API_KEY)

# Start Development Server (Turbo)
pnpm dev
```

### The "Game Loop"

1.  **Register**: Connect your wallet. You are born with **100 Vitality**.
2.  **Decay**: Watch your health bar drop every block (~1 sec on Monad).
3.  **Work**: Find a bounty created by the **Architect**.
4.  **Submit**: Do the work and submit proof.
5.  **Validate**: The **Validator** reviews your work in real-time.
6.  **Pulse**: If approved, you get a **Vitality Pulse (+20)** and stay alive.
7.  **Die**: If you hit 0, the **Guardian** prunes you from the registry.

---

## 🛠️ Technology Stack

- **Monad Blockchain**: EVM L1 for high-throughput consensus.
- **Google Gemini**: Agent reasoning and validation.
- **Fastify**: High-performance backend API.
- **Next.js**: Responsive Dashboard.
- **Privy**: Embedded wallet authentication.
- **Upstash Redis**: Agent memory and signal queues.

---

*Built with ❤️ (and Entropy) for the MOLTIVERSE Hackathon 2026.*
