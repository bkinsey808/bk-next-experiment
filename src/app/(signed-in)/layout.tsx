import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { getCustomServerSession } from "@/features/auth/helpers/custom-session";

export default async function SignedInLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getCustomServerSession();

  if (!session) {
    redirect("/");
  }

  const email = session.user?.email;

  if (!email) {
    redirect("/");
  }

  return <>{children}</>;
}
