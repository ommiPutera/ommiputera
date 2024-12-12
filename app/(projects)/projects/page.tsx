import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

import Br from "~/components/br";
import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getBase64Image } from "~/utils/getImageBlur";

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
    <ShellPage withHome withBack>
      <Section>
        <div className="my-4 overflow-hidden relative">
          <h1 className="relative z-10 text-2xl md:text-4xl text-center font-sans font-extrabold">
            Projects
          </h1>
          <ContentParagraph className="text-center text-sm md:text-base mx-6 md:mx-24 mt-1">
            Showcase of my latest projects. They&apos;re sure to catch your eye!
          </ContentParagraph>
        </div>
        <Br />
        <div className="flex flex-col gap-6 md:gap-8 mx-1.5 md:mx-4">
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

async function Project({ slug, imageSource, title, summary }: TData) {
  return (
    <Link
      href={`/${slug}`}
      className="rounded-xl w-full relative cursor-pointer overflow-hidden block h-full border dark:border-neutral-800"
    >
      <Image
        alt=""
        src={imageSource}
        width={1000}
        height={1000}
        placeholder="blur"
        blurDataURL={await getBase64Image(imageSource)}
        className="min-h-[240px] h-full max-h-[240px] md:min-h-[300px] md:h-[300px] md:max-h-[300px] object-cover rounded-xl"
      />
      <div className="p-5 md:p-0 max-w-[380px] md:my-6 md:mx-auto group prose dark:prose-invert">
        <h2 className="text-sm md:text-base font-extrabold w-full">{title}</h2>
        <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-neutral-300 inline-flex flex-col gap-2">
          {summary}
        </p>
        <p className="text-xs font-semibold inline-flex gap-2 not-prose items-center group-hover:text-blue-600 dark:text-blue-400">
          <span>Read more</span>
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
        </p>
      </div>
    </Link>
  );
}
