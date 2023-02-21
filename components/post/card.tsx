import { JSX } from "preact/jsx-runtime";
import { Post } from "../../services/posts/@types.ts";
import IconCalendar from "$icons/tsx/calendar.tsx";
type Props = {
  data: Post;
};
export function Card(props: Props): JSX.Element {
  const { data } = props;

  return (
    <article class="w-5/6 mb-6 border border-gray-40 lg:border-gray-400 bg-white rounded">
      <a href={data.slug} class="p-4 hover:shadow-md block">
        <h2 class="text-gray-900 text-2xl">{data.title}</h2>
        <div class="flex row justify-start items-center mb-4 ">
          <IconCalendar class="w-5 h-5 mr-2 text-gray-600" />
          <time class="text-gray-600">
            {Intl.DateTimeFormat("en-US").format(data.date)}
          </time>
        </div>
        <p class="text-gray-700 text-base">{data.excerpt}</p>
      </a>
    </article>
  );
}
