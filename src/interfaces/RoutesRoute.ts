import type { RouteMethod } from "@/enums/RouteMethod.ts";
import type HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import type FileResponse from "@/Server/Response/FileResponse.ts";

/**
 * Interface representing a route in the application
 * Used to define routes in routes.ts
 */
export interface RouterRoute {
  /** HTTP method for the route (GET, POST, etc.) */
  method: RouteMethod;
  /** URL path for the route (e.g., "/", "/about") */
  path: string;
  /** Response to return when the route is matched */
  response: HTMLResponse | FileResponse;
}
