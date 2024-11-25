import { Cpu } from "lucide-react";

import Content from "~/components/content";
import Section from "~/components/section";

export default function Stack() {
  return (
    <Section>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Cpu className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title={`My ${new Date().getFullYear()} Tech Stack ✅`}>
        <div className="text-sm font-normal  leading-5">
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
