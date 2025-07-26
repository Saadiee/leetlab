import { Hono } from "hono";
import { check, login, logout, register } from "../controllers/auth.controller";
import type { JwtVariables } from "hono/jwt";
import { authMiddleware } from "../middleware/auth.middleware";
import { redisRateLimit } from "../middleware/redisRateLimit.middleware";
type Variables = JwtVariables;

const authRoutes = new Hono<{ Variables: Variables }>();

authRoutes.post("/register", redisRateLimit, register);
authRoutes.post("/login", redisRateLimit, login);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.get("/check", authMiddleware, check);

export default authRoutes;
