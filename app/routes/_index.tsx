import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Ommi Putera" },
    { name: "description", content: "Welcome to ommiputera site" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1>Hello</h1>
    </div>
  );
}
