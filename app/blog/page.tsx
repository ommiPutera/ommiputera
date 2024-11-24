import { PenLine } from "lucide-react";

import Image from "next/image";

import { getBlogPosts, Metadata } from "~/data/blog";

import { formatDate } from "~/lib/utils";

import Br from "~/components/br";
import Content from "~/components/content";
import ReadMore from "~/components/read-more";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

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
      <div>
        <Blog />
        {blogs.map((post, index) => {
          const slug = post.slug;
          const source = post.source;
          return (
            <BlogItem
              key={post.slug}
              source={source}
              slug={slug}
              isTheLastItem={index === blogs.length - 1}
              {...(post.metadata as Metadata)}
            />
          );
        })}
      </div>
    </ShellPage>
  );
}

function Blog() {
  return (
    <Section withConnector>
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
      </Content>
    </Section>
  );
}

function BlogItem({
  slug,
  isTheLastItem,
  publishedAt,
  image,
  summary,
  title,
}: {
  slug: string;
  source: string;
  isTheLastItem: boolean;
  id?: string;
} & Metadata) {
  return (
    <Section
      href={`/blog/${slug}`}
      withConnector={!isTheLastItem}
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
        <PenLine className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <Content title={title} description={formatDate(publishedAt)}>
        <p className="text-sm font-normal  leading-5">{summary}</p>
        {image && (
          <div>
            <Br />
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-4 overflow-hidden">
              <Image src={image} width={800} height={400} alt="" />
            </div>
          </div>
        )}
      </Content>
      <ReadMore href={`/blog/${slug}`} />
    </Section>
  );
}
