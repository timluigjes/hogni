import type { RouterRoute } from "@/interfaces/RoutesRoute.ts";
import { routes } from "../../routes.ts";
import { RouteMethod } from "@/enums/RouteMethod.ts";
import NotFoundController from "@/controllers/NotFoundController.ts";

interface RouterProps {
  request: Request;
  url: URL;
  method: string;
  redirect: string;
  headers: Headers;
}

class Router implements RouterProps {
  readonly request: Request;
  url: URL;
  method: string = "";
  redirect: string = "";
  readonly headers: Headers;
  readonly routes: RouterRoute[];

  constructor(request: Request) {
    this.request = request;
    const { url, method, redirect, headers } = this.request;
    this.url = new URL(url);
    this.method = method;
    this.redirect = redirect ?? "";
    this.headers = headers;
    this.routes = routes;
  }

  response() {
    const route = this.getRoute();
    const response = route.response;

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  }

  private getRoute() {
    const routerResult = this.routes.find((route) => {
      return (route.path === this.url.pathname && route.method === this.method);
    });

    if (routerResult === undefined) {
      return <RouterRoute> {
        method: RouteMethod.GET,
        path: "404",
        response: NotFoundController.show(),
      };
    }

    return routerResult;
  }
}

export default Router;
