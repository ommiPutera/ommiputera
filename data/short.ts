import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { calculateReadingTime } from "~/utils/calculateReadingTime";

export type Metadata = {
  title: string;
  publishedAt: string;
  language: string;
  readingTime: number;
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
    .use(rehypeShiki, {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    })
    .use(rehypeStringify)
    .process(markdown);

  return processed.toString();
}

export async function getPost(
  slug: string,
  language: string = "id",
): Promise<Post> {
  const filePath = path.join("content", "short", language, `${slug}.mdx`);
  console.log("filePath: ", filePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Post not found for slug "${slug}" in language "${language}"`,
    );
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(source);

  const metadata = data as Metadata;

  const readingTime = calculateReadingTime(rawContent);
  const content = await markdownToHTML(rawContent);

  return {
    source: content,
    metadata: { ...metadata, language, readingTime },
    slug,
  };
}

async function getAllPosts(dir: string, language: string): Promise<Post[]> {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      return getPost(slug, language);
    }),
  );
}

export async function getShortPosts(language: string = "id"): Promise<Post[]> {
  const languageDir = path.join(process.cwd(), "content", "short", language);
  return getAllPosts(languageDir, language);
}
