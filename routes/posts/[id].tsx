import { JSX } from "preact/jsx-runtime";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../../services/posts/@types.ts";
import { loadPost } from "../../services/posts/index.ts";
import { CSS } from "$gfm/mod.ts";
import { Head } from "$fresh/runtime.ts";


export const handler: Handlers = {
  async GET(_request: Request, context: HandlerContext) {
    const { id } = context.params;
    const post: Post | null = await loadPost(id);

    return context.render({ post });
  },
};

export default function PostPage(props: PageProps): JSX.Element {
  const { post } = props?.data || {};

  return (
    <>
      <Head>
        <title>Post | {post.title}</title>
        <meta name="description" content={post.excerpt} />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class="p-4">
        <article itemScope itemType="http://schema.org/BlogPosting">
          <header class="mb-6">
            <h1 itemProp="headline" class="text-4xl">{post.title}</h1>
            <time itemProp="datePublished">
              {Intl.DateTimeFormat().format(post.date)}
            </time>
          </header>
          <div
            class="markdown-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
      </main>
    </>
  );
}
