import { Hono } from "hono";
import authRoutes from "./routes/auth.route";
import problemRoutes from "./routes/problems.route";

const app = new Hono();
const port = Number(process.env.PORT) || 3000;

app.get("/", (c) => {
  return c.text("Welcome to Leet Lab 👩‍💻");
});

app.route("/api/v1/auth", authRoutes);
app.route("/api/v1/problems", problemRoutes);

export default {
  port: port,
  fetch: app.fetch,
};
