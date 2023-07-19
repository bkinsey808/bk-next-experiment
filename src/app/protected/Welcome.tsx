"use client";

import { saveUsername } from "./saveUsername";
import { useCustomSession } from "@/helpers/session";

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
        <p>It appears you do not yet have a username. Please create one.</p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const username = event.currentTarget.username.value;
            console.log({ username });
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
            Create Username
          </button>
        </form>
      </>
      {/* )} */}
    </>
  );
}
