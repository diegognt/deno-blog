#!/usr/bin/env -S deno run -A --watch=static/,routes/,components/

import dev from "$fresh/dev.ts";

await dev(import.meta.url, "./main.ts");
