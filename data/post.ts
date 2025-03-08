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
  // ...
} from "@shikijs/transformers";

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

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join("content", "post", `${slug}.mdx`);

  try {
    const source = fs.readFileSync(filePath, "utf-8");
    const { content: rawContent, data } = matter(source);

    const metadata: Metadata = {
      title: data.title || "Untitled",
      publishedAt: data.publishedAt || new Date().toISOString(),
      readingTime: calculateReadingTime(rawContent),
      description: data.description || "",
      showMore: data.showMore ?? false,
      parent: data.parent || "",
      groupCode: data.groupCode || "",
    };

    const content = await markdownToHTML(rawContent);

    return {
      source: content,
      metadata,
      slug,
    };
  } catch (error) {
    console.error(`Error reading post: ${slug}`, error);
    return null;
  }
}

async function getAllPosts(dir: string): Promise<Post[]> {
  if (!fs.existsSync(dir)) return [];

  const mdxFiles = getMDXFiles(dir);
  const posts = await Promise.all(
    mdxFiles.map(async (file) => getPost(path.basename(file, ".mdx"))),
  );

  return posts.filter((post): post is Post => post !== null);
}

export async function getPosts(): Promise<Post[]> {
  const dir = path.join(process.cwd(), "content", "post");
  return getAllPosts(dir);
}
