import { CornerUpRight } from "lucide-react";

import Link from "next/link";

import AboutGalery from "~/components/about-galery";
import Br from "~/components/br";
import Content from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

export default function About() {
  return (
    <ShellPage title="About" withHome withBack>
      <div>
        <Me />
        <Section2 />
      </div>
    </ShellPage>
  );
}

function Me() {
  return (
    <Section withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="About">
        <p className="text-sm font-normal  leading-5">
          Highly motivated and results-driven Software Engineer with 3+ years of
          experience specializing in scalable frontend and backend development
          for fintech products.
        </p>
        <Br />
        <p className="text-sm font-normal  leading-5">
          Proven ability to lead high-impact projects, build seamless user
          experiences, and contribute to a collaborative team environment.
        </p>
        <Br />
        <p className="text-sm font-normal  leading-5">
          Expertise in React, Next.js, Remix, Node.js, and Nest.js, with a
          strong focus on stability, performance, and security.
        </p>
        <Br />
        <p className="text-sm font-normal  leading-5">
          I enjoy taking on new challenges and continuously improving my skills.
          Feel free to browse through my{" "}
          <Link
            href="/projects"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            projects
          </Link>{" "}
          to see examples of my work. If you&apos;d like to collaborate or just
          say hello, don&apos;t hesitate to reach out!
        </p>
        <Br />
        <p className="text-sm  leading-5">
          <span>You can follow me on</span>{" "}
          <Link
            href=""
            target="_blank"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            Twitter,{" "}
          </Link>
          <Link
            href=""
            target="_blank"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            LinkedIn,{" "}
          </Link>
          <Link
            href=""
            target="_blank"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            Github,{" "}
          </Link>
          <Link
            href=""
            target="_blank"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            Instagram.
          </Link>
        </p>
        <Br />
        <AboutGalery />
      </Content>
    </Section>
  );
}

function Section2() {
  return (
    <Section className="pt-0 md:pt-0">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Here are some of the values I live by.">
        <p className="text-sm  leading-5">WIP</p>
      </Content>
    </Section>
  );
}
