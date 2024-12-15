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

import { getBase64RemoteImage } from "~/utils/getImageBlur";

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
      <Content title="My featured blog posts" description="Ommi Putera - Blog">
        <ContentParagraph className="inline">
          <span>
            I write about the web development and the lessons I&apos;ve learned.
          </span>
        </ContentParagraph>{" "}
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
  const blurredImages = await Promise.all(
    blogs
      .slice(0, 3)
      .map((blog) => getBase64RemoteImage(blog?.metadata?.image)),
  );
  return (
    <Carousel
      opts={{ loop: false, skipSnaps: true, containScroll: "trimSnaps" }}
    >
      <CarouselContent overflowVisible className="-ml-1">
        {blogs.slice(0, 3).map((post, index) => {
          const slug = post.slug;
          return (
            <BlogItem
              key={post.slug}
              slug={slug}
              blurredImages={blurredImages}
              index={index}
              {...(post.metadata as Metadata)}
            />
          );
        })}
        <CarouselItem className="pl-1 overflow-hidden max-h-full max-w-[250px]">
          <Link
            href="/blog"
            className="rounded-xl border w-full cursor-pointer flex flex-col justify-center items-center h-full overflow-hidden border-neutral-300 dark:border-neutral-700"
          >
            <div className="flex flex-col justify-center items-center gap-4 px-4 h-full text-neutral-600 dark:text-neutral-50">
              <FolderOpen className="h-8 w-8" />
              <p className="text-xs text-center w-full max-w-[150px] font-semibold">
                Read the blog
              </p>
            </div>
          </Link>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

function BlogItem({
  slug,
  blurredImages,
  publishedAt,
  image,
  title,
  index,
}: { slug: string; blurredImages: string[]; index: number } & Metadata) {
  return (
    <CarouselItem
      className="pl-1 overflow-hidden max-h-full max-w-[250px]"
      key={image}
    >
      <Link
        href={`/blog/${slug}`}
        className="rounded-xl border w-full cursor-pointer block h-full overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-background"
      >
        <div className="relative rounded-xl overflow-hidden">
          <Image
            alt=""
            src={image}
            width={1000}
            height={1000}
            placeholder="blur"
            blurDataURL={blurredImages[index]}
            className="object-cover overflow-hidden h-[380px] w-full"
          />
          <div className="absolute bottom-0 from-neutral-950 to-transparent bg-gradient-to-t w-full h-1/2 dark:h-full"></div>
          <div className="absolute z-10 bottom-6 py-3 px-6 text-center w-full">
            <p className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
              <span>{formatDate(publishedAt)}</span>
            </p>
            <h2 className="text-lg font-extrabold leading-7 text-neutral-50 w-full">
              {title}
            </h2>
          </div>
        </div>
      </Link>
    </CarouselItem>
  );
}
