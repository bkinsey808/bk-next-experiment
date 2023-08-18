"use server";

import { getCustomServerSession } from "@/features/auth/helpers/customSession";
import { getUsernameKey, redis } from "@/helpers/redis";

export const saveUsername = async (username: string) => {
  const session = await getCustomServerSession();
  const email = session?.user?.email;

  if (!email) {
    return false;
  }

  await redis.set(getUsernameKey(email), username);

  return true;
};
