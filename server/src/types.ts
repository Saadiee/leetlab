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
