import Image from "next/image";
import Link from "next/link";

import Br from "~/components/br";
import Content from "~/components/content";
import Section from "~/components/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

import { getBlogPosts, Metadata } from "~/data/blog";

import { formatDate } from "~/lib/utils";

export default function Blog() {
  return (
    <Section>
      <div className="w-full max-w-10">
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
        />
      </div>
      <Content title="Blog" description="Ommi Putera">
        <p className="text-sm prose dark:prose-invert">
          I share what I&apos;ve been working on, the challenges I&apos;ve
          tackled, and the stuff I&apos;m still figuring out. It&apos;s a mix of
          lessons learned and things I&apos;m exploring along the way.{" "}
          <Link
            href="/blog"
            className="font-medium text-blue-700 dark:text-blue-500 hover:underline"
          >
            View all
          </Link>
        </p>
        <Br />
        <Blogs />
      </Content>
    </Section>
  );
}

async function Blogs() {
  const posts = await getBlogPosts();

  const blogs = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
  return (
    <Carousel>
      <CarouselContent overflowVisible className="-ml-1.5 md:-ml-2">
        {blogs.map((post) => {
          const slug = post.slug;
          return (
            <BlogItem
              key={post.slug}
              slug={slug}
              {...(post.metadata as Metadata)}
            />
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}

function BlogItem({
  publishedAt,
  image,
  slug,
  summary,
  title,
}: { slug: string } & Metadata) {
  return (
    <CarouselItem
      className="pl-1.5 md:pl-2 overflow-hidden max-h-full max-w-[274px]"
      key={image}
    >
      <Link
        href={`/blog/${slug}`}
        prefetch
        className="rounded-xl border w-full cursor-pointer block h-full overflow-hidden border-neutral-200 dark:border-neutral-800 bg-background"
      >
        <div className="relative">
          <Image
            src={image}
            width={600}
            height={600}
            alt=""
            className="object-cover overflow-hidden h-[320px] w-full"
          />
          <div className="absolute bottom-0 from-neutral-950 to-transparent bg-gradient-to-t w-full h-1/2 dark:h-full"></div>
          <h2 className="absolute z-10 top-1/2 py-3 px-6 text-xl font-bold text-neutral-50 text-center w-full">
            {title}
          </h2>
        </div>
        <div className="p-4 border-neutral-200 dark:border-neutral-800 prose dark:prose-invert">
          <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-neutral-300 inline-flex flex-col gap-2">
            <span>{formatDate(publishedAt)}</span>
            <span>{summary}</span>
          </p>
        </div>
      </Link>
    </CarouselItem>
  );
}
