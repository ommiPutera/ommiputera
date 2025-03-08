import Link from "next/link";

import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";
import { DropdownMenuSeparator } from "~/components/ui/dropdown-menu";

import { getShortPosts, Metadata } from "~/data/short";

import { formatDate } from "~/lib/utils";

export const metadata = {
  title: "The Ommi Putera Short",
};

export default async function ShortPage() {
  const posts = await getShortPosts();

  const shorts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
  return (
    <ShellPage withBack title="Short">
      <Section>
        <div className="overflow-hidden relative m-4 md:mb-0 md:p-6 md:rounded-xl flex justify-between items-start md:mt-0 max-w-lg md:mx-auto">
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="relative z-10 text-lg md:text-2xl font-bold">
              Short
            </h1>
            <ContentParagraph className="text-sm mt-2 md:max-w-72">
              This is a collection of short notes of the things I have learned
              on the daily.
            </ContentParagraph>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="mt-8 md:mt-6 mb-4 md:mb-0">
          {shorts.map((post) => {
            const slug = post.slug;
            const source = post.source;
            return (
              <Short
                key={post.slug}
                source={source}
                slug={slug}
                {...(post.metadata as Metadata)}
              />
            );
          })}
        </div>
      </Section>
    </ShellPage>
  );
}

async function Short({
  slug,
  publishedAt,
  title,
}: {
  slug: string;
  source: string;
  id?: string;
} & Metadata) {
  return (
    <Link href={`/short/${slug}`} prefetch>
      <div className="px-4 py-6 md:px-6 rounded-xl border hover:bg-neutral-100 dark:hover:bg-neutral-800">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {formatDate(publishedAt)}
        </p>
        <p className="text-sm font-bold mt-1">{title}</p>
      </div>
    </Link>
  );
}
