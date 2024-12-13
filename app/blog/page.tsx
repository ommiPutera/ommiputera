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
  description: "",
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
    <ShellPage withHome withBack>
      <Section>
        <div className="my-4 overflow-hidden relative">
          <h1 className="relative z-10 text-2xl md:text-3xl text-center font-sans font-bold mb-2">
            The Blog
          </h1>
          <ContentParagraph className="text-center text-sm md:text-base mx-6 md:mx-24 mt-1">
            I write about the React ecosystem, TypeScript, and the lessons
            I&apos;ve learned while tackling real-world challenges.
          </ContentParagraph>
        </div>
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
        "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 mx-1.5 md:mx-4",
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
  summary,
  title,
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
      className={cn(
        "rounded-xl bg-white dark:bg-background w-full cursor-pointer block h-full overflow-hidden border border-neutral-200 dark:border-neutral-800",
        i % 3 === 0 && i >= 2 ? "md:col-span-2" : "md:col-span-1",
      )}
    >
      <div className="relative rounded-xl">
        <Image
          alt=""
          src={image}
          width={600}
          height={600}
          placeholder="blur"
          blurDataURL={await getBase64RemoteImage(image)}
          className="object-cover rounded-xl h-[320px] w-full"
        />
        <div className="absolute bottom-0 from-neutral-950 rounded-xl to-transparent bg-gradient-to-t w-full h-1/2"></div>
      </div>
      <div className="p-9 md:p-4 prose dark:prose-invert">
        <h2 className="text-lg font-bold w-full leading-7">{title}</h2>
        <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-neutral-300 inline-flex flex-col gap-2">
          <span>{formatDate(publishedAt)}</span>
          <span>{summary}</span>
        </p>
      </div>
    </Link>
  );
}
