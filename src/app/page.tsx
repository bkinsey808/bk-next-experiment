import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignInButton from "@/components/buttons/SignInButton";
import { nextAuthProviderList } from "@/helpers/nextAuthProvider";

export default async function Home() {
  const session = (await getServerSession()) || {};

  if (Object.keys(session).length !== 0) {
    redirect("/protected");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-6">
        {nextAuthProviderList.map((nextAuthProvider) => (
          <SignInButton
            key={nextAuthProvider}
            nextAuthProvider={nextAuthProvider}
          />
        ))}
      </div>
    </main>
  );
}
