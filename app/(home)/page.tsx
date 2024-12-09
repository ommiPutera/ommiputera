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
      <Hi />
      <Mode />
      <About />
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
          <span>Welcome to my corner of the web!</span>
          <Br />
          <span>
            I&apos;m a Software Engineer based in <b>Jakarta, Indonesia</b>. I
            love building things with{" "}
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
          I&apos;m <b>Ommi Putera</b>
        </ContentParagraph>
        <Br />
        <ContentParagraph>
          A passionate Software Engineer who loves building scalable and
          efficient web applications
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
            Dark mode for a comfy, eye-friendly experience, or switch to light
            mode for a bright and energetic vibe.
          </ContentParagraph>
          <Br />
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
