import { FolderOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Br from "~/components/br";
import Content, { ContentLink, ContentParagraph } from "~/components/content";
import Section, { SectionAvatar } from "~/components/section";
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
      <SectionAvatar>
        <Image
          src="/images/profile.jpeg"
          width={40}
          height={40}
          alt=""
          className="object-cover overflow-hidden rounded-full"
        />
      </SectionAvatar>
      <Content title="Featured Blog Posts" description="Ommi Putera">
        <ContentParagraph>
          <span>
            I love sharing my writing about the React ecosystem, TypeScript, and
            the lessons I&apos;ve learned while building real-world
            applications.
          </span>
        </ContentParagraph>
        <Br />
        <ContentLink href="/blog" text="View all" />
        <Br />
        <Blogs />
      </Content>
    </Section>
  );
}

async function Blogs() {
  const posts = await getBlogPosts();

  const blogs = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt))
      return -1;
    return 1;
  });
  return (
    <Carousel>
      <CarouselContent overflowVisible className="-ml-1.5 md:-ml-2">
        {blogs.slice(0, 3).map((post) => {
          const slug = post.slug;
          return (
            <BlogItem
              key={post.slug}
              slug={slug}
              {...(post.metadata as Metadata)}
            />
          );
        })}
        <CarouselItem className="pl-1.5 md:pl-2 overflow-hidden max-h-full max-w-[300px]">
          <Link
            href="/blog"
            className="rounded-xl border bg-background w-full cursor-pointer flex flex-col justify-center items-center h-full overflow-hidden border-blue-600 dark:border-blue-400"
          >
            <div className="flex flex-col justify-center items-center gap-4 px-4 h-full text-neutral-600 dark:text-neutral-100">
              <FolderOpen className="h-8 w-8 stroke-1" />
              <p className="text-sm text-center w-full max-w-[200px]">
                Want to dive into more? View all my writings here!
              </p>
            </div>
          </Link>
        </CarouselItem>
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
      className="pl-1.5 md:pl-2 overflow-hidden max-h-full max-w-[300px]"
      key={image}
    >
      <Link
        href={`/blog/${slug}`}
        className="rounded-xl border w-full cursor-pointer block h-full overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-background"
      >
        <div className="relative">
          <Image
            src={image}
            width={600}
            height={600}
            alt=""
            className="object-cover overflow-hidden h-[380px] w-full"
          />
          <div className="absolute bottom-0 from-neutral-950 to-transparent bg-gradient-to-t w-full h-1/2 dark:h-full"></div>
          <h2 className="absolute z-10 bottom-6 py-3 px-6 text-xl font-extrabold leading-7 text-neutral-50 text-center w-full">
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
