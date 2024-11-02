import type { RouterRoute } from "@/interfaces/RoutesRoute.ts";
import { routes } from "../../routes.ts";
import { RouteMethod } from "@/enums/RouteMethod.ts";
import NotFoundController from "@/controllers/NotFoundController.ts";
import { MimeType } from "@/enums/MimeType.ts";
import type { MimeTypeIndex } from "@/interfaces/MimeTypeIndex.ts";
import type { FileInfo } from "@/interfaces/FileInfo.ts";
import FileController from "@/controllers/FileController.ts";

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
  private fileInfo: FileInfo = {
    name: "",
    extension: "",
    path: "",
    mimeType: "",
  };

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
    if (this.isFile()) {
      return this.fileResponse();
    }

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

  private isFile(): boolean {
    const extension: string =
      this.url.pathname.split(".").pop()?.toLowerCase() ?? "";

    if (!extension || extension === "html" || extension === "htm") {
      return false;
    }

    const MimeTypeIndex: MimeTypeIndex = MimeType;
    const mimeType = MimeTypeIndex[extension];

    if (mimeType === undefined) {
      return false;
    }

    function getFileNameWithExtension(path) {
      const parts = path.split("/");
      return parts[parts.length - 1];
    }

    this.fileInfo.name = getFileNameWithExtension(this.url.pathname);
    this.fileInfo.extension = extension;
    this.fileInfo.mimeType = mimeType;
    this.fileInfo.path = this.url.pathname;
    return true;
  }

  private fileResponse() {
    const controller = new FileController(this.fileInfo);
    const response = controller.getResponse();

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  }
}

export default Router;
