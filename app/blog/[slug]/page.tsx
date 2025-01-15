import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ContentTitle } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getBlogPosts, getPost } from "~/data/blog";

import { formatDate } from "~/lib/utils";

import { getBase64RemoteImage } from "~/utils/getImageBlur";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPost(slug);
  return {
    title: post.metadata.title,
  };
}

export default async function Blog({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }
  return (
    <ShellPage withBack>
      <Section>
        <div className="mt-4 md:mt-0 flex flex-col gap-4">
          <div className="flex flex-col gap-1 px-4">
            <h2 className="text-xl md:text-2xl font-bold leading-tight">
              {post.metadata.title}
            </h2>
            <h3 className="text-sm text-muted-foreground font-semibold mt-1 md:mt-0">
              {formatDate(post.metadata.publishedAt)}
            </h3>
          </div>
          <div className="w-full my-4">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src={post.metadata.image}
                width={1000}
                height={1000}
                alt=""
                priority
                placeholder="blur"
                blurDataURL={await getBase64RemoteImage(post.metadata.image)}
                className="h-[420px] object-cover"
              />
            </div>
          </div>
          <div className="flex gap-2 px-4">
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
                description="Software Engineer (Web)"
              />
            </div>
          </div>
        </div>
        <div className="block">
          <article
            className="prose dark:prose-invert text-sm mt-4 mx-4 md:mx-auto max-w-[572px] mb-4 font-normal md:font-medium"
            dangerouslySetInnerHTML={{ __html: post.source }}
          ></article>
        </div>
      </Section>
    </ShellPage>
  );
}
