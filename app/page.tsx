import Image from "next/image";
import Link from "next/link";

import { CarFront, MonitorSmartphone, PenLine } from "lucide-react";

import Content from "~/components/content";
import { ModeToggle } from "~/components/mode-toggle";
import Section from "~/components/section";
import About from "~/components/sections/about.section";
import Education from "~/components/sections/education.section";
import Stack from "~/components/sections/my-stack.section";
import Projects from "~/components/sections/projects.section";
import Work from "~/components/sections/work.section";
import ShellPage from "~/components/shell-page";
import Title from "~/components/title";

export default function Home() {
  return (
    <ShellPage>
      <Hi />
      <About />
      <Mode />
      <Work />
      <Education />
      <Blog />
      <Projects />
      <Stack />
      <Uses />
      <Contact />
    </ShellPage>
  );
}

function Hi() {
  return (
    <Section>
      <Title text="Hi, I'm Ommi Putera 👋">
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
        />
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Software Engineer based in Jakarta, Indonesia. I love building things
          with{" "}
          <Link
            href="https://remix.run/"
            target="_blank"
            className="text-blue-700 dark:text-blue-500 font-medium hover:underline"
          >
            Remix.
          </Link>
        </p>
      </Content>
    </Section>
  );
}

function Mode() {
  return (
    <Section>
      <Title text="Prefer dark/light mode?">
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
        />
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Dark mode will reduce screen brightness for a more comfortable viewing
          experience.
        </p>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          <span>Turn on {<ModeToggle />} mode by clicking this button.</span>
        </p>
      </Content>
    </Section>
  );
}

function Blog() {
  return (
    <Section>
      <Title text="Blog" description="WIP">
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <PenLine className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          My blog is a work in progress. I&apos;m looking forward to sharing my
          thoughts and insights soon. 💪
        </p>
      </Content>
    </Section>
  );
}

function Uses() {
  return (
    <Section>
      <Title text="Uses">
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <CarFront className="w-5 h-5" />
        </div>
      </Title>
    </Section>
  );
}

function Contact() {
  return (
    <Section>
      <Title text="Contact" description="Get in Touch">
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
          <MonitorSmartphone className="w-5 h-5" />
        </div>
      </Title>
      <Content>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Want to chat? Just shoot me a dm with a direct question on twitter and
          I&apos;ll respond whenever I can. I will ignore all soliciting.
        </p>
      </Content>
    </Section>
  );
}
