import Link from "next/link";

import { CornerUpRight } from "lucide-react";

import AboutGalery from "~/components/about-galery";
import Br from "~/components/br";
import Content from "~/components/content";
import Section from "~/components/section";

export default function About() {
  return (
    <Section href="/about">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
        <CornerUpRight className="w-5 h-5" />
      </div>
      <Content title="About">
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of
          experience specializing in scalable frontend and backend development
          for fintech products.
        </p>
        <Br />
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          <span>Proven ability to lead high-impact projects</span>
          <br />
          <Link
            href="/about"
            className="font-medium text-blue-700 dark:text-blue-500 hover:underline"
          >
            Show more
          </Link>
        </p>
        <Br />
        <AboutGalery />
      </Content>
    </Section>
  );
}
