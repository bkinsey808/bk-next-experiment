"use client";

import { useEditUsername } from "../hooks/useEditUsername";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function EditUsername() {
  const { onSubmit, sessionUsername, usernameError, submitting } =
    useEditUsername();

  return (
    <form onSubmit={onSubmit}>
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
