import { ExtractedContent, Post } from "./index.types.ts";
import {
  createExtractor,
  Format,
  Parser,
  test,
} from "$std/front_matter/mod.ts";
import { parse as parseYAML } from "$std/yaml/parse.ts";
import { render } from "$gfm/mod.ts";

const extractYAML = createExtractor({ [Format.YAML]: parseYAML as Parser });

export async function loadPost(slug: string): Promise<Post | null> {
  const raw: string | null = await Deno.readTextFile(
    `./content/posts/${slug}.md`,
  ).catch(() => null);

  if (raw === null || !raw) return null;
  if (!test(raw)) return null;

  const { body, attrs }: ExtractedContent = extractYAML<{ title: string }>(raw);
  const post: Post = {
    slug: `/posts/${slug}/`,
    title: attrs.title,
    body: render(body),
    date: new Date(attrs.date as string),
    excerpt: attrs.excerpt,
  };

  return post;
}

export async function listPosts(): Promise<Post[]> {
  const posts: Promise<Post | null>[] = [];

  for await (const entry of Deno.readDir("./content/posts/")) {
    const { name } = entry;
    const [id] = name.split(".");

    posts.push(loadPost(id));
  }

  return await Promise.all(posts) as Post[];
}
