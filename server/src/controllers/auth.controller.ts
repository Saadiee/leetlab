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

const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days

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
        success: true,
        message: "user created successfully",
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        image_url: newUser.profile_picture_url,
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

export const login = async (c: Context) => {
  const { email, password } = await c.req.json();
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const isPasswordMatch = await Bun.password.verify(password, user.password);
    if (!isPasswordMatch) {
      return c.json({ error: "Invalid email or password" }, 401);
    }
    const token = await sign(
      { id: user.id, exp: expiry },
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
        success: true,
        message: "user loggedin successfully",
        id: user.id,
        username: user.username,
        role: user.role,
        image_url: user.profile_picture_url,
      },
      200,
    );
  } catch (error) {
    console.error("Sign-in Error:", error);
    // Handle Prisma known error (e.g., DB issues like P2025: Record not found)
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return c.json({ error: "User not found" }, 404);
      }
    }
    return c.json(
      { error: "Something went wrong during sign-in. Please try again." },
      500,
    );
  }
};

export const logout = async (c: Context) => {
  try {
    const cookieOpts: CookieOptions = {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development",
      path: "/",
    };
    deleteCookie(c, "jwt", cookieOpts);
    return c.json({ success: true, message: "Logout successful" }, 200);
  } catch (error) {
    console.error("Logout Error:", error);
    return c.json({ error: "Logout failed. Please try again later." }, 500);
  }
};

export const check = async (c: Context) => {
  const user = c.get("user");
  return c.json(
    { success: true, message: "User authentication successfull", user },
    200,
  );
};
