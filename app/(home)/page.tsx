import Image from "next/image";
import Link from "next/link";

import { CarFront, PenLine } from "lucide-react";

import Br from "~/components/br";
import Content from "~/components/content";
import { ModeClickable, ModeEmoji, ModeToggle } from "~/components/mode-toggle";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import About from "./about.section";
import Contact from "./contact.section";
import Education from "./education.section";
import Stack from "./my-stack.section";
import Projects from "./projects.section";
import Work from "./work.section";

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
      <ThankYou />
    </ShellPage>
  );
}

function Hi() {
  return (
    <Section>
      <div>
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
        />
      </div>
      <Content title="Hi, I'm Ommi Putera 👋" description="Introduction">
        <p className="text-sm font-normal text-accent-foreground leading-5">
          Software Engineer based in Jakarta, 🇮🇩 Indonesia. I love building
          things with{" "}
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
    <ModeClickable>
      <Section>
        <div>
          <Image
            src="/images/profile.jpeg"
            width={40}
            height={40}
            alt=""
            className="object-cover overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
          />
        </div>
        <Content title="Prefer dark/light mode?" description="Ommi Putera">
          <p className="text-sm font-normal text-accent-foreground leading-5">
            Dark mode will reduce screen brightness for a more comfortable
            viewing experience.
          </p>
          <p className="text-sm font-normal text-accent-foreground leading-5">
            <span>
              Turn on <ModeToggle /> mode by clicking this button <ModeEmoji />{" "}
            </span>
          </p>
        </Content>
      </Section>
    </ModeClickable>
  );
}

function Blog() {
  return (
    <Section href="/blog">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <PenLine className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Blog" description="WIP">
        <p className="text-sm font-normal text-accent-foreground leading-5">
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
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CarFront className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Uses">
        <p className="text-sm text-accent-foreground leading-5">
          Work in progres
        </p>
      </Content>
    </Section>
  );
}

function ThankYou() {
  return (
    <Section>
      <Image
        src="/images/profile.jpeg"
        width={40}
        height={40}
        alt=""
        className="object-cover overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
      />
      <Content title="Thank you for stopping by! 👋" description="Ommi Putera">
        <p className="text-sm text-accent-foreground leading-5">
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
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image src="/images/thank-you.jpg" width={800} height={400} alt="" />
        </div>
      </Content>
    </Section>
  );
}
