import { ExtractedContent, Post } from "./@types.ts";
import { extract } from "$std/encoding/front_matter/any.ts";
import { renderMarkdown } from "$x/markdown_renderer@0.1.3/mod.ts";
import sanitizeHtml from "@sanitize-html";

export async function loadPost(slug: string): Promise<Post | null> {
  const raw: string | null = await Deno.readTextFile(
    `./content/posts/${slug}.md`,
  )
    .catch(() => null);

  if (!raw) return null;

  const { body, attrs }: ExtractedContent = extract(raw);
  const post: Post = {
    slug,
    title: attrs.title,
    body: sanitizeHtml(renderMarkdown(body)),
    date: new Date(attrs.date as string),
    excerpt: attrs.excerpt,
  };

  return post;
}
