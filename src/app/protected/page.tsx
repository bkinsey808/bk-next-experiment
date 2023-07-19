import { redirect } from "next/navigation";

import Welcome from "./Welcome";
import SessionDump from "@/components/SessionDump";
import LogoutButton from "@/components/buttons/LogoutButton";
import { getCustomServerSession } from "@/helpers/session";

export default async function Protected() {
  const session = await getCustomServerSession();

  if (!session) {
    redirect("/");
  }

  const email = session.user?.email;

  if (!email) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center">
      <div className="my-10 flex w-full flex-col justify-between">
        <Welcome />

        <LogoutButton />
      </div>

      <SessionDump />
    </main>
  );
}
