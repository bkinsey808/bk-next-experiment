import { AuthOptions, Session, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import { NextAuthProvider } from "./nextAuthProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const enum AuthLevel {
  Admin = "admin",
  User = "user",
  Guest = "guest",
  Blocked = "blocked",
}

export type CustomSession = Session & {
  user: Session["user"] & {
    username?: string;
    authLevel?: AuthLevel;
    providers: [NextAuthProvider];
  };
};

export const getCustomServerSession = () =>
  getServerSession<AuthOptions, CustomSession>(authOptions);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn;

export const useCustomSession = useSession as ReplaceReturnType<
  typeof useSession,
  Omit<ReturnType<typeof useSession>, "data"> & { data: CustomSession }
>;
