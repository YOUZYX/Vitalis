import "fastify";

declare module "fastify" {
    interface FastifyInstance {
        authenticate: (request: any, reply: any) => Promise<void>;
    }

    interface FastifyRequest {
        user: {
            agentId: string;
            walletAddress: string;
            role: string;
        };
    }
}
