"use client";

import { signIn } from "next-auth/react";

import {
  NextAuthProvider,
  nextAuthProviderMap,
} from "@/features/auth/helpers/next-auth-provider";

interface SignInButtonProps {
  nextAuthProvider: NextAuthProvider;
}

export default function SignInButton({ nextAuthProvider }: SignInButtonProps) {
  const providerData = nextAuthProviderMap[nextAuthProvider];
  const { ProviderIcon, name } = providerData;

  return (
    <button
      className="
        flex 
        items-center 
        rounded 
        border 
        border-slate-300 
        px-5
        py-4
        "
      onClick={() => signIn(nextAuthProvider)}
    >
      <ProviderIcon />
      <div className="px-2"></div>
      <span>Sign In with {name}</span>
    </button>
  );
}
