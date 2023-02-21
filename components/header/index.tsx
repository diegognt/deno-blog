
import IconBrandDeno from "$icons/tsx/brand-deno.tsx";

export default function Header() {
  return (
    <header role="banner" class="fixed top-0 left-0 right-0 bg-white w-screen py-6 px-8 flex flex-col md:flex-row gap-4 border-b-1 border-gray-500">
      <a href="/" class="flex items-center flex-1">
        <IconBrandDeno />
        <h1 class="text-2xl ml-1 font-bold">A Deno blog</h1>
      </a>
    </header>
  );
}
