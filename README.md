# apie

`A Pie` is a minimalistic HTTP server tailored for JSON API

## Description

`apie` is still under development. It is functional but subject to change.

* it provides a simple functional router
* it handles all HTTP request/response boilerplate
* it does not deal with parameter matching yet

## Usage

create a simple API that handles addition and subtraction:

```js
import { serve } from "https://deno.land/std/http/mod.ts";
import { createHandler } from "https://deno.land/x/apie/mod.ts";

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
