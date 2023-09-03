"use server";

import { getCustomServerSession } from "@/features/auth/helpers/customSession";
import { hasObscenity } from "@/helpers/obscenity";
import { getUsernameKey, getUsernameToEmailKey, redis } from "@/helpers/redis";

export const saveUsername = async (username: string) => {
  const session = await getCustomServerSession();
  const email = session?.user?.email;
  const oldUsername = session?.user?.username;

  if (!email) {
    throw new Error("No email found in session");
  }

  if (hasObscenity(username)) {
    throw new Error("Username is not available");
  }

  const usernameToEmail = await redis.get(getUsernameToEmailKey(username));

  if (usernameToEmail && usernameToEmail !== email) {
    throw new Error("Username already taken");
  }

  if (usernameToEmail && usernameToEmail === email) {
    throw new Error("Same username");
  }

  await redis.set(getUsernameKey(email), username);

  if (oldUsername) {
    await redis.del(getUsernameToEmailKey(oldUsername));
  }

  await redis.set(getUsernameToEmailKey(username), email);

  return true;
};
