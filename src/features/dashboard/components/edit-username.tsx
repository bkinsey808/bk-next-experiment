"use client";

import { useEditUsername } from "../hooks/use-edit-username";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
