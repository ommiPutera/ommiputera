import { FolderOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { OmmiAvatar } from "~/components/avatar";
import Br from "~/components/br";
import Content, { ContentLink, ContentParagraph } from "~/components/content";
import Section from "~/components/section";
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
      <OmmiAvatar />
      <Content title="Blog" description="Ommi Putera">
        <ContentParagraph>
          I write about web development, sharing insights and lessons learned.
        </ContentParagraph>
        <ContentParagraph>
          <ContentLink href="/blog" text="Show more" />
        </ContentParagraph>
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
        <CarouselItem className="pl-1 overflow-hidden max-h-full max-w-[240px] md:max-w-[270px]">
          <Link
            href="/blog"
            prefetch
            className="rounded-xl border w-full cursor-pointer flex flex-col justify-center items-center h-full overflow-hidden border-neutral-300 dark:border-neutral-700"
          >
            <div className="flex flex-col justify-center items-center gap-4 px-4 h-full text-neutral-600 dark:text-neutral-50">
              <FolderOpen className="h-8 w-8" />
              <p className="text-xs text-center w-full max-w-[110px] font-semibold">
                Find all my writing here
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
  readingTime,
  image,
  title,
  index,
}: { slug: string; blurredImages: string[]; index: number } & Metadata) {
  return (
    <CarouselItem
      className="pl-1 overflow-hidden max-h-full max-w-[230px] md:max-w-[240px]"
      key={image}
    >
      <Link
        href={`/blog/${slug}`}
        prefetch
        className="rounded-2xl border w-full cursor-pointer block h-full overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-background"
      >
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            alt=""
            src={image}
            width={1000}
            height={1000}
            priority
            placeholder="blur"
            blurDataURL={blurredImages[index]}
            className="object-cover overflow-hidden h-[340px] md:h-[380px] w-full"
          />
          <div className="absolute bottom-0 from-neutral-900 to-transparent bg-gradient-to-t w-full h-1/2"></div>
          <div className="absolute z-10 bottom-4 py-3 px-6 text-center w-full">
            <h2 className="text-base leading-tight font-bold text-neutral-50 w-full">
              {title}
            </h2>
            <p className="text-xs font-medium text-neutral-100 dark:text-neutral-200 mt-2">
              <span>
                {readingTime} min read - {formatDate(publishedAt)}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </CarouselItem>
  );
}
