import { Hono } from "hono";
import { check, login, logout, register } from "../controllers/auth.controller";
import type { JwtVariables } from "hono/jwt";
import { authMiddleware } from "../middleware/auth.middleware";
type Variables = JwtVariables;

const authRoutes = new Hono<{ Variables: Variables }>();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.get("/check", authMiddleware, check);

export default authRoutes;
