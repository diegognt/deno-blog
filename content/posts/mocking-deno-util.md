---
title: Mocking a Deno built-in API 
date: 2023-02-21
excerpt: How to mock a Deno built-in API function such as, Deno.readDir
---

On this entry I'm going to explain how to mock a Deno built-in API function,
using `Deno.readDir` as an example.

Let's initialize a Deno project, to do so run the following command inside an
empty directory on you machine,

```sh
deno init mocking-with-deno
```

The previous command will initialize a Deno project on a directory called
`mocking-with-deno`. let's change to our new directory by running,

```sh
cd mocking-with-deno
```
