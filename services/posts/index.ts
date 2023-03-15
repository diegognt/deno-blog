import { ExtractedContent, Post } from "./index.types.ts";
import { extract, test } from "$std/encoding/front_matter/any.ts";
import { render } from "$gfm/mod.ts";

export async function loadPost(slug: string): Promise<Post | null> {
  const raw: string | null = await Deno.readTextFile(
    `./content/posts/${slug}.md`,
  ).catch(() => null);

  if (raw === null || !raw) return null;
  if (!test(raw)) return null;

  const { body, attrs }: ExtractedContent = extract(raw);
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
