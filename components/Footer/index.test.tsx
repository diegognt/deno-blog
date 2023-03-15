import render from "preact-render-to-string";
import { parseHTML } from "@linkedom";
import { assertEquals, assertExists } from "$std/testing/asserts.ts";
import { Footer } from "./index.tsx";

const getRenderedComponent = (): Element | null => {
  const componentAsString = render(<Footer />);
  const { document: { lastElementChild } } = parseHTML(
    componentAsString,
    "text/html",
  );

  return lastElementChild;
};

Deno.test("The `Footer` component should be rendered.", () => {
  assertExists(getRenderedComponent());
});

Deno.test("The `Footer` components should use a `footer` HTML tag", () => {
  assertEquals(getRenderedComponent()?.nodeName, "FOOTER");
});
