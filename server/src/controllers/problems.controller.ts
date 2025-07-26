import { Context } from "hono";
import { db } from "../../lib/db";
import { Problem, User } from "../types";
import { getJudge0LanguageId, SupportedLanguage } from "../../lib/judge0.lib";

export const createProblem = async (c: Context) => {
  const body: Problem = await c.req.json();
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = body;
  const user: User = c.get("user");

  if (!user || user.role !== "ADMIN") {
    return c.json({ message: "You are not allowed to create a problem" }, 403);
  }

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language as SupportedLanguage);
    }
  } catch (error) {}
};

export const getAllProblems = async (c: Context) => {};

export const getProblemById = async (c: Context) => {};

export const updateProblemById = async (c: Context) => {};

export const deleteProblemById = async (c: Context) => {};

export const getAllProblemsSolvedByUser = async (c: Context) => {};
