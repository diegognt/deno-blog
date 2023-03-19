import IconBrandDeno from "$icons/tsx/brand-deno.tsx";
import { JSX } from "preact/jsx-runtime";

export function Header(): JSX.Element {
  return (
    <header
      role="banner"
      class="fixed top-0 left-0 right-0 bg-white  border-b-1 border-gray-500"
    >
      <div class="container mx-auto px-4 md:px-8 py-6 flex-none flex flex-col md:flex-row gap-4">
        <a href="/" class="flex items-center flex-1">
          <IconBrandDeno />
          <h1 class="text-2xl ml-1 font-bold">A Deno blog</h1>
        </a>
      </div>
    </header>
  );
}
