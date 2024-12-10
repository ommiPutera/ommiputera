import { Metadata } from "next";

import { CornerUpRight } from "lucide-react";

import Image from "next/image";

import AboutGalery from "~/components/about-galery";
import Br from "~/components/br";
import Content, { ContentLink, ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";
import Social from "~/components/social";

import NextTo from "./next.section";

export const metadata: Metadata = {
  title: "About Ommi Putera",
};

export default function About() {
  return (
    <ShellPage title="A little bit about me" withHome withBack>
      <div>
        <Me />
        <Values />
        <NextTo />
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
        <ContentParagraph>Hi, I&apos;m Ommi 👋</ContentParagraph>
        <Br />
        <ContentParagraph>
          <span>
            Welcome to my corner of the web! I&apos;m a Software Engineer based
            in <b>Jakarta, Indonesia</b> 🇮🇩
          </span>
          <Br />
          <span>I love building things with </span>
          <ContentLink
            href="https://remix.run/"
            target="_blank"
            text=" Remix."
          />
        </ContentParagraph>
        <Br />
        <ContentParagraph>
          <span>
            Currently, I&apos;m working as a Full Stack Engineer at a fintech
            startup that specializes in financial services in Indonesia called
          </span>
          <ContentLink
            href="https://dipay.id/"
            target="_blank"
            text=" Dipay."
          />
        </ContentParagraph>
        <Br />
        <ContentParagraph>
          I was born in 1998 in Bengkulu, Indonesia. My journey into tech began
          in an unexpected way. After earning my degree in economics, I was
          ready to launch my career when the COVID-19 pandemic struck in late
          2019. With industries facing widespread layoffs, I started searching
          for new paths—and that&apos;s when I stumbled upon the dynamic world
          of digital technology.
        </ContentParagraph>
        <Br />
        <ContentParagraph>
          Eager to pivot, I joined{" "}
          <ContentLink
            href="https://purwadhika.com/"
            target="_blank"
            text=" Purwadhika"
          />{" "}
          Digital Technology School&apos;s Full Stack Web and Mobile Development
          Bootcamp in early 2021. That&apos;s where I found my passion for
          coding and web development. It equipped me with key technical skills
          and sparked my enthusiasm for continuous growth in software
          engineering.
        </ContentParagraph>
        <Br />
        <AboutGalery />
      </Content>
    </Section>
  );
}

function Values() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CornerUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Values">
        <ContentParagraph>
          The principles that guide my work and life.
        </ContentParagraph>
        <div className="mt-2">
          <h2 className="text-sm md:text-base font-bold tracking-normal mb-1">
            Continuous Learning
          </h2>
          <ContentParagraph>
            As an engineer, I believe learning is a lifelong journey. Staying
            curious and embracing new ideas and technologies not only drives my
            personal growth but also keeps me adaptable in a constantly evolving
            industry. This mindset fuels innovation and ensures my skills stay
            sharp.
          </ContentParagraph>
        </div>
        <Br />
        <div>
          <h2 className="text-sm md:text-base font-bold tracking-normal mb-1">
            Effective Collaboration
          </h2>
          <ContentParagraph>
            Collaboration thrives on humility and mutual respect. I prioritize
            open communication and value the contributions of every team member,
            regardless of their background or experience. By fostering a
            supportive and inclusive environment, I help teams unlock their full
            potential and achieve success together.
          </ContentParagraph>
        </div>
        <Br />
        <div>
          <h2 className="text-sm md:text-base font-bold tracking-normal mb-1">
            Empathy
          </h2>
          <ContentParagraph>
            Empathy connects technology with the people it serves. By
            understanding the needs and perspectives of users and clients, I
            ensure the products and solutions I create are not just functional,
            but also meaningful, impactful, and aligned with real-world needs.
          </ContentParagraph>
        </div>
        <Br />
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image
            src="/images/me.webp"
            width={800}
            height={400}
            alt=""
            className="max-h-[350px] object-cover"
          />
        </div>
        <Br />
        <ContentParagraph>
          The best way to get in touch with me is to email{" "}
          <b>me@ommiputera.com</b>
        </ContentParagraph>
        <Br />
        <Social />
      </Content>
    </Section>
  );
}
