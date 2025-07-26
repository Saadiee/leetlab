import { rateLimiter } from "../lib/rateLimiter";
import { MiddlewareHandler } from "hono";

export const redisRateLimit: MiddlewareHandler = async (c, next) => {
  const ip =
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
    c.req.raw.headers.get("x-real-ip") ||
    c.req.raw.headers.get("cf-connecting-ip") ||
    c.req.raw.headers.get("host") ||
    "anonymous";

  const { success } = await rateLimiter.limit(ip);

  if (!success) {
    return c.text("Too many requests — slow down!", 429);
  }
  await next();
};
