
import IconBrandDeno from "$icons/tsx/brand-deno.tsx";

export default function Header() {
  return (
    <header role="banner" class="bg-white w-screen py-6 px-8 flex flex-col md:flex-row gap-4">
      <a href="/" class="flex items-center flex-1">
        <IconBrandDeno />
        <h1 class="text-2xl ml-1 font-bold">A Deno blog</h1>
      </a>
    </header>
  );
}
