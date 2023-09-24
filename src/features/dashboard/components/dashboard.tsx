import Link from "next/link";

import Experimental from "./experimental";
import LogoutButton from "./logout-button";
import SessionDump from "./session-dump";
import Welcome from "./welcome";
import NavigationLayout from "@/components/navigation-layout";

export default async function Dashboard() {
  return (
    <NavigationLayout>
      <div className="my-10 flex w-full flex-col justify-between">
        <Welcome />

        <LogoutButton />
      </div>

      <SessionDump />

      <br />
      <Link href="/nested">nested</Link>
      <br />
      <Link href="/pusher">pusher</Link>

      <Experimental />
    </NavigationLayout>
  );
}
