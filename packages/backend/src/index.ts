/**
 * Vitalis Backend — Main Entry Point
 *
 * Fastify server with:
 * - JWT auth (via @fastify/jwt)
 * - CORS configured for localhost:3000
 * - All API routes registered
 * - Blockchain service initialized
 */

import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import dotenv from "dotenv";
import path from "path";

// Load env from monorepo root using absolute paths
const envPath = path.resolve(__dirname, "../../../.env");
const envLocalPath = path.resolve(__dirname, "../../../.env.local");

console.log("📁 Loading .env from:", envPath);
console.log("📁 Loading .env.local from:", envLocalPath);

dotenv.config({ path: envPath });
dotenv.config({ path: envLocalPath });

console.log("🔑 Wallet Key Present:", !!process.env.WALLET_PRIVATE_KEY);
console.log("🔑 Wallet Key starts with 0x:", process.env.WALLET_PRIVATE_KEY?.startsWith("0x") ?? false);
console.log("🌐 RPC URL:", process.env.MONAD_RPC_URL || "(using default)");

import { initBlockchain } from "./services/blockchain";
import { authRoutes } from "./routes/auth";
import { bountyRoutes } from "./routes/bounties";
import { submissionRoutes } from "./routes/submissions";
import { agentLogRoutes } from "./routes/agent-logs";
import { agentActionRoutes } from "./routes/agent-actions";
import { chainRoutes } from "./routes/chain";

// ─── Create Fastify App ──────────────────────────────────────────────

const app = Fastify({
    logger: true,
});

// ─── Plugins ─────────────────────────────────────────────────────────

// CORS — allow frontend at localhost:3000
app.register(cors, {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
});

// JWT — for issuing and verifying auth tokens
app.register(jwt, {
    secret: process.env.JWT_SECRET || "vitalis-dev-secret-change-in-production",
});

// ─── Auth Decorator ──────────────────────────────────────────────────

// Decorate fastify instance with an `authenticate` method
app.decorate("authenticate", async function (request: any, reply: any) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
    }
});

// ─── Health Check ────────────────────────────────────────────────────

app.get("/health", async () => {
    return {
        status: "ok",
        service: "vitalis-backend",
        timestamp: new Date().toISOString(),
    };
});

// ─── Register Route Groups ──────────────────────────────────────────

app.register(authRoutes, { prefix: "/auth" });
app.register(bountyRoutes, { prefix: "/bounties" });
app.register(submissionRoutes, { prefix: "/submissions" });
app.register(agentLogRoutes, { prefix: "/agent-logs" });
app.register(agentActionRoutes, { prefix: "/agent" });
app.register(chainRoutes, { prefix: "/chain" });

// ─── Start Server ────────────────────────────────────────────────────

const start = async () => {
    try {
        // Initialize blockchain service
        initBlockchain();

        const port = parseInt(process.env.PORT || "3001", 10);
        await app.listen({ port, host: "0.0.0.0" });

        console.log("");
        console.log("╔══════════════════════════════════════════╗");
        console.log("║     🧬 VITALIS BACKEND v0.1.0           ║");
        console.log(`║     Port: ${port}                          ║`);
        console.log("║     Chain: Monad Testnet (10143)         ║");
        console.log("╚══════════════════════════════════════════╝");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
