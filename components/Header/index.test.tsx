import render from "preact-render-to-string";
import { parseHTML } from "@linkedom";
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertExists,
} from "$std/testing/asserts.ts";
import { describe, it } from "$std/testing/bdd.ts";
import { Header } from "./index.tsx";

const getRenderedComponent = (): Element | null => {
  const componentAsString = render(<Header />);
  const { document: { lastElementChild } } = parseHTML(
    componentAsString,
    "text/html",
  );

  return lastElementChild;
};

describe("The `Header` component,", () => {
  it("should be renendered", () => {
    assertExists(getRenderedComponent());
  });

  it("should use a `header` HTML tag as parent", () => {
    assertEquals(getRenderedComponent()?.nodeName, "HEADER");
  });

  it('should have the `role="banner"` attribute on the `header` HTML tag', () => {
    const component = getRenderedComponent();

    assertEquals(component?.hasAttribute("role"), true);
    assertEquals(component?.getAttribute("role"), "banner");
  });
});
