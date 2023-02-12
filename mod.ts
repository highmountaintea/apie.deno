import { ConnInfo } from "https://deno.land/std/http/mod.ts";

export interface Route {
  post?: string;
  get?: string;
  put?: string;
  handler: Function;
}

export function createHandler(routes: Route[]) {
  async function reqHandler(req: Request, conn: ConnInfo) {
    const method = req.method.toLowerCase();
    if (method !== 'post' && method !== 'get' && method !== 'put') throw new Error(`Invalid method: ${method}`);
    const { url, headers } = req;
    const { pathname, searchParams } = new URL(url);
  
    // currently only handle JSON API
    let jsonBody = null;
    if (
      headers.has("content-type") &&
      headers.get("content-type")?.startsWith("application/json") &&
      req.body
    ) {
      jsonBody = await req.json();
    }
  
    // loop through routes
    for (const route of routes) {
      // obtain route path, next if it's null
      let routePath = route[method];
      if (routePath == null) continue;
      // next if path does not match route path
      if (routePath !== pathname) continue;

      // success
      // console.log(route);
      try {
        let result = await route.handler(jsonBody);
        return new Response(
          JSON.stringify(result),
          {
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
          },
        );
      } catch (e) {
        return new Response(
          JSON.stringify({ message: e.message }),
          {
            status: 400,
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
          }
        );
      }
    }
  
    // not found
    return new Response(null, { status: 404 });
  }
  
  return reqHandler;
}
