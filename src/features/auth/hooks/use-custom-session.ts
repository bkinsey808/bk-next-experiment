import { useSession } from "next-auth/react";

import { CustomSession } from "../helpers/custom-session";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn;

export const useCustomSession = useSession as ReplaceReturnType<
  typeof useSession,
  Omit<ReturnType<typeof useSession>, "data"> & { data: CustomSession }
>;
