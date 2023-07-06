import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

import GoogleButton from "@/components/buttons/GoogleButton";

export default async function Home() {
  const session = (await getServerSession()) || {};

  if (Object.keys(session).length !== 0) {
    redirect("/protected");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-6">
        <GoogleButton />
      </div>
    </main>
  );
}
