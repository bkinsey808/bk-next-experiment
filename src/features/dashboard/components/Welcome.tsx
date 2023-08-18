"use client";

import { signIn } from "next-auth/react";

import { saveUsername } from "../actions/saveUsername";
import {
  nextAuthProviderList,
  nextAuthProviderMap,
} from "@/features/auth/helpers/nextAuthProvider";
import { useCustomSession } from "@/features/auth/hooks/useCustomSession";

export default function Welcome() {
  const { data: session, update } = useCustomSession();
  const email = session?.user?.email;
  const username = session?.user?.username;

  return (
    <>
      {/* {username ? (
        <p>Welcome {username}!</p>
      ) : ( */}
      <>
        <p>Welcome {username || email}!</p>
        <p>
          {!username
            ? "It appears you do not yet have a username. Please create one."
            : undefined}
        </p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const username = event.currentTarget.username.value;
            const success = await saveUsername(username);

            if (success) {
              // update the session
              await update({
                ...session,
                user: {
                  ...session?.user,
                  username,
                },
              });
            }
          }}
        >
          <input
            type="text"
            name="username"
            id="username"
            className="m-2 rounded border-2 border-gray-300 bg-transparent p-2"
            placeholder="Username"
            defaultValue={username}
          />
          <button
            type="submit"
            className="m-2 rounded border-2 border-gray-300 p-2"
          >
            {username ? "Change" : "Create"} Username
          </button>
        </form>
      </>
      <h2>Providers</h2>
      <ul>
        {nextAuthProviderList
          .filter(
            (provider) => session?.user?.providers?.includes(provider) === false
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
