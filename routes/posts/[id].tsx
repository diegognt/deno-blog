import { JSX } from "preact/jsx-runtime";
import { HandlerContext, Handlers, PageProps } from "$x/fresh@1.1.3/server.ts";
import { Post } from "../../services/posts/@types.ts";
import { loadPost } from "../../services/posts/index.ts";

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
    <article class="p-4">
      <h1 class="text-2xl">{post.title}</h1>
      <time>{Intl.DateTimeFormat().format(post.date)}</time>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
}
