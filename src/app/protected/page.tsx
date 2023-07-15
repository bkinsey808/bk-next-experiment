import { AuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/buttons/LogoutButton";

type CustomSession = Session & {
  user: Session["user"] & {
    provider?: string;
    providerAccountId?: string;
  };
};

export default async function Protected() {
  const session = await getServerSession<AuthOptions, CustomSession>(
    authOptions
  );

  if (!session) {
    redirect("/");
  }

  const email = session.user?.email;

  if (!email) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center">
      <div className="my-10 flex w-full justify-between">
        <h1 className="text-2xl font-bold">Protected Page</h1>
        <LogoutButton />
      </div>
      <pre className="w-full whitespace-pre-wrap break-words rounded bg-gray-200 p-4">
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}
