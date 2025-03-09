import rehypeShiki from "@shikijs/rehype";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";

import { calculateReadingTime } from "~/utils/calculateReadingTime";

export type Metadata = {
  title: string;
  publishedAt: string;
  description: string;
  image: string;
  bannerCredit: string;
  language: string;
  readingTime: number;
};

export type BlogPost = {
  source: string;
  metadata: Metadata;
  slug: string;
};

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

let highlighter: HighlighterCore | null = null;

async function getHighlighter() {
  if (highlighter) return highlighter;

  const [themes, langs] = await Promise.all([
    import("@shikijs/themes/vitesse-light").then((mod) => mod.default),
    import("@shikijs/langs/javascript").then((mod) => mod.default),
  ]);

  highlighter = await createHighlighterCore({
    themes: [themes],
    langs: [langs],
    engine: createOnigurumaEngine(() => import("shiki/wasm")),
  });

  return highlighter;
}

export async function markdownToHTML(markdown: string): Promise<string> {
  const highlighterInstance = await getHighlighter();
  
  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      highlighter: highlighterInstance,
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
      transformers: [
        transformerNotationHighlight({
          matchAlgorithm: "v3",
        }),
        transformerNotationDiff({
          matchAlgorithm: "v3",
        }),
      ],
    })
    .use(rehypeStringify)
    .process(markdown);

  return processed.toString();
}

export async function getPost(
  slug: string,
  language: string = "en",
): Promise<BlogPost> {
  const filePath = path.join("content", "blog", language, `${slug}.mdx`);
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

async function getAllPosts(dir: string, language: string): Promise<BlogPost[]> {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      return getPost(slug, language);
    }),
  );
}

export async function getBlogPosts(
  language: string = "en",
): Promise<BlogPost[]> {
  const languageDir = path.join(process.cwd(), "content", "blog", language);
  return getAllPosts(languageDir, language);
}
