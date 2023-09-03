"use client";

import { signIn } from "next-auth/react";

import {
  nextAuthProviderList,
  nextAuthProviderMap,
} from "@/features/auth/helpers/next-auth-provider";
import { useCustomSession } from "@/features/auth/hooks/use-custom-session";

export default function Providers() {
  const { data: customSession } = useCustomSession();

  return (
    <>
      <h2>Providers</h2>
      <ul>
        {nextAuthProviderList
          .filter(
            (provider) =>
              customSession?.user?.providers?.includes(provider) === false
          )
          .map((provider) => {
            const { ProviderIcon, name } = nextAuthProviderMap[provider];

            return (
              <li key={provider}>
                <button
                  onClick={() => signIn(provider)}
                  className="m-2 flex gap-1 rounded border-2 border-gray-300 p-2"
                >
                  Sign in with <ProviderIcon /> {name}
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
