/**
 * LLMManager — Token Bucket Rate Limiter (v3.0 — Strict Quota Safety)
 *
 * Architecture:
 *   All Agents → Single LLMManager → Token Bucket → Gemini API
 *
 * Token Bucket Logic:
 * - Capacity: 10 tokens (burst size)
 * - Refill: 1 token every 6000ms (~10 RPM sustained)
 * - Consumption: 1 token per request
 *
 * Safety Features:
 * - Global Pause: On 429/503, pause EVERYTHING for 60s.
 * - Queue: FIFO with depth priority.
 * - Serialization: Requests execute one by one to prevent burst overlaps.
 *
 * Environment:
 *   GEMINI_MODEL  (default gemini-2.5-flash)
 *   safety_threshold_ms (default 60000 on error)
 */

import { GoogleGenAI } from "@google/genai";

// ─── Types ───────────────────────────────────────────────────────────

export interface LLMRequest {
    agentId: string;
    model: string;
    contents: string;
    config: {
        temperature: number;
        responseMimeType: string;
        systemInstruction: string;
    };
}

export interface LLMResponse {
    text: string;
    success: boolean;
    error?: string;
}

interface QueuedRequest {
    request: LLMRequest;
    resolve: (value: LLMResponse) => void;
    id: number;
    depth: number;
}

// ─── LLM Manager (Token Bucket Singleton) ───────────────────────────

// ─── LLM Manager (Token Bucket Singleton) ───────────────────────────

export class LLMManager {
    // API Key Pool
    private apiKeys: string[] = [];
    private currentKeyIndex: number = 0;
    private clients: GoogleGenAI[] = [];

    private model: string;

    // Token Bucket State
    private tokens: number = 10;
    private maxTokens: number = 10;
    private lastRefill: number = Date.now();
    private refillRateMs: number = 6000; // 1 token every 6s

    // Queue State
    private queue: QueuedRequest[] = [];
    private processing: boolean = false;
    private requestCounter: number = 0;
    private pausedUntil: number = 0;

    constructor() {
        this.model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        this.loadApiKeys();
        console.log(`🔒 [LLMManager] Token Bucket | Capacity: ${this.maxTokens} | Refill: ${this.refillRateMs}ms (~10 RPM)`);
    }

    private loadApiKeys() {
        // Load keys from GEMINI_API_KEY_1 to GEMINI_API_KEY_5
        // Also support OPENCLAW_API_KEY as legacy fallback if no indexed keys found
        const potentialKeys = [
            process.env.GEMINI_API_KEY_1,
            process.env.GEMINI_API_KEY_2,
            process.env.GEMINI_API_KEY_3,
            process.env.GEMINI_API_KEY_4,
            process.env.GEMINI_API_KEY_5,
            process.env.OPENCLAW_API_KEY
        ].filter(k => k && k.length > 0) as string[];

        // Deduplicate
        this.apiKeys = [...new Set(potentialKeys)];

        if (this.apiKeys.length === 0) {
            console.error("❌ [LLMManager] NO API KEYS FOUND! Agents will fail.");
        } else {
            console.log(`🔑 [LLMManager] Loaded ${this.apiKeys.length} API keys into rotation pool.`);
            // Initialize clients for each key
            this.clients = this.apiKeys.map(key => new GoogleGenAI({ apiKey: key }));
        }
    }

    private get currentClient(): GoogleGenAI {
        if (this.clients.length === 0) {
            throw new Error("No API keys available");
        }
        return this.clients[this.currentKeyIndex];
    }

    private rotateKey() {
        if (this.apiKeys.length <= 1) return; // No point rotating if only 1 key

        const oldIndex = this.currentKeyIndex;
        this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
        console.log(`⚠️  [LLMManager] Rate Limit Hit on Key #${oldIndex + 1}. Rotating to Key #${this.currentKeyIndex + 1}...`);
    }

    // Removed per-agent registration since we now use a shared pool
    registerAgent(agentId: string, apiKey: string): void {
        // Legacy support: if an agent provides a specific key and we have none, use it
        if (this.apiKeys.length === 0 && apiKey) {
            console.log(`🔑 [LLMManager] adopting key from agent ${agentId}`);
            this.apiKeys.push(apiKey);
            this.clients.push(new GoogleGenAI({ apiKey }));
        }
    }

    get defaultModel(): string {
        return this.model;
    }

