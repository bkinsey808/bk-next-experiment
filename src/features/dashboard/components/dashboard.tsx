import Link from "next/link";
import { redirect } from "next/navigation";

import { Header } from "./header";
import LogoutButton from "./logout-button";
import SessionDump from "./session-dump";
import Welcome from "./welcome";
import { getCustomServerSession } from "@/features/auth/helpers/custom-session";

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
    <>
      <Header />
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center">
        <div className="my-10 flex w-full flex-col justify-between">
          <Welcome />

          <LogoutButton />
        </div>

        <SessionDump />

        <br />
        <Link href="/nested">nested</Link>
        <br />
        <Link href="/pusher">pusher</Link>
      </main>
    </>
  );
}
