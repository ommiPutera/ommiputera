import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { calculateReadingTime } from "~/utils/calculateReadingTime";

export type Metadata = {
  title: string;
  publishedAt: string;
  readingTime: number;
  description: string;
  showMore: boolean;
  parent: string;
  groupCode: string;
};

export type Post = {
  source: string;
  metadata: Metadata;
  slug: string;
};

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string): Promise<string> {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return processed.toString();
}

export async function getPost(slug: string): Promise<Post> {
  const filePath = path.join("content", "post", `${slug}.mdx`);

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(source);

  const metadata = data as Metadata;

  const readingTime = calculateReadingTime(rawContent);
  const content = await markdownToHTML(rawContent);

  return {
    source: content,
    metadata: { ...metadata, readingTime },
    slug,
  };
}

async function getAllPosts(dir: string): Promise<Post[]> {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      return getPost(slug);
    }),
  );
}

export async function getPosts(): Promise<Post[]> {
  const dir = path.join(process.cwd(), "content", "post");
  return getAllPosts(dir);
}
