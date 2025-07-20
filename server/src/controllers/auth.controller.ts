// External libraries
import { Context } from "hono";
import { sign } from "hono/jwt";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie";
import { CookieOptions } from "hono/utils/cookie";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// Internal/shared libraries
import { db } from "../../lib/db";
// Generated files / types / enums
import { UserRole } from "../generated/prisma/index.js";

export const register = async (c: Context) => {
  const { username, email, password } = await c.req.json();
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return c.json({ error: "User already exists" }, 409);
    }
    const hashedPassword = await Bun.password.hash(password);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: UserRole.USER,
      },
    });
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
    const token = await sign(
      { id: newUser.id, exp: expiry },
      process.env.JWT_SECRET!,
    );
    const cookieOpts: CookieOptions = {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 604800,
    };
    setCookie(c, "jwt", token, cookieOpts);
    return c.json(
      {
        message: "user created successfully",
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
      201,
    );
  } catch (error) {
    console.error("Registration Error:", error);

    // Handle known Prisma error (like unique constraint)
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return c.json(
          { error: "User already exists with this email or username" },
          409,
        );
      }
    }

    // Generic server error
    return c.json({ error: "Something went wrong. Please try again." }, 500);
  }
};

export const login = async (c: Context) => {};

export const logout = async (c: Context) => {};

export const check = async (c: Context) => {
  return c.text("Server running 🔥");
  console.log(db);
};
