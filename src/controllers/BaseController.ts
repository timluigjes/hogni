import type { InterfaceController } from "@/interfaces/InterfaceController.ts";
import HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import type FileResponse from "@/Server/Response/FileResponse.ts";

class BaseController implements InterfaceController {
  status: number;

  constructor() {
    this.status = 0;
  }

  show(): HTMLResponse | FileResponse {
    return new HTMLResponse({
      body: "<h1>Base controller is working</h1>",
      status: this.status,
    });
  }
}

export default BaseController;
