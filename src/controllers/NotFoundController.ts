import HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import BaseController from "@/controllers/BaseController.ts";

abstract class NotFoundController extends BaseController {
  static show(): HTMLResponse {
    return new HTMLResponse({
      body:
        "<h1>Route not found</h1>\n<p>Please check routes.ts and add it.</p>",
      status: 404,
    });
  }
}

export default NotFoundController;
