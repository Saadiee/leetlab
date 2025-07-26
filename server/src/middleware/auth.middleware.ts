import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { db } from "../../lib/db";
import { DecodedToken, User } from "../types";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const token = getCookie(c, "jwt");
    if (!token) {
      return c.json({ message: "Unauthorized - No token provided" }, 401);
    }
    let decodedToken;
    try {
      decodedToken = (await verify(
        token,
        process.env.JWT_SECRET!,
      )) as DecodedToken;
    } catch (error) {
      return c.json(
        {
          message: "Unauthorized / invalid token provided",
        },
        401,
      );
    }
    if (!decodedToken?.id) {
      return c.json({ error: "Invalid token payload" }, 401);
    }
    const user = await db.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        role: true,
        profile_picture_url: true,
        bio: true,
      },
    });
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    c.set("user", user);
    await next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return c.json({ message: "Internal server error in auth middleware" }, 500);
  }
};

export const checkAdmin = async (c: Context, next: Next) => {
  try {
    const user: User = c.get("user");
    if (!user || user.role !== "ADMIN") {
      return c.json({ message: "Access denied. Admin only" }, 403);
    }
    next();
  } catch (error) {
    console.log("Error checking admin role", error);
    return c.json({ message: "Error checking admin role" }, 500);
  }
};
