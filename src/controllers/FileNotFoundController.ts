import HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import BaseController from "@/controllers/BaseController.ts";

abstract class FileNotFoundController extends BaseController {
  static show(): HTMLResponse {
    return new HTMLResponse({
      body:
        "<h1>File not found</h1>\n<p>Please check the public folder add it.</p>",
      status: 404,
    });
  }
}

export default FileNotFoundController;
