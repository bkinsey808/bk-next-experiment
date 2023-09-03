import { AuthOptions } from "next-auth";

import { AuthLevel } from "./auth-level";
import { getAuthLevelKey, getUsernameKey, redis } from "@/helpers/redis";

type Jwt = NonNullable<AuthOptions["callbacks"]>["jwt"];

export const jwt: Jwt = async ({
  token,
  user,
  account,
  trigger,
  session,
  profile,
}) => {
  const email = token?.email as string;

  if (!email) {
    return token;
  }

  const [username, authLevel = AuthLevel.Guest] = await redis.mget<
    [string, AuthLevel]
  >(getUsernameKey(email), getAuthLevelKey(email));

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
};
