/**
 * Upstash Memory Adapter
 *
 * Short-term memory: Upstash Redis (key-value, TTL-based)
 * Long-term memory: Upstash Vector (semantic search)
 *
 * Each agent gets a namespaced key prefix in Redis.
 */

import { Redis } from "@upstash/redis";

// ─── Types ───────────────────────────────────────────────────────────

export interface MemoryEntry {
    key: string;
    value: unknown;
    ttlSeconds?: number;
}

// ─── Memory Adapter ──────────────────────────────────────────────────

export class MemoryAdapter {
    private redis: Redis;
    private prefix: string;

    constructor(agentId: string) {
        const url = process.env.UPSTASH_REDIS_REST_URL;
        const token = process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!url || !token) {
            console.warn(`⚠️  Upstash Redis not configured. Memory will be in-memory only.`);
            // Fallback: create a dummy redis-like object
            this.redis = null as any;
        } else {
            this.redis = new Redis({ url, token });
        }

        this.prefix = `vitalis:${agentId}:`;
    }

    /**
     * Store a value in short-term memory with optional TTL.
     */
    async set(key: string, value: unknown, ttlSeconds: number = 3600): Promise<void> {
        if (!this.redis) return;
        await this.redis.setex(`${this.prefix}${key}`, ttlSeconds, JSON.stringify(value));
    }

    /**
     * Retrieve a value from short-term memory.
     */
    async get<T = unknown>(key: string): Promise<T | null> {
        if (!this.redis) return null;
        const data = await this.redis.get(`${this.prefix}${key}`);
        if (!data) return null;
        return typeof data === "string" ? JSON.parse(data) : data as T;
    }

    /**
     * Store the latest reasoning cycle results.
     */
    async storeLastCycle(data: {
        reasoning: string;
        action: string;
        result: unknown;
        timestamp: string;
    }): Promise<void> {
        await this.set("last_cycle", data, 7200); // 2 hour TTL

        // Also append to cycle history (keep last 20)
        const history = await this.getCycleHistory();
        history.push(data);
        if (history.length > 20) history.shift();
        await this.set("cycle_history", history, 86400); // 24 hour TTL
    }

    /**
     * Get cycle history for context building.
     */
    async getCycleHistory(): Promise<any[]> {
        return (await this.get<any[]>("cycle_history")) || [];
    }

    /**
     * Store ecosystem health snapshot (Guardian-specific).
     */
    async storeHealthSnapshot(data: unknown): Promise<void> {
        await this.set("health_snapshot", data, 1800); // 30 min TTL
    }

    /**
     * Get last health snapshot.
     */
    async getHealthSnapshot(): Promise<any> {
        return this.get("health_snapshot");
    }

    /**
     * Push a message onto a Redis queue (Upstash HTTP-compatible).
     * Uses RPUSH — new items go to the end of the list.
     */
    async pushToQueue(queueName: string, data: unknown): Promise<void> {
        if (!this.redis) return;
        await this.redis.rpush(queueName, JSON.stringify(data));
    }

    /**
     * Pop a message from a Redis queue (Upstash HTTP-compatible).
     * Uses LPOP — oldest item first (FIFO).
     * Returns null if queue is empty.
     */
    async popFromQueue(queueName: string): Promise<any | null> {
        if (!this.redis) return null;
        const raw = await this.redis.lpop(queueName);
        if (!raw) return null;
        try {
            return typeof raw === "string" ? JSON.parse(raw) : raw;
        } catch {
            return raw;
        }
    }

    /**
     * Check queue length without consuming messages.
     */
    async queueLength(queueName: string): Promise<number> {
        if (!this.redis) return 0;
        return this.redis.llen(queueName);
    }
}
