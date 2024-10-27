import type { RouteMethod } from "@/enums/RouteMethod.ts";
import type HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import type FileResponse from "@/Server/Response/FileResponse.ts";

export interface RouterRoute {
  method: RouteMethod;
  path: string;
  response: HTMLResponse | FileResponse;
}
