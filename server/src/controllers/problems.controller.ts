import { Context } from "hono";
import { db } from "../../lib/db";
import { Submission, TestCase, User } from "../types";
import {
  getJudge0LanguageId,
  poolBatchResults,
  submitBatch,
  SupportedLanguage,
} from "../../lib/judge0.lib";

export const createProblem = async (c: Context) => {
  const body = await c.req.json();
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
      if (!languageId) {
        return c.json(
          { error: `Language --> ${language} is not supported` },
          400,
        );
      }
      const submissions: Submission[] = testcases.map(
        ({ input, output }: TestCase) => ({
          source_code: solutionCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        }),
      );
      const submissionResults = await submitBatch(submissions);
      const tokens = submissionResults.map((res) => res.token);

      const results = await poolBatchResults(tokens);
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status_id !== 3) {
          return c.json(
            { error: `Testcase ${i + 1} failed for language: ${language}` },
            400,
          );
        }
      }

      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolutions,
          userId: user.id,
        },
      });
      return c.json({ newProblem }, 201);
    }
  } catch (error) {
    console.error("Error creating problem:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
};

export const getAllProblems = async (c: Context) => {};

export const getProblemById = async (c: Context) => {};

export const updateProblemById = async (c: Context) => {};

export const deleteProblemById = async (c: Context) => {};

export const getAllProblemsSolvedByUser = async (c: Context) => {};
