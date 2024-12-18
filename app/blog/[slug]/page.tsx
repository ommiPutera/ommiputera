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
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2 md:px-12 mx-6">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
              {post.metadata.title}
            </h1>
            <p className="text-sm md:text-base font-normal text-neutral-600 dark:text-neutral-300">
              {post.metadata.description}
            </p>
          </div>
          <div className="flex px-6 gap-2 pt-2 md:pt-0 md:pb-4 md:px-20">
            <div className="w-fit max-w-10">
              <Image
                src="/images/profile.jpeg"
                width={1000}
                height={1000}
                alt=""
                priority
                className="object-cover h-10 w-10 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
              />
            </div>
            <div className="w-fit">
              <ContentTitle
                title="Ommi Putera"
                description={formatDate(post.metadata.publishedAt)}
              />
            </div>
          </div>
          <div className="w-full my-4">
            <div className="rounded-xl overflow-hidden">
              <Image
                src={post.metadata.image}
                width={1000}
                height={1000}
                alt=""
                priority
                placeholder="blur"
                blurDataURL={await getBase64RemoteImage(post.metadata.image)}
                className="h-[480px] md:h-[340px] object-cover"
              />
            </div>
          </div>
        </div>
        <div className="block">
          <article
            className="prose dark:prose-invert mt-6 mx-6 md:mx-auto max-w-[422px] mb-6 font-medium"
            dangerouslySetInnerHTML={{ __html: post.source }}
          ></article>
        </div>
      </Section>
    </ShellPage>
  );
}
