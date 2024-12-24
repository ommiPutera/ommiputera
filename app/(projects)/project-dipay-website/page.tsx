import { ChartNoAxesGantt, CircleDashed } from "lucide-react";
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
        <span>
          Revamped Dipay (.id) with a major upgrade using <b>Next.js 13</b>! ✨
        </span>
        <Br />
        <span>
          ✅ Modern UI
          <br />
          ✅ Effortless user experience
          <br />
          ✅ Engaging interactions
          <br />✅ Clean, organized layout with bento grid
        </span>
        <Br />
        <span>Take a look:</span>{" "}
        <ContentLink href="https://dipay.id/" target="_blank" text="dipay.id" />
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
          <span>What does a website transformation really look like? 🤔</span>
          <Br />
          <span>
            It’s about creating an experience that feels seamless, effortless,
            and fast. With Next.js, Dipay now features:
            <Br />
            ⚡ Blazing-fast performance for a smoother experience.
            <br />
            🛣️ Intuitive navigation that makes exploring easy.
            <br />
            🖼️ Faster image loading to keep users engaged.
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
          <span>
            The first challenge was performance. Pages took too long to load,
            frustrating users and driving them away. This wasn’t just a design
            issue—it was a technical problem that required a complete overhaul.
          </span>
          <Br />
          <span>
            Navigation was another major issue. Users found it hard to locate
            important information, and the overall layout felt unintuitive.
            Instead of guiding users, the website left them feeling lost.
            Finally, the existing codebase was outdated and rigid. Adding new
            features or making updates was a time-consuming process. The website
            needed to be scalable, flexible, and future-proof.
          </span>
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
