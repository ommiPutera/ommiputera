import { Cpu } from "lucide-react";

import Content from "~/components/content";
import Section from "~/components/section";

export default function Stack() {
  return (
    <Section>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
        <Cpu className="w-5 h-5" />
      </div>
      <Content title={`My ${new Date().getFullYear()} Tech Stack ✅`}>
        <div className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          <ul>
            <li>Front-End dev</li>
            <li>👉Tailwind CSS</li>
            <li> 👉Js/TypeScript/Reactjs</li>
          </ul>
          <br />
          <ul>
            <li>Back-End dev</li>
            <li>👉Tailwind CSS</li>
          </ul>
        </div>
      </Content>
    </Section>
  );
}
