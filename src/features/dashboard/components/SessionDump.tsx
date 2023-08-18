"use client";

import { useCustomSession } from "@/features/auth/hooks/useCustomSession";

export default function SessionDump() {
  const { data: session } = useCustomSession();

  return (
    <pre className="w-full whitespace-pre-wrap break-words rounded bg-gray-200 p-4">
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}
