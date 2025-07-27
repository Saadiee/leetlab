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
