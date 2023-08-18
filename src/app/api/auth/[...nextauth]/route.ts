import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";

import { jwt } from "@/features/auth/helpers/jwt";
import {
  nextAuthProviderList,
  nextAuthProviderMap,
} from "@/features/auth/helpers/nextAuthProvider";
import { signIn } from "@/features/auth/helpers/signIn";
import { getDashboardPath } from "@/helpers/path";

const providers = [
  ...nextAuthProviderList.map(
    (provider) => nextAuthProviderMap[provider].provider
  ),
];

export const getAuthOptions: (req?: NextApiRequest) => AuthOptions = (
  _req
) => ({
  providers,
  callbacks: {
    signIn,
    jwt,
    async redirect({ baseUrl }) {
      return `${baseUrl}${getDashboardPath()}`;
    },

    async session({ session, token }) {
      return { ...session, user: token };
    },
  },
  events: {
    async signOut({ session, token }) {
      console.log({ session, token });
    },
  },
});

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, getAuthOptions(req));

export { handler as GET, handler as POST };
