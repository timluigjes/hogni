import Router from "@/Server/Router.ts";
import _ServeTcpOptions = Deno.ServeTcpOptions;

/**
 * Request handler function
 * @param req The HTTP request
 * @returns Promise that resolves to a Response
 */
async function handler(req: Request): Promise<Response> {
  try {
    const router = new Router(req);
    return await router.response();
  } catch (error) {
    console.error("Unhandled error in request handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Get port from environment variables with fallback to 8000
const port = parseInt(Deno.env.get("PORT") ?? "8000");
if (isNaN(port)) {
  throw new Error("PORT environment variable must be a valid number.");
}

const options: _ServeTcpOptions = {
  port: port,
  // Add onListen callback to log server start
  onListen: ({ hostname, port }) => {
    console.log(`Server running at http://${hostname}:${port}/`);
  }
};

// Start the server
Deno.serve(options, handler);
