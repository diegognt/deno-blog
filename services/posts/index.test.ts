import { loadPost } from "./index.ts";
import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
  assertStringIncludes,
} from "$std/testing/asserts.ts";
import { Post } from "./@types.ts";

Deno.test("'loadPost()' return `null` if not found a post", async () => {
    assertEquals(await loadPost("do-not-exists"), null);
});

Deno.test("'loadPost()' should return a `Post` when slug exists.", async () => {
  //Act
  const post: Post | null = await loadPost("hello-world");

  // Assertions
  assertNotEquals(post, null);
  assertEquals(post?.slug, "hello-world");
  assertStringIncludes(post?.title as string, "the first post");
  assertInstanceOf(post?.date, Date);
});
