import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { Post } from "../services/posts/@types.ts";
import { listPosts } from "../services/posts/index.ts";

export const handler: Handlers = {
  async GET(_request: Request, context: HandlerContext) {
    const posts: Post[] = await listPosts();

    return context.render({ posts });
  },
};

export default function Home(props: PageProps): JSX.Element {
  const { posts } = props?.data || {};
  return (
    <>
      <Head>
        <title>A Deno blog</title>
        <meta name="description" content="A dummy blog running on Deno Fresh" />
      </Head>
      <main class="p-4">
        <h1 class="text-4xl text-neutral-800 mb-6">My personal blog</h1>
        <pre>{props}</pre>
        { posts ? posts.map((post: Post) => (
          <article class="mb-2 rounded">
            <h2 class="text-2xl hover:text-blue-400">
              <a href={post.slug} class="">{post.title}</a>
            </h2>
            <p>{post.excerpt}</p>
            <time itemProp="datePublished">
              {Intl.DateTimeFormat().format(post.date)}
            </time>
          </article>
        )) : null}
      </main>
    </>
  );
}
