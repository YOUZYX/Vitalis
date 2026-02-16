import type { IncomingMessage, ServerResponse } from "http";

let appPromise: ReturnType<typeof import("../src/app").buildApp> | null = null;

async function getApp() {
    if (!appPromise) {
        const { buildApp } = await import("../src/app");
        appPromise = buildApp();
    }
    const app = await appPromise;
    await app.ready();
    return app;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const app = await getApp();

        // Strip /api prefix so Fastify route prefixes match
        if (req.url) {
            req.url = req.url.replace(/^\/api/, "") || "/";
        }

        app.server.emit("request", req, res);
    } catch (err: any) {
        console.error("Serverless handler error:", err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Internal server error", message: err.message }));
    }
}
