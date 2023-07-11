"use client";

import { signIn } from "next-auth/react";

import {
  NextAuthProvider,
  nextAuthProviderMap,
} from "@/helpers/nextAuthProvider";

interface SignInButtonProps {
  nextAuthProvider: NextAuthProvider;
}

export default function SignInButton({ nextAuthProvider }: SignInButtonProps) {
  const providerData = nextAuthProviderMap[nextAuthProvider];
  const { ProviderIcon, name } = providerData;

  return (
    <button
      className="
        border 
        border-slate-300 
        rounded 
        px-5 
        py-4 
        flex
        items-center
        "
      onClick={() => signIn(nextAuthProvider)}
    >
      <ProviderIcon />
      <div className="px-2"></div>
      <span>Sign In with {name}</span>
    </button>
  );
}
