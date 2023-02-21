import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { Card } from "../components/post/Card.tsx";
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
      <main class="p-4 flex flex-col leading-normal bg-gray-50 h-screen">
        <h1 class="text-4xl text-neutral-800 mb-6">A Deno blog</h1>
        {posts ? posts.map((post: Post) => <Card data={post} />) : null}
      </main>
    </>
  );
}