    /**
     * Submit a request. It will wait in queue until:
     * 1. Tokens > 0
     * 2. Global pause expired
     * 3. Previous requests finished (serialization)
     */
    async generate(request: LLMRequest, depth: number = 0): Promise<LLMResponse> {
        return new Promise<LLMResponse>((resolve) => {
            const id = ++this.requestCounter;
            console.log(`📥 [LLM] #${id} queued (agent: ${request.agentId}, depth: ${depth})`);

            this.queue.push({ request, resolve, id, depth });

            // Priority: Lower depth = Higher priority
            this.queue.sort((a, b) => a.depth - b.depth);

            this.processQueue();
        });
    }

    // ─── Token Bucket Logic ──────────────────────────────────────────

    private refillTokens() {
        const now = Date.now();
        const elapsed = now - this.lastRefill;

        if (elapsed > this.refillRateMs) {
            const newTokens = Math.floor(elapsed / this.refillRateMs);
            if (newTokens > 0) {
                this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
                this.lastRefill = now;
            }
        }
    }

    private async waitForToken(): Promise<void> {
        while (true) {
            // Check global pause
            const remainingPause = this.pausedUntil - Date.now();
            if (remainingPause > 0) {
                console.log(`🛑 [LLM] Global Pause active (${Math.ceil(remainingPause / 1000)}s remaining)`);
                await this.sleep(Math.min(remainingPause, 5000));
                continue;
            }

            this.refillTokens();

            if (this.tokens >= 1) {
                this.tokens -= 1;
                return;
            }

            // Wait for next refill
            await this.sleep(1000);
        }
    }

    // ─── Queue Processor ─────────────────────────────────────────────

    private async processQueue() {
        if (this.processing) return;
        this.processing = true;

        while (this.queue.length > 0) {
            await this.waitForToken();

            const item = this.queue.shift();
            if (!item) break;

            await this.executeRequest(item);
        }

        this.processing = false;
    }

    private async executeRequest(item: QueuedRequest) {
        const { request, resolve, id } = item;

        const MAX_RETRIES = 3;
        let attempt = 0;
        let success = false;

        console.log(`🚀 [LLM] #${id} Executing... (Tokens left: ${this.tokens})`);

        while (attempt < MAX_RETRIES && !success) {
            attempt++;
            try {
                const client = this.currentClient;
                const response = await client.models.generateContent({
                    model: request.model || this.model,
                    contents: request.contents,
                    config: {
                        temperature: request.config.temperature,
                        responseMimeType: request.config.responseMimeType,
                        systemInstruction: request.config.systemInstruction,
                    },
                });

                const text = response.text ?? "{}";
                console.log(`✅ [LLM] #${id} Success`);
                resolve({ text, success: true });
                success = true;

            } catch (error: any) {
                const isRateLimit = error?.status === 429 || error?.status === 503 ||
                    error?.message?.includes("429") ||
                    error?.message?.includes("RESOURCE_EXHAUSTED");

                if (isRateLimit) {
                    // Try rotating key
                    if (this.apiKeys.length > 1) {
                        this.rotateKey();
                        // Retry immediately with new key
                        console.log(`🔄 [LLM] #${id} Retrying with Key #${this.currentKeyIndex + 1} (Attempt ${attempt}/${MAX_RETRIES})`);
                        continue;
                    } else {
                        // Only 1 key and it failed -> Global Pause
                        console.error(`❌ [LLM] #${id} HIT RATE LIMIT (429)! Single key exhausted. PAUSING 60s.`);
                        this.pausedUntil = Date.now() + 60_000;
                        resolve({ text: "{}", success: false, error: "429: Rate Limit Exceeded" });
                        return;
                    }
                }

                // If we ran out of retries or keys
                if (attempt >= MAX_RETRIES) {
                    console.error(`❌ [LLM] #${id} Failed after ${MAX_RETRIES} attempts: ${error.message}`);
                    resolve({ text: "{}", success: false, error: error.message });
                    return;
                }

                // Non-rate-limit error? simple retry?
                console.warn(`⚠️ [LLM] #${id} Error: ${error.message}. Retrying...`);
            }
        }
    }

    private sleep(ms: number) {
        return new Promise(r => setTimeout(r, ms));
    }

    getStats() {
        return {
            queueLength: this.queue.length,
            tokens: this.tokens,
            paused: Date.now() < this.pausedUntil,
            activeKeys: this.apiKeys.length,
            currentKey: this.currentKeyIndex + 1
        };
    }
}

// ─── Singleton Export ────────────────────────────────────────────────

let _instance: LLMManager | null = null;

export function getSharedLLMManager(): LLMManager {
    if (!_instance) {
        _instance = new LLMManager();
    }
    return _instance;
}
