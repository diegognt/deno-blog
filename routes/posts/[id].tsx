import { JSX } from "preact/jsx-runtime";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../../services/posts/index.types.ts";
import { loadPost } from "../../services/posts/index.ts";
import { CSS } from "$gfm/mod.ts";
import { Head } from "$fresh/runtime.ts";
import { Header } from "../../components/Header/index.tsx";
import { Footer } from "../../components/Footer/index.tsx";

export const handler: Handlers = {
  async GET(_request: Request, context: HandlerContext) {
    const { id } = context.params;
    const post: Post | null = await loadPost(id);

    if (!post) return context.renderNotFound();

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
      <body class="bg-gray-50">
        <Header />
        <main class="container mx-auto px-4 md:px-8 pt-28 pb-12 flex flex-col grow leading-normal min-h-screen">
          <article
            class="p-6 border border-gray-40 lg:border-gray-400 bg-white rounded"
            itemScope
            itemType="http://schema.org/BlogPosting"
          >
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
        <Footer />
      </body>
    </>
  );
}
