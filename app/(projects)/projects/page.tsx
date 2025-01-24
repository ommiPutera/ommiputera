import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

import Br from "~/components/br";
import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";
import { DropdownMenuSeparator } from "~/components/ui/dropdown-menu";

import { getProjectPosts, TProject } from "~/data/project";

import { getBase64Image } from "~/utils/getImageBlur";

export const metadata = {
  title: "The Ommi Putera Projects",
  description: "",
};

export default async function ProjectsPage() {
  const projects = getProjectPosts();
  return (
    <ShellPage withBack title="Projects">
      <Section>
        <div className="overflow-hidden relative m-4 md:mb-0 md:p-6 md:rounded-xl flex justify-between items-start md:mt-0 max-w-lg md:mx-auto">
          <div className="flex-1">
            <h1 className="relative z-10 text-lg md:text-2xl font-bold">
              Projects
            </h1>
            <ContentParagraph className="text-sm mt-2 max-w-56 md:max-w-72">
              A glimpses of my work
            </ContentParagraph>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-3 md:gap-4 mt-8 md:mt-6 mb-4 md:mb-0">
          {projects.map((post) => {
            return <Project key={post.slug} {...post} />;
          })}
        </div>
        <Br />
      </Section>
    </ShellPage>
  );
}

async function Project({ slug, coverPath, title, summary }: TProject) {
  return (
    <Link
      href={`/${slug}`}
      className="rounded-xl w-full relative cursor-pointer overflow-hidden block h-full border dark:border-neutral-800"
    >
      <Image
        alt=""
        src={coverPath}
        width={1000}
        height={1000}
        priority
        placeholder="blur"
        blurDataURL={await getBase64Image(coverPath)}
        className="h-[calc(100vw_/_1.9)] md:h-[calc(var(--shell-page-width)_/_2)] object-cover rounded-xl border-b dark:border-neutral-800"
      />
      <div className="p-5 md:px-6 md:py-0 max-w-md md:my-12 md:mx-auto prose dark:prose-invert">
        <h2 className="text-sm md:text-base font-bold w-full hover:underline">
          {title}
        </h2>
        <p className="text-xs md:text-sm font-normal md:font-medium text-neutral-500 dark:text-neutral-300 inline-flex flex-col gap-2">
          {summary}
        </p>
        <p className="text-xs font-semibold inline-flex gap-2 not-prose items-center dark:text-blue-400">
          <span>Read more</span>
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
        </p>
      </div>
    </Link>
  );
}
