import dotenv from "dotenv";
import path from "path";
import { buildApp } from "./app";

// Load env from monorepo root using absolute paths
const envPath = path.resolve(__dirname, "../../../.env");
const envLocalPath = path.resolve(__dirname, "../../../.env.local");

console.log("📁 Loading .env from:", envPath);
console.log("📁 Loading .env.local from:", envLocalPath);

dotenv.config({ path: envPath });
dotenv.config({ path: envLocalPath });

console.log("🔑 Wallet Key Present:", !!process.env.WALLET_PRIVATE_KEY);
console.log("Next step: Starting server...");

const start = async () => {
    try {
        const app = await buildApp();
        const port = parseInt(process.env.PORT || "3001", 10);
        await app.listen({ port, host: "0.0.0.0" });

        console.log("");
        console.log("╔══════════════════════════════════════════╗");
        console.log("║     🧬 VITALIS BACKEND v0.1.0           ║");
        console.log(`║     Port: ${port}                          ║`);
        console.log("║     Chain: Monad Testnet (10143)         ║");
        console.log("╚══════════════════════════════════════════╝");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
