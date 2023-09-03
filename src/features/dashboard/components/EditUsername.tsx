"use client";

import { FormEvent, useCallback, useState } from "react";

import { saveUsername } from "../actions/saveUsername";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCustomSession } from "@/features/auth/hooks/useCustomSession";

export default function EditUsername() {
  const { data: customSession, update: updateCustomSession } =
    useCustomSession();
  const sessionUsername = customSession?.user?.username;
  const [usernameError, setUsernameError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      console.log("submit");
      event.preventDefault();
      setSubmitting(true);
      const username = event.currentTarget.username.value;

      try {
        const success = await saveUsername(username);

        if (success) {
          // update the session
          await updateCustomSession({
            ...customSession,
            user: {
              ...customSession?.user,
              username,
            },
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setUsernameError(error.message);
        }
      }
      setSubmitting(false);
    },
    [customSession, updateCustomSession]
  );

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <Input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        required={true}
        defaultValue={sessionUsername}
        error={usernameError}
      />
      <Button type="submit" disabled={submitting}>
        {sessionUsername ? "Change" : "Create"} Username
      </Button>
    </form>
  );
}
