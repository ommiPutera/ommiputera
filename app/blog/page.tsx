import { PenLine } from "lucide-react";

import { getBlogPosts } from "~/data/blog";

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
    <ShellPage withHome withBack>
      <div>
        <Blog />
        {blogs.map((post, index) => {
          const title = post.metadata.title;
          const slug = post.slug;
          const publishedAt = post.metadata.publishedAt;
          return (
            <BlogItem
              key={post.slug}
              title={title}
              slug={slug}
              publishedAt={publishedAt}
              isTheLastItem={index === blogs.length - 1}
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
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
        <PenLine className="w-5 h-5" />
      </div>
      <Content title="Blog">
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Find the latest of my writing here.
        </p>
      </Content>
    </Section>
  );
}

function BlogItem({
  title,
  slug,
  publishedAt,
  isTheLastItem,
}: {
  title: string;
  slug: string;
  publishedAt: string;
  isTheLastItem: boolean;
}) {
  return (
    <Section
      href={`/blog/${slug}`}
      withConnector={!isTheLastItem}
      className="pt-0 md:pt-0"
      connectorClassName="top-0 h-[calc(100%_-_0px)]"
    >
      <div className="border border-neutral-200 dark:border-neutral-800 h-10 w-10 flex justify-center items-center rounded-full">
        <PenLine className="w-5 h-5" />
      </div>
      <Content title={title} description={publishedAt}>
        <p className="text-xs md:text-sm font-normal text-accent-foreground leading-5">
          Improve the accuracy and efficiency of image recognition technology.
          By creating our own tools, we can customize the annotation process to
          fit the specific needs and requirements, rather than relying on
          third-party tools.
        </p>
      </Content>
      <ReadMore href={`/blog/${slug}`} />
    </Section>
  );
}
