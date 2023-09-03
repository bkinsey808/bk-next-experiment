"use client";

import { useCustomSession } from "@/features/auth/hooks/useCustomSession";

export default function WelcomeHeader() {
  const { data: customSession } = useCustomSession();
  const email = customSession?.user?.email;
  const username = customSession?.user?.username;

  return (
    <>
      <p>Welcome {username || email}!</p>
      <p>
        {!username
          ? "It appears you do not yet have a username. Please create one."
          : undefined}
      </p>
    </>
  );
}
