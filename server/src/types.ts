import { $Enums } from "./generated/prisma";

export type DecodedToken = {
  id: string;
};

export type User = {
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  profile_picture_url: string | null;
  bio: string | null;
  role: $Enums.UserRole;
} | null;

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export type Problem = {
  title: string;
  description: string;
  difficulty: $Enums.Difficulty; // Or simply 'easy' | 'medium' | 'hard' if not using Prisma enum
  tags: string[];
  examples: Json;
  constraints: string;
  testcases: Json;
  codeSnippets: Json;
  referenceSolutions: string;
  hints?: string;
  editorial?: string;
};
