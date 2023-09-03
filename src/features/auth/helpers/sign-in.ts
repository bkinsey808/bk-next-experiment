import { AuthOptions } from "next-auth";

import { AuthLevel } from "./auth-level";
import { NextAuthProvider } from "./next-auth-provider";
import {
  getAuthLevelKey,
  getLastLoginKey,
  getLinkedProvidersKey,
  getProviderKey,
  redis,
} from "@/helpers/redis";

type SignIn = NonNullable<AuthOptions["callbacks"]>["signIn"];

export const signIn: SignIn = async (userDetail) => {
  if (Object.keys(userDetail).length === 0) {
    return false;
  }

  const email = userDetail?.user?.email;
  const provider = userDetail?.account?.provider as NextAuthProvider;
  const providerAccountId = userDetail?.account?.providerAccountId;
  const newLoginDate = new Date().toISOString();

  if (!email || !provider) {
    return false;
  }

  const [authLevel, linkedProviders] = await redis.mget<
    [AuthLevel, NextAuthProvider[] | undefined]
  >(getAuthLevelKey(email), getLinkedProvidersKey(email));

  if (linkedProviders && !linkedProviders?.includes(provider)) {
    return false;
  }

  if (authLevel === AuthLevel.Blocked) {
    return false;
  }

  await redis.mset({
    [getLastLoginKey(email)]: newLoginDate,
    [getProviderKey(email, provider)]: {
      providerAccountId,
      lastLogin: newLoginDate,
    },
  });

  return true;
};
