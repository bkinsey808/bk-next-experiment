"use server";

import { getCustomServerSession } from "@/features/auth/helpers/custom-session";
import { hasObscenity } from "@/helpers/obscenity";
import { getUsernameKey, getUsernameToEmailKey, redis } from "@/helpers/redis";

export const saveUsername = async (username: string) => {
  const session = await getCustomServerSession();
  const email = session?.user?.email;
  const oldUsername = session?.user?.username;

  if (!email) {
    return { error: "No email found in session" };
  }

  if (hasObscenity(username)) {
    return { error: "Username is not available" };
  }

  const usernameToEmail = await redis.get(getUsernameToEmailKey(username));

  if (usernameToEmail && usernameToEmail !== email) {
    return { error: "Username is not available" };
  }

  if (usernameToEmail && usernameToEmail === email) {
    return { error: "Same username" };
  }

  await redis.set(getUsernameKey(email), username);

  if (oldUsername) {
    await redis.del(getUsernameToEmailKey(oldUsername));
  }

  await redis.set(getUsernameToEmailKey(username), email);
};
