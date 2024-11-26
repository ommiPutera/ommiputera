
import Image from "next/image";
import Link from "next/link";

import { ContentTitle } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getBlogPosts, Metadata } from "~/data/blog";

import { formatDate } from "~/lib/utils";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
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
    <ShellPage title="Blog" withHome withBack>
      <Section>
        <div className="flex gap-2">
          <div className="w-full max-w-10">
            <Image
              src="/images/profile.jpeg"
              width={40}
              height={40}
              alt=""
              className="object-cover overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
            />
          </div>
          <div className="w-full">
            <ContentTitle
              title="The Blog"
              description="Thoughts, mental models, and tutorials about front-end development."
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-4">
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
      </Section>
    </ShellPage>
  )
}

function Blog({
  slug,
  publishedAt,
  image,
  summary,
  title,
}: {
  slug: string;
  source: string;
  id?: string;
} & Metadata) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="rounded-xl w-full cursor-pointer block h-full overflow-hidden border shadow"
    >
      <div className="relative">
        <Image
          src={image}
          width={600}
          height={600}
          alt=""
          className="object-cover overflow-hidden h-[300px] md:h-[350px]"
        />
        <div className="absolute bottom-0 from-neutral-950 to-transparent bg-gradient-to-t w-full h-1/2"></div>
      </div>
      <div className="p-4  border-neutral-200 dark:border-neutral-700">
        <h2 className="text-lg font-bold mb-2 w-full">
          {title}
        </h2>
        <p className="text-xs md:text-sm font-normal text-neutral-400 dark:text-neutral-500 leading-5 mb-1">
          {formatDate(publishedAt)}
        </p>
        <p className="text-xs md:text-sm leading-4 font-normal text-neutral-600 dark:text-neutral-300 md:leading-5">
          {summary}
        </p>
      </div>
    </Link>
  )
}