import {
  AudioLines,
  ChartNoAxesGantt,
  CircleDashed,
  CircleFadingPlus,
  Group,
  Package,
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

// import { getSingleProject } from "~/data/project";

import { getBase64Image } from "~/utils/getImageBlur";

export default function DipayWebsite() {
  return (
    <ShellPage withBack>
      <div>
        <Intro />
        <Overview />
        <Problem />
        <HeroAnimation />
        <AnimatedBento />
        <PersonalNote />
        <Close />
      </div>
    </ShellPage>
  );
}

async function Intro() {
  // const project = await getSingleProject("project-dipay-website");
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
        <ContentLink
          href="https://dipay.id/"
          target="_blank"
          text="dipay.id"
        />{" "}
        <span>just got a fresh new look! ✨</span>
        <Br />
        <span>
          We&apos;ve packed it with thoughtful details to elevate your
          experience.
        </span>
        <Br />
        <span>Take a closer look 👇</span>
      </ContentParagraph>
      <Br />
      <SingleImage
        src="/images/projects/personal.png"
        blurredImage={await getBase64Image("/images/projects/personal.png")}
      />
    </Section>
  );
}

async function Overview() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <ChartNoAxesGantt className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Overview">
        <ContentParagraph>
          <span>2/10 - Here&apos;s what a website transformation means:</span>
          <Br />
          <span>
            It&apos;s all about delivering a seamless, effortless, and
            lightning-fast experience. 🚀
          </span>
          <Br />
          <span>
            With Next.js, Dipay now offers:
            <br />
            ⚡ Blazing-fast performance for smoother interactions.
            <br />
            🧭 Intuitive navigation for effortless exploration.
            <br />
            🖼️ Faster image loading to keep you engaged.
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

async function Problem() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <CircleDashed className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Problem Statement">
        <ContentParagraph>
          <span>3/10 - The challenges we tackled:</span>
          <Br />
          <span>
            Slow load times, confusing navigation, and low user engagement.
          </span>
          <Br />
          <span>
            Dipay deserved a website that matched its potential: fast,
            intuitive, and delightful to use. 🚀
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

async function HeroAnimation() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Group className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Hero Animation">
        <ContentParagraph>
          <span>
            4/10 - Some pages now feature hero animations that are incredibly
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
        <Package className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Animated Bento Card">
        <ContentParagraph>
          <span>
            5/10 - Here&apos;s one of my favorite details: the animation for
            assets in the bento-style layout.
          </span>
        </ContentParagraph>
        <Br />
        <span>
          When you hover over a card, the asset zooms in smoothly, adding depth
          and making interactions feel more immersive. 🎥
        </span>
        <Br />
        <span>
          This subtle effect enhances the browsing experience and breathes life
          into the layout.
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

function PersonalNote() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <AudioLines className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Personal Note">
        <ContentParagraph>
          9/10 - Contributing to this transformation was a rewarding journey!
          It’s exciting to see how thoughtful design and tech can improve
          everyday experiences.
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
          10/10 - Thank you for reading this thread. I’d love to hear your
          thoughts on the new look and experience at Dipay. Let’s build the
          future of cashless, together. 💙
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
