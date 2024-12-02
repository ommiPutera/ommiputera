import { FolderOpen, MoveRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

import Br from "~/components/br";
import { ContentTitle } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

export const metadata = {
  title: "The Ommi Putera Projects",
  description: "",
};

const data: TData[] = [
  {
    slug: "dipay-disbursement",
    imageSource: "/images/projects/dipay-disburesment.jpeg",
    title: "Building a Dipay Enterprise Disbursement",
    summary:
      "Improve the accuracy and efficiency of image recognition technology. By creating our own tools, we can customize the annotation process to fit the specific needs and requirements, rather than relying on third-party tools.",
  },
  {
    slug: "dipay-core-dashboard",
    imageSource: "/images/projects/dipay-core.jpeg",
    title: "Building a Dipay Core Dashboard",
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
        <div className="flex flex-row gap-2">
          <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
            <FolderOpen className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="w-fit">
            <ContentTitle title="Projects 🔥" description="Curated" />
          </div>
        </div>
        <p className="text-sm prose dark:prose-invert mt-1">
          Here are some showcase of my latest projects. They&apos;re sure to
          catch your eye!
        </p>
        <Br />
        <div className="flex flex-col gap-6 md:gap-8">
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
      prefetch
      className="rounded-xl w-full cursor-pointer block h-full overflow-hidden bg-background border dark:border-neutral-800"
    >
      <Image src={imageSource} width={800} height={400} alt="" />
      <div className="p-9 md:p-0 max-w-[422px] md:my-12 md:mx-auto group">
        <p className="text-blue-500 text-xs md:text-sm font-semibold">
          Dipay Indonesia - 2024
        </p>
        <h3 className="text-xl font-extrabold w-full my-4 leading-7">
          {title}
        </h3>
        <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-neutral-300 inline-flex flex-col gap-2 prose dark:prose-invert">
          {summary}
        </p>
        <br />
        <br />
        <p className="text-xs font-semibold inline-flex gap-4 items-center group-hover:text-blue-500">
          <span>View</span>
          <MoveRight className="w-4 h-4" />
        </p>
      </div>
    </Link>
  );
}
