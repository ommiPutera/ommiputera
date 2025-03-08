import { Metadata } from "next";

import { CornerUpRight } from "lucide-react";

import AboutGalery from "~/components/about-galery";
import { OmmiAvatar } from "~/components/avatar";
import Br from "~/components/br";
import Content, { ContentLink, ContentParagraph } from "~/components/content";
import { ModeClickable, ModeEmoji } from "~/components/mode-toggle";
import Section, { SectionAvatar } from "~/components/section";
import ShellPage from "~/components/shell-page";
import Social from "~/components/social";

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
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <Hi />
        <About />
      </div>
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
    <Section withConnector>
      <OmmiAvatar />
      <Content title="Hi, I'm Ommi Putera 👋">
        <ContentParagraph>
          <span>
            Welcome to my online space! I&apos;m a Software Engineer (Web) based
            in <b>Jakarta, Indonesia.</b> 🇮🇩
          </span>
          <Br />
          <span>I love building things with</span>{" "}
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
    <Section
      href="/about"
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <SectionAvatar>
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </SectionAvatar>
      <Content title="About me">
        <ContentParagraph>
          Previously, I worked as a Full Stack Engineer at{" "}
          <ContentLink href="https://dipay.id/" target="_blank" text=" Dipay" />{" "}
          a fintech startup specializing in financial services in Indonesia.
          Now..
        </ContentParagraph>
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
        <OmmiAvatar />
        <Content title="Prefer Dark or Light mode?" description="Ommi Putera">
          <ContentParagraph>
            Click this section to toggle <ModeEmoji />
          </ContentParagraph>
        </Content>
      </Section>
    </ModeClickable>
  );
}

function ThankYou() {
  return (
    <Section>
      <OmmiAvatar />
      <Content title="Thank you for stopping by! 👋" description="Ommi Putera">
        <Social />
      </Content>
    </Section>
  );
}
