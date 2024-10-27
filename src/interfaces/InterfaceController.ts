import type HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import type FileResponse from "@/Server/Response/FileResponse.ts";

export interface InterfaceController {
  status: number;
  show(): HTMLResponse | FileResponse;
}
