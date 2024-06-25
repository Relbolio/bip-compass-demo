import { Role } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  name: string;
  avatarUrl?: string;
  email: string;
  id: string;
  // emailVerified?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
