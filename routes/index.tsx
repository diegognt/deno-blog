import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import Header from "../components/header/index.tsx";
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
      <Header />
      <main class="p-6 flex flex-col leading-normal bg-gray-50 h-screen">
        {posts ? posts.map((post: Post) => <Card data={post} />) : null}
      </main>
    </>
  );
}
