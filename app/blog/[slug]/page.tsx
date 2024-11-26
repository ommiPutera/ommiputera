import Image from "next/image";
import { notFound } from "next/navigation";

import { ContentTitle } from "~/components/content";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

import { getBlogPosts, getPost } from "~/data/blog";
import { DATA } from "~/data/resume";

import { formatDate } from "~/lib/utils";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
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
    <ShellPage title="Blog" withHome withBack>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <Section>
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 md:pb-7">
          <div className="w-full max-w-10">
            <Image
              src="/images/profile.jpeg"
              width={40}
              height={40}
              alt=""
              className="object-cover overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800"
            />
          </div>
          <div className="w-full">
            <ContentTitle
              title="Ommi Putera"
              description={formatDate(post.metadata.publishedAt)}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2 mx-5 md:mx-12">
            <h2 className="text-2xl font-extrabold tracking-tight">
              {post.metadata.title}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-5">
              {post.metadata.summary}
            </p>
          </div>
          <div className="w-full">
            <div className="rounded-xl overflow-hidden">
              <Image
                src={post.metadata.image}
                width={800}
                height={40}
                alt=""
                className="h-[440px] md:h-[340px] object-cover"
              />
            </div>
          </div>
        </div>
        <article
          className="prose dark:prose-invert mt-6 mx-5 md:mx-12"
          dangerouslySetInnerHTML={{ __html: post.source }}
        ></article>
      </Section>
    </ShellPage>
  );
}
