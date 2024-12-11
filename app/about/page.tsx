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
import { getBase64 } from "~/utils/getImageBlur";

export const metadata: Metadata = {
  title: "About Ommi Putera",
};

export default function About() {
  return (
    <ShellPage withHome withBack>
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
      <Content title="Hi, I'm Ommi Putera 👋">
        <ContentParagraph>
          <span>
            Welcome to my space on the web! I&apos;m a Software Engineer based
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
            Currently, I work as a Full Stack Engineer at{" "}
            <ContentLink
              href="https://dipay.id/"
              target="_blank"
              text=" Dipay"
            />
            , a fintech startup specializing in financial services in Indonesia.
          </span>
        </ContentParagraph>
        <Br />
        <ContentParagraph className="font-bold">
          I was born in 1998 in Bengkulu, Indonesia.
        </ContentParagraph>
        <Br />
        <ContentParagraph>
          My journey into tech began unexpectedly. I started with a degree in
          economics, but when the COVID-19 pandemic disrupted industries in late
          2019, I was forced to seek a new direction — and that&apos;s when I
          discovered digital technology.
        </ContentParagraph>
        <Br />
        <ContentParagraph>
          In 2021, I joined{" "}
          <ContentLink
            href="https://purwadhika.com/"
            target="_blank"
            text=" Purwadhika"
          />{" "}
          Digital Technology School&apos;s Full Stack Web and Mobile Development
          Bootcamp. There, I discovered my passion for coding and web
          development. The program equipped me with essential technical skills.
        </ContentParagraph>
        <Br />
        <AboutGalery />
      </Content>
    </Section>
  );
}

async function Values() {
  const blurredImage = await getBase64("/images/me.webp");
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
          <ContentParagraph className="font-bold">
            Continuous Learning
          </ContentParagraph>
          <ContentParagraph>
            I see learning as an ongoing journey. Staying curious and embracing
            new ideas and technologies drive my personal growth and keep me
            adaptable in a fast-changing industry.
          </ContentParagraph>
        </div>
        <Br />
        <div>
          <ContentParagraph className="font-bold">Empathy</ContentParagraph>
          <ContentParagraph>
            Empathy bridges the gap between technology and the people it serves.
            By understanding the needs and perspectives of users and clients, I
            create products that are not only functional but also meaningful and
            impactful.
          </ContentParagraph>
        </div>
        <Br />
        <div>
          <ContentParagraph className="font-bold">
            A Shared Desire for Life
          </ContentParagraph>
          <ContentParagraph>
            Life is precious — not just for us but for all living beings.
            Recognizing this shared desire inspires me to live and work with
            compassion and respect for the world around us.
          </ContentParagraph>
        </div>
        <Br />
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
          <Image
            src="/images/me.webp"
            width={1000}
            height={1000}
            alt=""
            placeholder="blur"
            blurDataURL={blurredImage}
            className="md:h-[550px] h-[450px] object-cover"
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
