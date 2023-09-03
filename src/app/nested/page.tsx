import Link from "next/link";

const NestedPage = () => {
  return (
    <div>
      <h1>Nested Page</h1>
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
    </div>
  );
};

export default NestedPage;
