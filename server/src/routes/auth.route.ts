import { Hono } from "hono";
import { check, login, logout, register } from "../controllers/auth.controller";

const authRoutes = new Hono();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/check", check);

export default authRoutes;
