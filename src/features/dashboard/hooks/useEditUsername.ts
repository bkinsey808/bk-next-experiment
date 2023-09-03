import { FormEvent, useCallback, useState } from "react";

import { saveUsername } from "../actions/saveUsername";
import { useCustomSession } from "@/features/auth/hooks/useCustomSession";

export const useEditUsername = () => {
  const { data: customSession, update: updateCustomSession } =
    useCustomSession();
  const sessionUsername = customSession?.user?.username;
  const [usernameError, setUsernameError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitting(true);
      const username = event.currentTarget.username.value;
      const result = await saveUsername(username);

      if (result?.error) {
        setUsernameError(result?.error);
      } else {
        // update the session
        await updateCustomSession({
          ...customSession,
          user: {
            ...customSession?.user,
            username,
          },
        });
      }

      setSubmitting(false);
    },
    [customSession, updateCustomSession]
  );

  return {
    onSubmit,
    sessionUsername,
    usernameError,
    submitting,
  };
};
