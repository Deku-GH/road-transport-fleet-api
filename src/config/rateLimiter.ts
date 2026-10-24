
import { createClient } from "redis";
import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";

const redisClient = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

export const redisReady = redisClient.connect();

const createRedisLimiter = (windowMs: number, limit: number) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    store: new RedisStore({
      sendCommand: (...args: string[]) =>
        redisClient.sendCommand(args),
    }),
  });

export const authLimiter = createRedisLimiter(
  15 * 60 * 1000,
  10,
);

export const apiLimiter = createRedisLimiter(
  10 *60* 1000,
  20,
);

export const analyticsLimiter = createRedisLimiter(
  60 * 1000,
  20,
);
