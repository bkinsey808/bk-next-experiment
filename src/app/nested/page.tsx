import Link from "next/link";

import NavigationLayout from "@/components/navigation-layout";
import H1 from "@/components/ui/h1";

const NestedPage = () => {
  return (
    <NavigationLayout>
      <H1>Nested Page</H1>
      <div className="test">
        <h2>parent</h2>
        <div>
          <h3 className="[.test_&_div]:text-red-600">
            child<div>test</div>
          </h3>
          <div>
            <h4>grandchild</h4>
          </div>
        </div>
      </div>
      <br />
      <Link href="/dashboard">dashboard</Link>
      <br />
      <Link href="/pusher">pusher</Link>
    </NavigationLayout>
  );
};

export default NestedPage;
