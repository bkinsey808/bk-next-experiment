import NextAuth from "next-auth";

import {
  nextAuthProviderList,
  nextAuthProviderMap,
} from "@/helpers/nextAuthProvider";

const providers = nextAuthProviderList.map(
  (provider) => nextAuthProviderMap[provider].provider
);

const handler = NextAuth({
  providers,
  callbacks: {
    async signIn(userDetail) {
      console.log(userDetail);
      if (Object.keys(userDetail).length === 0) {
        return false;
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/protected`;
    },
  },
});

export { handler as GET, handler as POST };
