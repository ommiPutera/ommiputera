import { MoveRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

import Br from "~/components/br";
import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

export const metadata = {
  title: "The Ommi Putera Projects",
  description: "",
};

const data: TData[] = [
  {
    slug: "project-dipay-disbursement",
    imageSource: "/images/projects/dipay-disburesment.jpeg",
    title: "Building a Dipay Enterprise Disbursement",
    summary:
      "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  },
  {
    slug: "project-dipay-core-dashboard",
    imageSource: "/images/projects/dipay-core.jpeg",
    title: "Building a Dipay Core Dashboard",
    summary:
      "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  },
  {
    slug: "project-dipay-landing",
    imageSource: "/images/projects/personal.png",
    title: "Revamped a Landing Page using Next.js",
    summary:
      "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  },
  {
    slug: "project-naufal-website",
    imageSource: "/images/projects/naufal-page.jpeg",
    title: "Personal/Porfolio Website for Naufal Ghifari",
    summary:
      "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  },
];
type TData = {
  slug: string;
  imageSource: string;
  title: string;
  summary: string;
};

export default async function ProjectsPage() {
  return (
    <ShellPage title="The Ommi Putera Projects" withHome withBack>
      <Section>
        <div className="my-4 overflow-hidden relative">
          <h1 className="relative z-10 text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-950 dark:from-neutral-50 dark:to-neutral-300 text-center font-sans font-extrabold">
            Projects
          </h1>
          <ContentParagraph className="text-center text-sm md:text-base mx-6 md:mx-24 mt-1">
            Showcase of my latest projects. They&apos;re sure to catch your eye!
          </ContentParagraph>
        </div>
        <Br />
        <div className="flex flex-col gap-4 md:gap-6">
          {data.map((post) => {
            const slug = post.slug;
            const imageSource = post.imageSource;
            const title = post.title;
            const summary = post.summary;
            const props = {
              imageSource,
              slug,
              title,
              summary,
            };
            return <Project key={post.slug} {...props} />;
          })}
        </div>
        <Br />
      </Section>
    </ShellPage>
  );
}

function Project({ slug, imageSource, title, summary }: TData) {
  return (
    <Link
      href={`/${slug}`}
      className="rounded-xl w-full relative cursor-pointer overflow-hidden block h-full bg-white dark:bg-background border dark:border-neutral-800"
    >
      <Image
        src={imageSource}
        width={800}
        height={400}
        alt=""
        className="h-full min-h-[248px] md:h-[340px] object-cover rounded-xl"
      />
      <div className="p-9 md:p-0 max-w-[422px] md:my-12 md:mx-auto group">
        <p className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold">
          2024
        </p>
        <h2 className="text-xl font-extrabold w-full my-4 leading-7">
          {title}
        </h2>
        <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-neutral-300 inline-flex flex-col gap-2 prose dark:prose-invert">
          {summary}
        </p>
        <br />
        <br />
        <p className="text-xs font-semibold inline-flex gap-4 items-center group-hover:text-blue-600 dark:text-blue-400">
          <span>View</span>
          <MoveRight className="w-4 h-4" />
        </p>
      </div>
    </Link>
  );
}
