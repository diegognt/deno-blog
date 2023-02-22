import * as PostService from "./index.ts";
import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
  assertStringIncludes,
} from "$std/testing/asserts.ts";
import {
  assertSpyCall,
  assertSpyCalls,
  returnsNext,
  stub,
} from "$std/testing/mock.ts";
import { describe, it } from "$std/testing/bdd.ts";
import { Post } from "./@types.ts";
import {
  badFrontMatter,
  emptyAsyncIterable,
  goodFrontMatter,
} from "../../tests/stubs.ts";

describe("The 'loadPost()' function", () => {
  it("returns `null` if slug does not exists.", async () => {
    assertEquals(await PostService.loadPost("do-not-exists"), null);
  });

  it("returns a `Post` when slug exists.", async () => {
    const extractStub = stub(
      Deno,
      "readTextFile",
      returnsNext([Promise.resolve(goodFrontMatter)]),
    );

    try {
      const post: Post | null = await PostService.loadPost("hello-world");
      // Assertions
      assertNotEquals(post, null);
      assertEquals(post?.slug, "/posts/hello-world/");
      assertStringIncludes(post?.title as string, "Hello Deno fresh");
      assertStringIncludes(post?.excerpt as string, "the first post of the blog");
      assertInstanceOf(post?.date, Date);
    } finally {
      extractStub.restore();
    }
    assertSpyCall(extractStub, 0, {
      args: ["./content/posts/hello-world.md"],
      returned: Promise.resolve(goodFrontMatter),
    });

    assertSpyCalls(extractStub, 1);
  });

  it("returns `nulls` when `Post` front matter has a bad format", async () => {
    const extractStub = stub(
      Deno,
      "readTextFile",
      returnsNext([Promise.resolve(badFrontMatter)]),
    );

    try {
      assertEquals(await PostService.loadPost("hello-world-two"), null);
    } finally {
      extractStub.restore();
    }
    assertSpyCall(extractStub, 0, {
      args: ["./content/posts/hello-world-two.md"],
      returned: Promise.resolve(badFrontMatter),
    });

    assertSpyCalls(extractStub, 1);
  });
});

describe("The 'listPosts()' function", () => {
  it("returns an empty array if there is no psots to list.", async () => {
    const readDirStub = stub(
      Deno,
      "readDir",
      returnsNext([emptyAsyncIterable]),
    );

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
