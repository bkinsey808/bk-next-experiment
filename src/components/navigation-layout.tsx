import { ReactNode } from "react";

import { Header } from "@/features/dashboard/components/header";

export default function NavigationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
        {children}
      </main>
    </>
  );
}
