"use server";

import { redis } from "@/helpers/redis";
import { getCustomServerSession } from "@/helpers/session";

export const saveUsername = async (username: string) => {
  const session = await getCustomServerSession();
  const email = session?.user?.email;

  if (!email) {
    return false;
  }

  await redis.set(`${email}.username`, username);

  return true;
};
