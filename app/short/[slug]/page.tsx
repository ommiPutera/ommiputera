import { Metadata } from "next";
import { notFound } from "next/navigation";

import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getPost, getShortPosts } from "~/data/short";

import { formatDate } from "~/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getShortPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  let language;
  switch (slug.split("-")[0]) {
    case "id":
      language = "id";
      break;
    default:
      language = "en";
      break;
  }
  const post = await getPost(slug, language);
  return {
    title: post.metadata.title,
  };
}

export default async function Short({ params }: Props) {
  const { slug } = await params;

  let language;
  switch (slug.split("-")[0]) {
    case "id":
      language = "id";
      break;
    default:
      language = "en";
      break;
  }
  const post = await getPost(slug, language);

  if (!post) {
    notFound();
  }
  return (
    <ShellPage withBack>
      <Section>
        <div className="mt-4 md:mt-0 flex flex-col gap-4">
          <div className="flex flex-col gap-1 px-4 md:px-0">
            <h2 className="text-xl md:text-2xl font-extrabold leading-tight">
              {post.metadata.title}
            </h2>
            <p className="text-xs text-muted-foreground font-medium mt-1 md:mt-0">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
        </div>
        <div className="block">
          <article
            className="prose dark:prose-invert text-sm mt-4 mx-4 md:mx-auto max-w-[572px] mb-4 md:mb-0 font-normal md:font-medium"
            dangerouslySetInnerHTML={{ __html: post.source }}
          ></article>
        </div>
      </Section>
    </ShellPage>
  );
}
