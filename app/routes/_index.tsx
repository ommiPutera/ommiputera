import type { V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ommi Putera - Personal Website" }];
};

export default function Index() {
  return (
    <h1 className="text-3xl font-bold text-red-500 underline">Hello world!</h1>
  );
}
