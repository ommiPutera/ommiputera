import { FolderOpen } from "lucide-react";
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
    title: "Development of Dipay Disbursement",
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
        <div className="flex gap-2">
          <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
            <FolderOpen className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="w-full">
            <ContentTitle title="Projects 🔥" description="Curated" />
          </div>
        </div>
        <p className="text-sm prose dark:prose-invert mt-1">
          Here are some showcase of my latest projects. They&apos;re sure to
          catch your eye!
        </p>
        <Br />
        <div className="flex flex-col gap-4 md:gap-2">
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
      className="rounded-xl w-full cursor-pointer block h-full overflow-hidden bg-background border dark:border-neutral-700"
    >
      <Image src={imageSource} width={800} height={400} alt="" />
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 prose dark:prose-invert">
        <h3 className="text-base font-bold w-full">{title}</h3>
        <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-neutral-300">
          <span>Ommi Putera</span>
          <br />
          <span>{summary}</span>
        </p>
      </div>
    </Link>
  );
}
