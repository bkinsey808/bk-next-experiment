import { redirect } from "next/navigation";

import LogoutButton from "./LogoutButton";
import SessionDump from "./SessionDump";
import Welcome from "./Welcome";
import { getCustomServerSession } from "@/features/auth/helpers/customSession";

export default async function Dashboard() {
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
