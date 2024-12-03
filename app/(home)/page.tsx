import { Metadata } from "next";
import Image from "next/image";

import { CornerUpRight } from "lucide-react";

import AboutGalery from "~/components/about-galery";
import Br from "~/components/br";
import Content, { ContentLink, ContentParagraph } from "~/components/content";
import { ModeClickable, ModeEmoji, ModeToggle } from "~/components/mode-toggle";
import Section, { SectionAvatar } from "~/components/section";
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
      <SectionAvatar>
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full"
        />
      </SectionAvatar>
      <Content title="Hi, I'm Ommi 👋" description="Greeting">
        <ContentParagraph>
          <span>
            Software Engineer based in <b>Jakarta, Indonesia</b>. I love
            building things with{" "}
          </span>
          <ContentLink
            href="https://remix.run/"
            target="_blank"
            text=" Remix."
          />
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function About() {
  return (
    <Section>
      <SectionAvatar>
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </SectionAvatar>
      <Content title="About">
        <ContentParagraph>
          My name is <b>Ommi Putera K.</b>
        </ContentParagraph>
        <Br />
        <ContentParagraph>
          I work at <b>Dipay Indonesia</b> as a Full Stack Engineer.
        </ContentParagraph>
        <Br />
        <ContentParagraph>I am passionate about</ContentParagraph>
        <ContentParagraph>
          <ContentLink href="/about" text="Show more" />
        </ContentParagraph>
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
        <SectionAvatar>
          <Image
            src="/images/profile.jpeg"
            width={40}
            height={40}
            alt=""
            className="object-cover overflow-hidden rounded-full"
          />
        </SectionAvatar>
        <Content title="Prefer dark/light mode?" description="Ommi Putera">
          <ContentParagraph>
            Dark mode will reduce screen brightness for a more comfortable
            reading experience.
          </ContentParagraph>
          <Br />
          <ContentParagraph>
            Turn on <ModeToggle /> mode by clicking this section <ModeEmoji />
          </ContentParagraph>
        </Content>
      </Section>
    </ModeClickable>
  );
}

function ThankYou() {
  return (
    <Section>
      <SectionAvatar>
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full"
        />
      </SectionAvatar>
      <Content title="Thank you for stopping by! 👋" description="Ommi Putera">
        <ContentParagraph>
          <span>You can follow me on</span>{" "}
          <span className="inline-flex gap-2">
            <ContentLink
              href="https://remix.run/"
              target="_blank"
              text="Twitter"
            />
            <ContentLink
              href="https://remix.run/"
              target="_blank"
              text="LinkedIn"
            />
            <ContentLink
              href="https://remix.run/"
              target="_blank"
              text="Github"
            />
            <ContentLink
              href="https://remix.run/"
              target="_blank"
              text="Instagram"
            />
          </span>
        </ContentParagraph>
        <Br />
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image src="/images/thank-you.jpg" width={800} height={400} alt="" />
        </div>
      </Content>
    </Section>
  );
}
