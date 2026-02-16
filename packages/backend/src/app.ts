import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { initBlockchain } from "./services/blockchain";
import { authRoutes } from "./routes/auth";
import { bountyRoutes } from "./routes/bounties";
import { submissionRoutes } from "./routes/submissions";
import { agentLogRoutes } from "./routes/agent-logs";
import { agentActionRoutes } from "./routes/agent-actions";
import { chainRoutes } from "./routes/chain";

export async function buildApp() {
    const app = Fastify({
        logger: true,
    });

    // ─── Plugins ─────────────────────────────────────────────────────────

    app.register(cors, {
        origin: ["http://localhost:3000", "http://localhost:3001", "https://vitalis.vercel.app"],
        credentials: true,
    });

    app.register(jwt, {
        secret: process.env.JWT_SECRET || "vitalis-dev-secret-change-in-production",
    });

    app.decorate("authenticate", async function (request: any, reply: any) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.code(401).send({ error: "Unauthorized" });
        }
    });

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

    // Initialize blockchain service (safe to call multiple times)
    try {
        initBlockchain();
    } catch (e) {
        console.warn("⚠️ Blockchain init warning:", e);
    }

    return app;
}
