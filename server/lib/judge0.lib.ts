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
