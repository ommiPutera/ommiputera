import {
  ChartNoAxesGantt,
  CircleDashed,
  CircleFadingPlus,
  Group,
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
          We&apos;ve packed it with thoughtful details to make your experience
          even better.
        </span>
        <Br />
        <span>Check it out! 👇</span>
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
          <span>2/10 - So, what does a website transformation mean? 🤔</span>
          <Br />
          <span>
            It&apos;s about delivering a seamless, effortless, and
            lightning-fast experience. 🚀
          </span>
          <Br />
          <span>
            With Next.js, Dipay now offers:
            <br />
            ⚡ Blazing-fast performance for smoother interactions.
            <br />
            🛣️ Intuitive navigation to make exploring a breeze.
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
          <span>3/10 - The challenge we faced?</span>
          <Br />
          <span>
            Slow load times, confusing navigation, and a lack of user engagement
            were holding us back.
          </span>
          <Br />
          <span>
            We knew Dipay deserved a website that matched its potential—fast,
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
            4/10 - Some pages have hero animations that are incredibly smooth.
          </span>
        </ContentParagraph>
        <Br />
        <video loop autoPlay className="border rounded-xl">
          <source src="/videos/hero-animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
          10/10 - Thank you for reading this thread.
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
