import Image from "next/image";
import Link from "next/link";

import Br from "~/components/br";
import { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

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
    <ShellPage withBack>
      <Section>
        <div className="overflow-hidden relative mx-4 md:border md:p-6 md:rounded-2xl flex justify-between items-start mt-4 md:mt-6 max-w-lg md:mx-auto">
          <div className="max-w-xs flex-1">
            <h1 className="relative z-10 text-lg md:text-2xl font-bold">
              Blog
            </h1>
            <ContentParagraph className="text-sm mt-2 max-w-56 md:max-w-xs">
              I write about web development, sharing insights and lessons
              learned.
            </ContentParagraph>
          </div>
          <div className="border rounded-full bg-neutral-100">
            <Image
              src="/images/profile.jpeg"
              width={200}
              height={200}
              alt=""
              className="object-cover h-[60px] w-[60px] md:h-[80px] md:w-[80px] overflow-hidden rounded-full"
            />
          </div>
        </div>
        <div className="mt-8 md:mt-12">
          <BentoGrid>
            {blogs.map((post, index) => {
              const slug = post.slug;
              const source = post.source;
              return (
                <BentoBlog
                  key={post.slug}
                  source={source}
                  slug={slug}
                  index={index}
                  {...(post.metadata as Metadata)}
                />
              );
            })}
          </BentoGrid>
        </div>
        <Br />
      </Section>
    </ShellPage>
  );
}

const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-3 md:gap-x-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

async function BentoBlog({
  slug,
  publishedAt,
  image,
  title,
  description,
  index,
}: {
  slug: string;
  source: string;
  id?: string;
  index: number;
} & Metadata) {
  const i = index + 1;
  return (
    <Link
      href={`/blog/${slug}`}
      prefetch
      className={cn(
        "rounded-2xl w-full cursor-pointer block h-full border border-neutral-200 dark:border-neutral-800",
        i % 3 === 0 && i >= 2 ? "md:col-span-2" : "md:col-span-1",
      )}
    >
      <div className="relative rounded-2xl">
        <Image
          alt=""
          src={image}
          width={600}
          height={600}
          placeholder="blur"
          blurDataURL={await getBase64RemoteImage(image)}
          className="object-cover rounded-2xl h-[470px] md:h-[440px] w-full"
        />
      </div>
      <div className="px-8 py-6 md:p-6">
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <span>{formatDate(publishedAt)}</span>
        </p>
        <h2 className="mb-1 text-lg leading-tight font-bold w-full mt-3">{title}</h2>
        <p className="text-sm mt-1.5 font-medium text-neutral-600 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
}
