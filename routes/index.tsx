import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>A Personal blog</title>
      </Head>
      <main class="p-4">
        <h1 class="text-4xl text-neutral-800 mb-6">My personal blog</h1>
        <a class="text-red-500" href="/posts/hello-world">Hello world post</a>
      </main>
    </>
  );
}
