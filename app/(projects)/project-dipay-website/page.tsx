import { ChartNoAxesGantt, Sparkle } from "lucide-react";
import Image from "next/image";

import Br from "~/components/br";
import Content, { ContentParagraph, ContentTitle } from "~/components/content";
import Section, { SectionAvatar } from "~/components/section";
import ShellPage from "~/components/shell-page";
import { Website } from "~/components/website";

import { getSingleProject } from "~/data/project";

import { getBase64Image } from "~/utils/getImageBlur";

export default function DipayWebsite() {
  return (
    <ShellPage withBack>
      <div>
        <Intro />
        <Overview />
        <Challenges />
        <Contribution />
        <Outcomes />
        <Recommendation />
      </div>
    </ShellPage>
  );
}

async function Intro() {
  const project = await getSingleProject("project-dipay-website");
  return (
    <Section className="border-b mb-3 md:mb-8">
      <div className="flex gap-3 mb-2">
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
          <ContentTitle title="Ommi Putera" description="Software Engineer (Web)" />
        </div>
      </div>
      <ContentParagraph>
        {project.title}
        <Br />
        {project?.summary}
      </ContentParagraph>
      <Br />
      <SingleImage
        src="/images/projects/personal.png"
        blurredImage={await getBase64Image("/images/projects/personal.png")}
      />
      <div className="mt-3 md:mt-6">
        <Website href="https://dipay.id" />
      </div>
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
          <span>
            Dipay is a digital wallet designed to make electronic payments fast,
            practical, and secure. However, its website didn’t live up to those
            standards. The outdated design, incomplete information, and
            confusing navigation created friction for users. It became clear
            that the website wasn’t just visually behind—it was affecting the
            trust and experience of the users.
          </span>
          <Br />
          <span>
            The goal of this project was to rebuild the website with a focus on
            performance, usability, and modern aesthetics. It wasn’t about
            superficial changes; it was about creating a platform that users
            could rely on, enjoy, and return to.
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

async function Challenges() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <ChartNoAxesGantt className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Challenges">
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

async function Contribution() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <ChartNoAxesGantt className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Contribution">
        <ContentParagraph>
          <span>
            I led the migration of the website to Next.js, which immediately
            addressed many of the performance issues. By leveraging server-side
            rendering and static generation, we made pages load faster and
            perform more efficiently.
          </span>
          <Br />
          <span>
            In collaboration with the design team, I worked on rethinking the
            website’s layout. We aimed for a clean, modern, and responsive
            design that worked seamlessly across all devices. This wasn’t just
            about aesthetics; it was about making navigation intuitive and
            ensuring that users could find what they needed without any
            frustration.
          </span>
          <Br />
          <span>
            I also optimized the technical aspects of the website. Scripts were
            streamlined, assets were compressed, and the overall structure was
            simplified. These changes reduced page load times by 40%. Behind the
            scenes, I implemented a modular architecture that made the codebase
            easier to maintain and scale for future needs.
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

async function Outcomes() {
  return (
    <Section className="pt-0 md:pt-0" withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <ChartNoAxesGantt className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Outcomes">
        <ContentParagraph>
          <span>
            The revamped website delivered results immediately. Page load times
            improved by 40%, which directly reduced user frustration. Engagement
            rates increased by 50%, as users found the new design easier to
            navigate and more enjoyable to use.
          </span>
          <Br />
          <span>
            Internally, the modular architecture has already proven its value,
            making updates and new feature development faster and more
            efficient. The website is now positioned to grow alongside Dipay’s
            user base, supporting new features and improvements with ease.
          </span>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function Recommendation() {
  return (
    <Section className="pt-0 md:pt-0 mb-6">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="More">
        <ContentParagraph>
          Navigate to another page to dive deeper!
        </ContentParagraph>
        <Br />
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
