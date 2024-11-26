import Image from "next/image";
import Link from "next/link";

import { CarFront } from "lucide-react";

import Br from "~/components/br";
import Content from "~/components/content";
import { ModeClickable, ModeEmoji, ModeToggle } from "~/components/mode-toggle";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import About from "./about.section";
import Blog from "./blog.section";
import Contact from "./contact.section";
import Education from "./education.section";
import Stack from "./my-stack.section";
import Projects from "./projects.section";
import Work from "./work.section";

type Params = Promise<{ accessToken: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function Home(props: {
  params: Params
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const accessToken = searchParams.accessToken
  const id = searchParams.id

  return (
    <ShellPage>
      <Hi accessToken={accessToken} id={id} />
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

async function Hi({ accessToken, id }: { accessToken: string | string[] | undefined, id: string | string[] | undefined }) {
  const data = await fetch(`https://api.bloum.id/invitation/${id}/rsvp`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const rsvp = await data.json()
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
        <p className="text-sm font-normal  leading-5">
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
        <p>
          acc: {accessToken}
          <br />
          id: {id}
        </p>
        <p>
          resp: {JSON.stringify(rsvp, null, 2)}
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
          <p className="text-sm font-normal  leading-5">
            Dark mode will reduce screen brightness for a more comfortable
            viewing experience.
          </p>
          <Br />
          <p className="text-sm font-normal  leading-5">
            <span>
              Turn on <ModeToggle /> mode by clicking this button <ModeEmoji />{" "}
            </span>
          </p>
        </Content>
      </Section>
    </ModeClickable>
  );
}

function Uses() {
  return (
    <Section>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CarFront className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Uses">
        <p className="text-sm  leading-5">Work in progres</p>
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
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image src="/images/thank-you.jpg" width={800} height={400} alt="" />
        </div>
      </Content>
    </Section>
  );
}
