import NextAuth, { AuthOptions, Session } from "next-auth";

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
      // console.log(userDetail);
      if (Object.keys(userDetail).length === 0) {
        return false;
      }
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
