import { ArrowUpRight, FolderClosed, FolderOpen, Sparkle } from "lucide-react";
import Image from "next/image";

import Link, { LinkProps } from "next/link";

import Br from "~/components/br";
import Content, { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import { Website } from "~/components/website";

import { getBase64Image } from "~/utils/getImageBlur";

type TProject = {
  title: string;
  description: string;
  summary: string;
  slug: string;
  coverPath: string;
  href: string;
};
const projects: TProject[] = [
  {
    title: "Revamped a Landing Page using Next.js",
    description: "Dipay Indonesia - 2023",
    summary:
      "I revamped the Dipay landing page using Next.js, implementing SEO best practices to enhance visibility while delivering a modern, high-performance design that reduced load times and boosted user engagement. 🚀",
    slug: "project-dipay-landing",
    coverPath: "/images/projects/personal.png",
    href: "https://dipay.id/",
  },
  {
    title: "Naufal Ghifari website",
    description: "Personal/porfolio",
    summary:
      "I developed Naufal Ghifari's personal website, transforming a creative design into a responsive, high-performance platform that showcases his skills, projects, and professional journey.",
    slug: "project-naufal-website",
    coverPath: "/images/projects/naufal-page.jpeg",
    href: "https://naufalghfr.vercel.app/",
  },
];
export default function Projects() {
  return (
    <div>
      <Intro />
      <div className="flex flex-col">
        {projects.map((project) => (
          <Project key={project.slug} {...project} />
        ))}
      </div>
      <Close />
    </div>
  );
}

function Intro() {
  return (
    <Section>
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
      <Content title="More project?">
        <ContentParagraph>
          <span>Explore all of my projects</span>{" "}
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

async function Project({
  title,
  description,
  summary,
  slug,
  href,
  coverPath,
}: TProject) {
  return (
    <Section
      withConnector
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <Link href={"/" + slug}>
        <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
          <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <Content title={title} description={description}>
          <ContentParagraph>{summary}</ContentParagraph>
          <Br />
          <ProjectCover
            src={coverPath}
            blurredImage={await getBase64Image(coverPath)}
          />
        </Content>
      </Link>
      <div className="flex gap-3 md:gap-6 mt-3 ml-[48px]">
        <ReadMore href={"/" + slug} />
        <Website href={href} />
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
      <span>Read more</span>
    </Link>
  );
}

function ProjectCover({
  src,
  blurredImage,
}: {
  src: string;
  blurredImage: string;
}) {
  return (
    <div className="rounded-xl flex flex-col gap-4 overflow-hidden">
      <Image
        src={src}
        width={1000}
        height={1000}
        alt=""
        placeholder="blur"
        blurDataURL={blurredImage}
        className="h-[calc(100vw_/_2.1)] md:h-[calc(var(--shell-page-width)_/_2.5)] object-cover border border-neutral-200 dark:border-neutral-800 rounded-xl"
      />
    </div>
  );
}
