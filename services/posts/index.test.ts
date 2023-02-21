import * as PostService from "./index.ts";
import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
  assertStringIncludes,
} from "$std/testing/asserts.ts";
import { assertSpyCalls, returnsNext, stub, spy, assertSpyCall } from "$std/testing/mock.ts";
import { describe, it } from "$std/testing/bdd.ts";
import { Post } from "./@types.ts";

const emptyAsyncIterable = {
  [Symbol.asyncIterator] : async function*() {}
};

describe("The 'loadPost()' function", () => {
  it("returns `null` if slug does not exists.", async () => {
    assertEquals(await PostService.loadPost("do-not-exists"), null);
  });

  it("return a `Post` when slug exists.", async () => {
    //Act
    const post: Post | null = await PostService.loadPost("hello-world");

    // Assertions
    assertNotEquals(post, null);
    assertEquals(post?.slug, "hello-world");
    assertStringIncludes(post?.title as string, "the first post");
    assertInstanceOf(post?.date, Date);
  });
});

describe("The 'listPosts()' function", () => {
  it("returns an empty array if there is no psots to list.", async () => {
    const readDirStub = stub(Deno, "readDir", returnsNext([ emptyAsyncIterable ]));
    try {
      assertEquals(await PostService.listPosts(), []);
    } finally {
      readDirStub.restore();
    }

    assertSpyCall(readDirStub, 0, {
    args: ["./content/posts/"],
  });
    assertSpyCalls(readDirStub, 1);
  });

  it("returns an array of `Post` if there is any", async () => {
    const posts = await PostService.listPosts();
    assertEquals(posts.length > 0, true);
  });
});
