import type { V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Post pages" }];
};

export default function Index() {
  return <div>Index</div>;
}
