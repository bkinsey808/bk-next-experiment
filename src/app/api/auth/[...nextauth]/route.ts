import NextAuth, { AuthOptions } from "next-auth";

import {
  nextAuthProviderList,
  nextAuthProviderMap,
} from "@/helpers/nextAuthProvider";
import { redis } from "@/helpers/redis";
import { AuthLevel } from "@/helpers/session";

const providers = [
  ...nextAuthProviderList.map(
    (provider) => nextAuthProviderMap[provider].provider
  ),
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

      const authLevel = await redis.get(`${email}.authLevel`);

      if (authLevel === AuthLevel.Blocked) {
        return false;
      }

      await redis.mset({
        [`${email}.lastLogin`]: newLoginDate,
        [`${email}.providers.${provider}`]: {
          providerAccountId,
          lastLogin: newLoginDate,
        },
      });

      return true;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/protected`;
    },

    async jwt({ token, user, account, trigger, session, profile }) {
      const email = token?.email as string;

      if (!email) {
        return token;
      }

      const [username, authLevel = AuthLevel.Guest] = await redis.mget<
        [string, AuthLevel]
      >(`${email}.username`, `${email}.authLevel`);

      switch (trigger) {
        case "update":
          return {
            ...token,
            ...session.user,
          };
        case "signIn": {
          const provider = account?.provider ?? "unknown";

          return {
            name: token.name,
            email: token.email,
            providers: [provider],
            signedInProvider: { [provider]: { account, profile, user } },
            username,
            authLevel: authLevel ?? AuthLevel.Guest,
          };
        }
      }

      return {
        ...token,
        ...user,
        ...account,
        username,
        authLevel: authLevel ?? AuthLevel.Guest,
      };
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
