import { PenLine } from "lucide-react";
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
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <PenLine className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title="Blog">
        <p className="text-sm font-normal  leading-5">
          Find the latest of my writing here.
        </p>
        <Br />
        <p className="text-sm font-normal  leading-5">
          My blog is a work in progress. I&apos;m looking forward to sharing my
          thoughts and insights soon. 💪
        </p>
        <p className="text-sm font-normal leading-5">
          <Link
            href="/blog"
            className="font-medium text-blue-700 dark:text-blue-500 hover:underline"
          >
            Show more
          </Link>
        </p>
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
      <CarouselContent overflowVisible className="-ml-1 md:-ml-2">
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
      className="pl-1 md:pl-2 overflow-hidden max-h-[600px] max-w-[600px]"
      key={image}
    >
      <Link
        href={`/blog/${slug}`}
        className="rounded-xl border w-full cursor-pointer block h-full overflow-hidden border-neutral-100 dark:border-neutral-800"
      >
        <div className="relative">
          <Image
            src={image}
            width={600}
            height={600}
            alt=""
            className="object-cover overflow-hidden"
          />
          <div className="absolute bottom-0 from-neutral-950 to-transparent bg-gradient-to-t w-full h-1/2"></div>
          <h2 className="absolute bottom-2 py-3 px-6 text-base font-bold md:text-xl text-neutral-200 text-center w-full">
            {title}
          </h2>
        </div>
        <div className="p-3 border-t border-neutral-100 dark:border-neutral-800">
          <p className="text-xs md:text-sm font-semibold text-neutral-400 dark:text-neutral-500 leading-5 mb-1">
            {formatDate(publishedAt)}
          </p>
          <p className="text-xs md:text-sm leading-4 font-normal text-neutral-600 dark:text-neutral-300 md:leading-5">
            {summary}
          </p>
        </div>
      </Link>
    </CarouselItem>
  );
}
