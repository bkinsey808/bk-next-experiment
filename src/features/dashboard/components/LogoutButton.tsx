"use client";

import { signOut } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";

import { Button } from "@/components/ui/Button";

export default function LogoutButton({
  auth: _auth,
}: {
  auth?: ClientSafeProvider;
}) {
  return <Button onClick={() => signOut()}>Logout</Button>;
}
