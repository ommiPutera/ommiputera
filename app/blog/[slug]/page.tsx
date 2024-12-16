import Image from "next/image";
import { notFound } from "next/navigation";

import { ContentTitle } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getBlogPosts, getPost } from "~/data/blog";

import { formatDate } from "~/lib/utils";

import { getBase64RemoteImage } from "~/utils/getImageBlur";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }
  return (
    <ShellPage withHome withBack>
      <Section>
        <div className="flex gap-2 border-b border-neutral-200 w-full dark:border-neutral-800 pb-4 pt-2 md:pt-0 md:pb-4 md:px-12">
          <div className="w-fit max-w-10">
            <Image
              src="/images/profile.jpeg"
              width={40}
              height={40}
              alt=""
              className="object-cover overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
            />
          </div>
          <div className="w-fit">
            <ContentTitle
              title="Ommi Putera"
              description={formatDate(post.metadata.publishedAt)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2 md:px-12">
            <h1 className="text-2xl font-extrabold tracking-tight">
              {post.metadata.title}
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 font-normal">
              {post.metadata.description}
            </p>
          </div>
          <div className="w-full">
            <div className="rounded-xl overflow-hidden">
              <Image
                src={post.metadata.image}
                width={800}
                height={40}
                alt=""
                placeholder="blur"
                blurDataURL={await getBase64RemoteImage(post.metadata.image)}
                className="h-[440px] md:h-[340px] object-cover"
              />
            </div>
          </div>
        </div>
        <div className="block">
          <article
            className="prose dark:prose-invert mt-6 md:mx-auto max-w-[422px] mb-6"
            dangerouslySetInnerHTML={{ __html: post.source }}
          ></article>
        </div>
      </Section>
    </ShellPage>
  );
}
