export const emptyAsyncIterable = {
  [Symbol.asyncIterator] : async function*() {}
};

export const badFrontMatter = `
---
title: Hello Deno fresh, the first post.
date: 2023-02-20
excerpt: This is the first post of the blog.
---
`; 

export const goodFrontMatter = `---\n
title: Hello Deno fresh, the first post.\n
date: 2023-02-20\n
excerpt: This is the first post of the blog.\n
---`;
