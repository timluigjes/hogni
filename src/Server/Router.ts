import type {RouterRoute} from "@/interfaces/RoutesRoute.ts";
import {routes} from "../../routes.ts";
import {RouteMethod} from "@/enums/RouteMethod.ts";
import NotFoundController from "@/controllers/NotFoundController.ts";
import {MimeType} from "@/enums/MimeType.ts";
import type {MimeTypeIndex} from "@/interfaces/MimeTypeIndex.ts";
import type {FileInfo} from "@/interfaces/FileInfo.ts";
import FileController from "@/controllers/FileController.ts";

/**
 * Extracts the filename with extension from a path
 * @param path The path to extract the filename from
 * @returns The filename with extension
 */
function getFileNameWithExtension(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1];
}

/**
 * Interface for Router properties
 */
interface RouterProps {
  request: Request;
  url: URL;
  method: string;
  redirect: string;
  headers: Headers;
}

/**
 * Router class for handling HTTP requests
 */
class Router implements RouterProps {
  readonly request: Request;
  url: URL;
  method: string = "";
  redirect: string = "";
  readonly headers: Headers;
  readonly routes: RouterRoute[];
  // Cache for route matching
  private static routeCache = new Map<string, RouterRoute>();
  // Cache for file detection
  private static fileDetectionCache = new Map<string, boolean>();
  private fileInfo: FileInfo = {
    name: "",
    extension: "",
    path: "",
    mimeType: "",
  };

  /**
   * Creates a new Router instance
   * @param request The HTTP request
   * @param customRoutes Optional custom routes for testing
   */
  constructor(request: Request, customRoutes?: RouterRoute[]) {
    this.request = request;
    const { url, method, redirect, headers } = this.request;
    this.url = new URL(url);
    this.method = method;
    this.redirect = redirect ?? "";
    this.headers = headers;
    this.routes = customRoutes ?? routes;
  }

  /**
   * Handles the request and returns a response
   * @returns Promise that resolves to a Response
   */
  async response(): Promise<Response> {
    if (this.isFile()) {
      return await this.fileResponse();
    }

    const route = this.getRoute();
    const response = route.response;

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  }

  /**
   * Gets the route that matches the request
   * @returns The matching route or a 404 route
   */
  private getRoute(): RouterRoute {
    // Create a cache key from method and path
    const cacheKey = `${this.method}:${this.url.pathname}`;

    // Check if route is in cache
    if (Router.routeCache.has(cacheKey)) {
      return Router.routeCache.get(cacheKey)!;
    }

    // Find matching route
    const routerResult = this.routes.find((route) => 
      route.path === this.url.pathname && route.method === this.method
    );

    // If no route found, return 404
    if (routerResult === undefined) {
      // Don't cache 404 responses for non-existent routes to allow adding routes dynamically
      return <RouterRoute>{
        method: RouteMethod.GET,
        path: "404",
        response: NotFoundController.show(),
      };
    }

    // Cache the route
    Router.routeCache.set(cacheKey, routerResult);
    return routerResult;
  }

  /**
   * Checks if the request is for a file
   * @returns True if the request is for a file, false otherwise
   */
  private isFile(): boolean {
    const pathname = this.url.pathname;

    // Check if file detection is in cache
    if (Router.fileDetectionCache.has(pathname)) {
      return Router.fileDetectionCache.get(pathname)!;
    }

    const extension: string = pathname.split(".").pop()?.toLowerCase() ?? "";

    if (!extension || extension === "html" || extension === "htm") {
      Router.fileDetectionCache.set(pathname, false);
      return false;
    }

    const MimeTypeIndex: MimeTypeIndex = MimeType;
    const mimeType = MimeTypeIndex[extension];

    if (mimeType === undefined) {
      Router.fileDetectionCache.set(pathname, false);
      return false;
    }

    this.fileInfo.name = getFileNameWithExtension(pathname);
    this.fileInfo.extension = extension;
    this.fileInfo.mimeType = mimeType;
    this.fileInfo.path = pathname;

    Router.fileDetectionCache.set(pathname, true);
    return true;
  }

  /**
   * Gets a response for a file request
   * @returns Promise that resolves to a Response
   */
  private async fileResponse(): Promise<Response> {
    const controller = new FileController(this.fileInfo);
    const response = await controller.getResponse();

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  }
}

export default Router;
