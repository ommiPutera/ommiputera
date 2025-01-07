import {
  AudioLines,
  Circle,
  CircleDashed,
  CircleFadingPlus,
  Crown,
  Globe,
  Play,
  Scan,
  Wrench,
} from "lucide-react";
import Image from "next/image";

import Br from "~/components/br";
import Content, {
  ContentLink,
  ContentParagraph,
  ContentTitle,
} from "~/components/content";
import Section, { SectionAvatar } from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getBase64Image } from "~/utils/getImageBlur";

export default function DipayWebsite() {
  return (
    <ShellPage withBack>
      <div>
        <Intro />
        <Stack />
        <Challenges />
        <Solution />
        <HeroAnimation />
        <AnimatedBento />
        <SEO />
        <DeveloperProductivity />
        <PersonalNote />
        <Close />
      </div>
    </ShellPage>
  );
}

async function Intro() {
  return (
    <Section className="border-b mb-3 md:mb-8">
      <div className="flex gap-3 mb-0.5">
        <SectionAvatar>
          <Image
            src="/images/profile.jpeg"
            width={40}
            height={40}
            alt=""
            className="object-cover overflow-hidden rounded-full"
          />
        </SectionAvatar>
        <div className="w-fit">
          <ContentTitle
            title="Ommi Putera"
            description="Software Engineer (Web)"
          />
        </div>
      </div>
      <ContentParagraph>
        <span>🎉 Big news!</span>
        <Br />
        <span>1/10 - </span>
        <ContentLink href="https://dipay.id/" target="_blank" text="Dipay" />
        {" (.id) "}
        <span>just got a fresh new look! ✨</span>
        <Br />
        <span>
          We&apos;ve packed it with thoughtful details to elevate your
          experience.
        </span>
        <Br />
        <span>Here&apos;s the behind-the-scenes story. 👇</span>
      </ContentParagraph>
      <Br />
      <SingleImage
        src="/images/projects/personal.png"
        blurredImage={await getBase64Image("/images/projects/personal.png")}
      />
    </Section>
  );
}

function Stack() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Wrench className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="The Stack">
        <ContentParagraph>
          <span>
            2/10 - We rebuilt the entire site using:
            <Br />
            ⚡ Next.js for blazing-fast SSR and SSG.
            <br />
            🔍 TailwindCSS for clean and maintainable styling.
          </span>
          <Br />
          <span>
            Every choice was intentional to create a fast, reliable, and
            scalable website.
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function Challenges() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CircleDashed className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="The Challenges">
        <ContentParagraph>
          <span>
            3/10 - Building something new isn&apos;t without its struggles:
            <Br />
            1️⃣ Slow load times were killing the user experience.
            <br />
            2️⃣ Scaling was tricky with the old architecture.
            <br />
            3️⃣ We needed better tools for seamless updates.
          </span>
          <Br />
          <span>
            These problems weren&apos;t just technical—they directly affected
            users.
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function Solution() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Circle className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="The Solution">
        <ContentParagraph>
          <span>
            4/10 - Our goal: Speed and simplicity.
            <Br />
            ✅ Optimized APIs to deliver data faster.
            <br />
            ✅ Implemented image optimization to reduce payloads.
            <br />✅ Built reusable components for consistent UI + maintainable
            code.
          </span>
          <Br />
          <span>
            The result? A site that’s 3x faster and infinitely easier to manage.
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function HeroAnimation() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Play className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Hero Animation">
        <ContentParagraph>
          <span>
            5/10 - Some pages now feature hero animations that are incredibly
            smooth.
          </span>
        </ContentParagraph>
        <Br />
        <video
          loop
          autoPlay
          playsInline
          muted
          className="border rounded-xl h-[calc(100vw_/_2.5)] md:h-[calc(var(--shell-page-width)_/_2.7)]"
        >
          <source src="/videos/hero-animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Content>
    </Section>
  );
}

function AnimatedBento() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Scan className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Animated Bento Card">
        <ContentParagraph>
          <span>
            6/10 - Here&apos;s one of my favorite details:
            <br />
            <b>The bento-style card animations.</b>
          </span>
        </ContentParagraph>
        <Br />
        <span>
          Hovering over a card zooms the asset smoothly, adding depth and making
          interactions immersive. This subtle effect enhances browsing and
          breathes life into the layout. 🎥
        </span>
        <Br />
        <video
          loop
          autoPlay
          playsInline
          muted
          className="border rounded-xl h-[calc(100vw_/_1.2)] md:h-[calc(var(--shell-page-width)_/_1.27)]"
        >
          <source src="/videos/animated-bento.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Content>
    </Section>
  );
}

function SEO() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Globe className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="SEO">
        <ContentParagraph>
          <span>7/10 - We also made sure the site is SEO-friendly. 🚀</span>
          <Br />
          <span>
            By optimizing metadata and implementing structured data, we&apos;re
            helping search engines understand the site better.
          </span>
          <Br />
          <span>Good devs write code. Great devs write accessible code.</span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function DeveloperProductivity() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Crown className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Developer Productivity">
        <ContentParagraph>
          <span>
            8/10 - We also focused on developer productivity.
            <Br />
            1️⃣ Modularized the codebase with strict TypeScript typing.
            <br />
            2️⃣ Set up a CI/CD pipeline for automated testing and deployment.
            <br />
            3️⃣ Containerized the app for consistent development environments.
            <br />
            4️⃣ Implemented analytics to track performance and user behavior.
          </span>
          <Br />
          <span>Better dev tools = faster iteration cycles.</span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function PersonalNote() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <AudioLines className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Personal Note">
        <ContentParagraph>
          <span>
            9/10 - Contributing to this transformation was a rewarding journey!
            It&apos;s exciting to see how thoughtful design and tech can improve
            everyday experiences.
          </span>
          <Br />
          <span>
            This was more than just a project; it was a deep dive into what
            makes great web apps tick.
          </span>
          <Br />
          <span>
            From solving tricky edge cases to optimizing for scale, it was a
            reminder of why I love being a developer.
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function Close() {
  return (
    <Section className="pt-0 md:pt-0">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CircleFadingPlus className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Thanks">
        <ContentParagraph>
          10/10 - Thank you for reading my thread. The best way to reach me is
          by email at me@ommiputera.com. Let&apos;s build the future together.
          💙
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function SingleImage({
  src,
  blurredImage,
}: {
  src: string;
  blurredImage: string;
}) {
  return (
    <div className="rounded-2xl flex flex-col gap-4 overflow-hidden">
      <Image
        src={src}
        width={1000}
        height={1000}
        alt=""
        placeholder="blur"
        blurDataURL={blurredImage}
        className="h-[calc(100vw_/_1.9)] md:h-[calc(var(--shell-page-width)_/_2.1)] object-cover border border-neutral-200 dark:border-neutral-800 rounded-2xl"
      />
    </div>
  );
}
