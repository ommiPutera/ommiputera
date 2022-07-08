import { HeroSection } from "~/components/sections/hero";

export default function IndexRoute() {
  return (
    <div className="container">
      <HeroSection />
      <main>
        <div>Hello Index Route</div>;
      </main>
    </div>
  );
}
