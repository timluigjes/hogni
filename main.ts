import Router from "@/Server/Router.ts";
import "jsr:@std/dotenv/load";
import _ServeTcpOptions = Deno.ServeTcpOptions;

function handler(req: Request) {
  const router = new Router(req);
  return router.response();
}

console.log("Port is: " + Deno.env.get("PORT"));

const options: _ServeTcpOptions = {
  port: Deno.env.get("PORT"),
};

Deno.serve(options, handler);
