import type { MetaFunction } from "@remix-run/node";

import HeroSection from "@/components/sections/hero-section";

export const meta: MetaFunction = () => {
  return [
    { title: "Ommi Putera" },
    { name: "description", content: "Welcome to ommiputera site" },
  ];
};

export default function Index() {
  return (
    <div className="p-4 font-sans">
      <HeroSection />
    </div>
  );
}
