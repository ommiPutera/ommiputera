import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    slug: post?.slug,
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
    title: post?.metadata?.title,
  };
}

export default async function Blog({ params }: Props) {
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
    <ShellPage withBack title={post.metadata.title}>
      <Section>
        <div className="mt-4 md:mt-0 flex flex-col gap-4">
          <div className="flex flex-col gap-1 px-4 md:px-0">
            <h2 className="text-2xl font-extrabold leading-tight">
              {post.metadata.title}
            </h2>
            <p className="text-xs text-muted-foreground font-normal mt-1 md:mt-0">
              {post?.metadata?.readingTime} min read -{" "}
              {formatDate(post?.metadata?.publishedAt)}
            </p>
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
                className="h-[470px] md:h-[320px] object-cover"
              />
            </div>
            <p className="text-xs mt-2 mb-4 text-muted-foreground px-4 md:px-0">
              Banner Credit: {post.metadata.bannerCredit}
            </p>
          </div>
          <Link href="/about" className="flex gap-2 px-4 md:px-0">
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
          </Link>
        </div>
        <div className="block">
          <article
            className="prose dark:prose-invert text-sm mt-4 mx-4 md:mx-auto max-w-[572px] mb-4 md:mb-0 font-normal md:font-medium"
            dangerouslySetInnerHTML={{ __html: post?.source }}
          ></article>
        </div>
      </Section>
    </ShellPage>
  );
}
