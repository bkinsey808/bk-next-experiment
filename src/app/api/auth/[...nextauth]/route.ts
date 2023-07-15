import { kv } from "@vercel/kv";
import NextAuth, { AuthOptions } from "next-auth";

import {
  nextAuthProviderList,
  nextAuthProviderMap,
} from "@/helpers/nextAuthProvider";

const providers = nextAuthProviderList.map(
  (provider) => nextAuthProviderMap[provider].provider
);

export const authOptions: AuthOptions = {
  providers,
  callbacks: {
    async signIn(userDetail) {
      if (Object.keys(userDetail).length === 0) {
        return false;
      }

      const email = userDetail?.user?.email;
      const provider = userDetail?.account?.provider;
      const providerAccountId = userDetail?.account?.providerAccountId;
      const newLoginDate = new Date().toISOString();

      if (!email || !provider) {
        return false;
      }

      await kv.set(`${email}.lastLogin`, newLoginDate);
      await kv.set(`${email}.providers.${provider}`, {
        providerAccountId,
        lastLogin: newLoginDate,
      });

      return true;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/protected`;
    },

    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account };
    },

    async session({ session, token }) {
      return { ...session, user: token };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
