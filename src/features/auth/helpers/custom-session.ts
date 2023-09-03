import { AuthOptions, Session, getServerSession } from "next-auth";

import { AuthLevel } from "./auth-level";
import { NextAuthProvider } from "./next-auth-provider";
import { getAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export type CustomSession = Session & {
  user: Session["user"] & {
    username?: string;
    authLevel?: AuthLevel;
    providers: [NextAuthProvider];
  };
};

export const getCustomServerSession = () =>
  getServerSession<AuthOptions, CustomSession>(getAuthOptions());
