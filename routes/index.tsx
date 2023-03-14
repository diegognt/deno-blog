import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { Card } from "../components/post/Card.tsx";
import { Post } from "../services/posts/index.types.ts";
import { listPosts } from "../services/posts/index.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer/index.tsx";

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
      <body class="h-screen">
        <Header />
        <main class="px-6 pt-28 pb-12 flex flex-col justify-start items-center leading-normal bg-gray-50 min-h-screen">
          {posts ? posts.map((post: Post) => <Card data={post} />) : null}
        </main>
        <Footer />
      </body>
    </>
  );
}
