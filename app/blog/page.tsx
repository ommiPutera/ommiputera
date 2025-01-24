import Image from "next/image";
import Link from "next/link";

import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";
import { DropdownMenuSeparator } from "~/components/ui/dropdown-menu";

import { getBlogPosts, Metadata } from "~/data/blog";

import { cn, formatDate } from "~/lib/utils";

import { getBase64RemoteImage } from "~/utils/getImageBlur";

export const metadata = {
  title: "The Ommi Putera Blog",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const blogs = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
  return (
    <ShellPage withBack title="Blog">
      <Section>
        <div className="overflow-hidden relative m-4 md:mb-0 md:p-6 md:rounded-xl flex justify-between items-start md:mt-0 max-w-lg md:mx-auto">
          <div className="flex-1">
            <h1 className="relative z-10 text-lg md:text-2xl font-bold">
              Blog
            </h1>
            <ContentParagraph className="text-sm mt-2 max-w-56 md:max-w-72">
              I write about web development, sharing insights and lessons
              learned.
            </ContentParagraph>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="mt-8 md:mt-6 mb-4 md:mb-0">
          <div className="flex flex-col gap-4">
            {blogs.map((post) => {
              const slug = post.slug;
              const source = post.source;
              return (
                <Blog
                  key={post.slug}
                  source={source}
                  slug={slug}
                  {...(post.metadata as Metadata)}
                />
              );
            })}
          </div>
        </div>
      </Section>
    </ShellPage>
  );
}

async function Blog({
  slug,
  publishedAt,
  readingTime,
  image,
  title,
  description,
}: {
  slug: string;
  source: string;
  id?: string;
} & Metadata) {
  return (
    <Link
      href={`/blog/${slug}`}
      prefetch
      className={cn(
        "rounded-2xl w-full flex items-center cursor-pointer h-full border border-neutral-200 dark:border-neutral-800",
      )}
    >
      <div className="relative rounded-2xl w-[90px] md:w-[320px]">
        <Image
          alt=""
          src={image}
          width={600}
          height={600}
          placeholder="blur"
          blurDataURL={await getBase64RemoteImage(image)}
          className="object-cover rounded-2xl h-[342px] w-full md:h-[238px]"
        />
      </div>
      <div className="p-6 md:p-8 w-full">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <span>
            {readingTime} min read - {formatDate(publishedAt)}
          </span>
        </p>
        <h2 className="mb-1 text-lg leading-tight font-extrabold w-full mt-6">
          {title}
        </h2>
        <p className="text-sm mt-2 font-medium text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </Link>
  );
}
