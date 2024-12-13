import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

import Br from "~/components/br";
import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getProjectPosts, TProjectPosts } from "~/data/project";

import { getBase64Image } from "~/utils/getImageBlur";

export const metadata = {
  title: "The Ommi Putera Projects",
  description: "",
};

export default async function ProjectsPage() {
  const projects = getProjectPosts();
  return (
    <ShellPage withHome withBack>
      <Section>
        <div className="my-4 overflow-hidden relative">
          <h1 className="relative z-10 text-2xl md:text-3xl text-center font-sans font-bold mb-2">
            Projects
          </h1>
          <ContentParagraph className="text-center text-sm md:text-base mx-6 md:mx-24 mt-1">
            Showcase of my latest projects. They&apos;re sure to catch your eye!
          </ContentParagraph>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 mx-1.5 md:mx-4">
          {projects.map((post) => {
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

async function Project({ slug, imageSource, title, summary }: TProjectPosts) {
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
        className="min-h-[240px] h-full md:h-[340px] object-cover rounded-xl border-b dark:border-neutral-800"
      />
      <div className="p-5 md:p-0 max-w-[380px] md:my-6 md:mx-auto group prose dark:prose-invert">
        <h2 className="text-sm md:text-base font-bold w-full hover:underline">
          {title}
        </h2>
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
