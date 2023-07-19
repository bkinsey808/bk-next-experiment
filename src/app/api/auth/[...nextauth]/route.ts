import NextAuth, { AuthOptions } from "next-auth";
import { OAuthConfig } from "next-auth/providers";

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

const providers = [
  ...nextAuthProviderList.map(
    (provider) => nextAuthProviderMap[provider].provider
  ),
  {
    id: "update_user",
    name: "test",
    type: "oauth",

    // credentials: {},
    // authorize(credentials: { user: string }) {
    //   return { user: JSON.parse(credentials.user) };
    // },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as OAuthConfig<any>,
];

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

    async jwt({ token, user, account, trigger, session }) {
      const email = token?.email as string;

      if (!email) {
        return token;
      }

      const username = await redis.get<UserData>(`${email}.username`);
      console.log({ username });

      // await redis.del(`${email}.username`);

      if (trigger === "update") {
        console.log("update case", { session });
        return {
          ...token,
          ...session.user,
        };
      }

      return {
        ...token,
        ...user,
        ...account,
        username,
      };
    },

    async session({ session, token }) {
      return { ...session, user: token };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
