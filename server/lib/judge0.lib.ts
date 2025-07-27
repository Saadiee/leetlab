import axios, { AxiosResponse } from "axios";
import { Judge0Result, Submission, TokenObject } from "../src/types";

export type SupportedLanguage = "PYTHON" | "JAVA" | "JAVASCRIPT";

export const getJudge0LanguageId = (
  language: SupportedLanguage,
): number | null => {
  const languageMap: Record<SupportedLanguage, number> = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return languageMap[language] ?? null;
};

export const submitBatch = async (
  submissions: Submission[],
): Promise<TokenObject[]> => {
  const { data }: AxiosResponse<TokenObject[]> = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch/?base64_encoded=false`,
    { submissions },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.SULU_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );
  return data;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const poolBatchResults = async (
  tokens: string[],
): Promise<Judge0Result[]> => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
      },
    );
    const results = data.submissions;
    const isAllDone: Boolean = results.every(
      (result: Judge0Result) =>
        result.status_id !== 1 && result.status_id !== 2,
    );
    if (isAllDone) return results;
    await sleep(1000);
  }
};
