import {
  ArrowUpRight,
  FolderClosed,
  FolderOpen,
  Globe,
  Sparkle,
} from "lucide-react";
import Image from "next/image";

import Link, { LinkProps } from "next/link";

import Br from "~/components/br";
import Content, { ContentParagraph } from "~/components/content";
import Section from "~/components/section";

export default function Projects() {
  return (
    <div>
      <Intro />
      <Dipay />
      <Naufal />
      <Close />
    </div>
  );
}

function Intro() {
  return (
    <Section withConnector>
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <FolderOpen className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Projects 🔥">
        <ContentParagraph>
          Here&apos;s a glimpse of projects and ideas I&apos;ve worked on.
        </ContentParagraph>
        <ContentParagraph>
          <Link
            href="/projects"
            className="font-medium text-blue-600 dark:text-blue-400 underline"
          >
            Show more
          </Link>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function Close() {
  return (
    <Section className="pt-0 md:pt-0">
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <FolderClosed className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="More Project">
        <ContentParagraph>
          <span>Looking for more? Explore all my projects</span>{" "}
          <Link
            href="/projects"
            className="font-medium text-blue-600 dark:text-blue-400 underline"
          >
            here!
          </Link>
        </ContentParagraph>
      </Content>
    </Section>
  );
}

function Dipay() {
  return (
    <Section
      withConnector
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content
        title="Revamped a Landing Page using Next.js"
        description="Dipay Indonesia"
      >
        <ContentParagraph>
          I revamped Dipay&apos;s landing page using Next.js, implementing SEO
          best practices to enhance visibility while delivering a modern,
          high-performance design that reduced load times and boosted user
          engagement. 🚀
        </ContentParagraph>
        <Br />
        <ProjectCover src="/images/projects/personal.png" />
      </Content>
      <div className="flex gap-3 md:gap-6 mt-3 ml-[48px]">
        <ReadMore href="/project-dipay-landing" />
        <Website href="https://dipay.id/" />
      </div>
    </Section>
  );
}

function Naufal() {
  return (
    <Section
      withConnector
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Naufal Ghifari Website" description="Personal/Porfolio">
        <ContentParagraph>
          I developed Naufal Ghifari&apos;s personal portfolio website,
          transforming a creative design into a responsive, high-performance
          platform that showcases his skills, projects, and professional
          journey.
        </ContentParagraph>
        <Br />
        <ProjectCover src="/images/projects/naufal-page.jpeg" />
      </Content>
      <div className="flex gap-3 md:gap-6 mt-3 ml-[48px]">
        <ReadMore href="/project-naufal-website" />
        <Website href="https://naufalghfr.vercel.app/" />
      </div>
    </Section>
  );
}

function ReadMore({ href }: { href: LinkProps["href"] }) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-1"
    >
      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
      <span>Read</span>
    </Link>
  );
}

function Website({ href }: { href: LinkProps["href"] }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="text-sm font-semibold text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-1"
    >
      <Globe className="w-4 h-4 md:w-5 md:h-5" />
      <span>Website</span>
    </Link>
  );
}

function ProjectCover({ src }: { src: string }) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
      <Image src={src} width={800} height={400} alt="" />
    </div>
  );
}
