import Image from "next/image";
import Link from "next/link";

import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";
import { DropdownMenuSeparator } from "~/components/ui/dropdown-menu";

import { getShortPosts, Metadata } from "~/data/short";

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
    <ShellPage withBack>
      <Section>
        <div className="overflow-hidden relative mx-4 md:p-6 md:rounded-2xl flex justify-between items-start mt-4 md:mt-0 max-w-lg md:mx-auto">
          <div className="max-w-xs flex-1">
            <h1 className="relative z-10 text-lg md:text-2xl font-bold">
              Short
            </h1>
            <ContentParagraph className="text-sm mt-2 max-w-56 md:max-w-72">
              This is a collection of short notes of the things I have learned
              on the daily while working with React ecosystem.
            </ContentParagraph>
          </div>
          <div className="border rounded-full bg-neutral-100">
            <Image
              src="/images/profile.jpeg"
              width={200}
              height={200}
              alt=""
              className="object-cover h-[60px] w-[60px] md:h-[70px] md:w-[70px] overflow-hidden rounded-full"
            />
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
      <div className="px-4 py-2.5 md:px-6 md:py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {publishedAt}
        </p>
        <p className="text-sm font-semibold">{title}</p>
      </div>
    </Link>
  );
}
