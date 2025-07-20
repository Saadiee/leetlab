import { Hono } from "hono";
import { check, login, logout, register } from "../controllers/auth.controller";
import type { JwtVariables } from "hono/jwt";
type Variables = JwtVariables;

const authRoutes = new Hono<{ Variables: Variables }>();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/check", check);

export default authRoutes;
