import NextAuth, { AuthOptions } from "next-auth";

import {
  nextAuthProviderList,
  nextAuthProviderMap,
} from "@/helpers/nextAuthProvider";
import { redis } from "@/helpers/redis";

interface UserData {
  lastLogin: string;
  providers: {
    [provider: string]: {
      providerAccountId?: string;
      lastLogin?: string;
    };
  };
}

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

      await redis.set(`${email}.lastLogin`, newLoginDate);
      await redis.set(`${email}.providers.${provider}`, {
        providerAccountId,
        lastLogin: newLoginDate,
      });

      return true;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/protected`;
    },

    async jwt({ token, user, account }) {
      console.log({ token, user, account });
      const email = token?.email as string;
      console.log({ email });
      if (!email) {
        return token;
      }

      const userData = await redis.get<UserData>(email);
      console.log(JSON.stringify(userData, null, 2));

      return {
        ...token,
        ...user,
        ...account,
      };
    },

    async session({ session, token }) {
      return { ...session, user: token };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
