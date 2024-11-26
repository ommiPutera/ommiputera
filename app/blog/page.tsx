import Image from "next/image";
import Link from "next/link";
import Br from "~/components/br";

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
            <ContentTitle title="Blog" description="Ommi Putera" />
          </div>
        </div>
        <p className="text-sm font-normal leading-5">
          I share what I&apos;ve been working on, the challenges I&apos;ve
          tackled, and the stuff I&apos;m still figuring out. It&apos;s a mix of
          lessons learned and things I&apos;m exploring along the way.
        </p>
        <Br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
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
  );
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
      prefetch
      className="rounded-xl w-full cursor-pointer block h-full md:max-w-[274px] overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow"
    >
      <div className="relative">
        <Image
          src={image}
          width={600}
          height={600}
          alt=""
          className="object-cover overflow-hidden h-[300px] w-full"
        />
        <div className="absolute bottom-0 from-neutral-950 to-transparent bg-gradient-to-t w-full h-1/2"></div>
      </div>
      <div className="p-4 border-neutral-200 dark:border-neutral-800">
        <h2 className="text-ms font-bold mb-1.5 w-full">{title}</h2>
        <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-neutral-300 leading-5 mb-1">
          {formatDate(publishedAt)}
        </p>
        <p className="text-xs md:text-sm leading-4 font-normal text-neutral-600 dark:text-neutral-100 md:leading-5">
          {summary}
        </p>
      </div>
    </Link>
  );
}
