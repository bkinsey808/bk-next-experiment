"use client";

import { useSession } from "next-auth/react";

export default function SessionDump() {
  const { data: session } = useSession();

  return (
    <pre className="w-full whitespace-pre-wrap break-words rounded bg-gray-200 p-4">
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}
