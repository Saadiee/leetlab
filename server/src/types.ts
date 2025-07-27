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

export type Submission = {
  source_code: string;
  language_id: number;
  stdin: string;
  expected_output: string;
};

export type TestCase = {
  input: string;
  output: string;
};

export type TokenObject = {
  token: string;
};

export type Judge0Result = {
  token: string;
  language_id: number;
  stdout: string | null;
  stderr: string | null;
  status_id: number;
};
