import { Metadata } from "next";
import Image from "next/image";

import { CornerUpRight } from "lucide-react";

import AboutGalery from "~/components/about-galery";
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
      <div>
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
      <SectionAvatar>
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full"
        />
      </SectionAvatar>
      <Content title="Hi, I'm Ommi Putera 👋" description="Greeting">
        <ContentParagraph>
          <span>
            Welcome to my corner of the internet! I&apos;m a Software Engineer
            based in <b>Jakarta, Indonesia</b> 🇮🇩
          </span>
          <Br />
          <span>I love building things with </span>
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
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <SectionAvatar>
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </SectionAvatar>
      <Content title="About">
        <ContentParagraph>
          Currently, I&apos;m working as a Full Stack Engineer at a fintech
          startup that specializes
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
            Just click the section to toggle between the two <ModeEmoji />
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
        <Social />
      </Content>
    </Section>
  );
}
