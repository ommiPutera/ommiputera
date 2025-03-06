import { Metadata } from "next";
import Link from "next/link";

import { OmmiAvatar } from "~/components/avatar";
import Content, { ContentParagraph } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getPosts } from "~/data/post";
import { cn, formatDate } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Ommi Putera",
  description: "",
};

type MetadataType = {
  title: string;
  publishedAt: string;
  readingTime: number;
  description: string;
  showMore: boolean;
  parent: string;
  groupCode: string;
};

type PostType = {
  source: string;
  metadata: MetadataType;
  slug: string;
};

export default async function About() {
  const posts: PostType[] = await getPosts();

  const postsMapped = posts.sort((a, b) => {
    if (a.metadata.groupCode !== b.metadata.groupCode) {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    }
    return a.metadata.parent.localeCompare(b.metadata.parent);
  });

  return (
    <ShellPage>
      <div>
        {postsMapped.map((post, index) => {
          if (!post.metadata.showMore) {
            return (
              <Section className="cursor-pointer" key={post.slug}>
                <OmmiAvatar />
                <Content title={post.metadata.title}>
                  <p className="text-xs text-neutral-500">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                  <ContentParagraph>
                    {post.metadata.description}
                  </ContentParagraph>
                </Content>
              </Section>
            );
          }

          return (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <Section
                className={cn(
                  "cursor-pointer",
                  postsMapped[index - 1]?.slug === post.metadata.parent &&
                    "!pt-0",
                )}
                withConnector={
                  !!post.metadata.groupCode &&
                  postsMapped[index + 1]?.metadata.groupCode ===
                    post.metadata.groupCode
                }
              >
                <OmmiAvatar />
                <Content title={post.metadata.title}>
                  <p className="text-xs text-neutral-500">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                  <ContentParagraph>
                    {post.metadata.description}
                  </ContentParagraph>
                  <ContentParagraph>
                    <span className="text-sm cursor-pointer font-semibold text-blue-600 dark:text-blue-400 underline">
                      Show more
                    </span>
                  </ContentParagraph>
                </Content>
              </Section>
            </Link>
          );
        })}
      </div>
    </ShellPage>
  );
}
