import { JSX } from "preact/jsx-runtime";

export function Footer(): JSX.Element {
  return (
    <footer class="h-24 flex content-center mt-auto bg-white">
      <div class="container mx-auto px-4 md:px-8 flex flex-col md:flex-row self-center items-center gap-6 md:gap-12 mx-auto">
        <section class="flex-1 text-center md:text-left">
          <p class="font-bold text-2xl">
            Diego Navarro
          </p>
          <small class="text-gray-500">Software Engineer</small>
        </section>
        <section class="flex-1 text-gray-500 space-y-2 text-xs text-center md:text-right">
            Copyright © 2023<br />All right reserved.
        </section>
      </div>
    </footer>
  );
}
