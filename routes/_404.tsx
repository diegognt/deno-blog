import { UnknownPageProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <>
      <Header />
      <main class="px-6 pt-28 pb-12 flex flex-col justify-start items-center leading-normal bg-gray-50 h-screen">
        <article class="w-5/6 mb-6 p-10 border border-gray-40 lg:border-gray-400 bg-white text-center rounded">
          <p class="m-0 mb-4 text-gray-900 text-2xl font-bold">404 not found: {url.pathname}</p>
          <a class="text-gray-900 cursor-pointer hover:underline" href="/">Return to the list of posts</a>
        </article>
      </main>
    </>
  );
}
