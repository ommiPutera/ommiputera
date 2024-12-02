import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CornerUpRight } from "lucide-react";

import AboutGalery from "~/components/about-galery";
import Br from "~/components/br";
import Content from "~/components/content";
import { ModeClickable, ModeEmoji, ModeToggle } from "~/components/mode-toggle";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import Blog from "./blog.section";
import Contact from "./contact.section";
import Education from "./education.section";
import Projects from "./projects.section";
import Work from "./work.section";

export const metadata: Metadata = {
  title: "Ommi Putera",
  description: "Ommi Personal Website",
};

export default async function Home() {
  return (
    <ShellPage>
      <Hi />
      <About />
      <Mode />
      <Work />
      <Education />
      <Blog />
      <Projects />
      <Contact />
      <ThankYou />
    </ShellPage>
  );
}

async function Hi() {
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
      <Content title="Hi, I'm Ommi 👋" description="Greeting">
        <p className="text-sm prose dark:prose-invert">
          Software Engineer based in <b>Jakarta, Indonesia</b>. I love building
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

function About() {
  return (
    <Section>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="About">
        <p className="text-sm prose dark:prose-invert">
          My name is <b>Ommi Putera K.</b>
        </p>
        <Br />
        <p className="text-sm prose dark:prose-invert">
          I work at <b>Dipay Indonesia</b> as a Full Stack Engineer.
        </p>
        <Br />
        <p className="text-sm prose dark:prose-invert">I am passionate about</p>
        <p className="text-sm prose dark:prose-invert">
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
          <p className="text-sm prose dark:prose-invert">
            Dark mode will reduce screen brightness for a more comfortable
            reading experience.
          </p>
          <Br />
          <p className="text-sm prose dark:prose-invert">
            <span>
              Turn on <ModeToggle /> mode by clicking this section <ModeEmoji />{" "}
            </span>
          </p>
        </Content>
      </Section>
    </ModeClickable>
  );
}

// function Uses() {
//   return (
//     <Section>
//       <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
//         <CarFront className="w-4 h-4 md:w-5 md:h-5" />
//       </div>
//       <Content title="Uses">
//         <p className="text-sm prose dark:prose-invert">Work in progres</p>
//       </Content>
//     </Section>
//   );
// }

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
        <p className="text-sm prose dark:prose-invert">
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
      <Br />
    </Section>
  );
}
