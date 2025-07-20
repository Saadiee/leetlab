import { Context } from "hono";
import { db } from "../../lib/db";

export const register = async (c: Context) => {
  const { email, password } = await c.req.json();
};

export const login = async (c: Context) => {};

export const logout = async (c: Context) => {};

export const check = async (c: Context) => {
  return c.text("working");
  console.log(db);
};
