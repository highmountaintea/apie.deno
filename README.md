# apie

`A Pie` is a minimalistic HTTP server tailored for JSON API

## Description

`apie` is still under development. It is functional but subject to change.

## Usage

create a simple API that handles addition and subtraction:

```js
import { serve, ConnInfo } from "https://deno.land/std/http/mod.ts";
import { createHandler, Route } from "https://deno.land/x/apie/mod.ts";

function add({ a, b }) {
  return a + b;
}

function sub({ a, b }) {
  return a - b;
}

const requestHandler = createHandler([
  {
    post: "/add",
    handler: add,
  },
  {
    post: "/sub",
    handler: sub,
  },
]);

serve(requestHandler, { port: 8080 });
```
