import HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import BaseController from "@/controllers/BaseController.ts";

class HomeController extends BaseController {
  static show(): HTMLResponse {
    return new HTMLResponse({
      body: this.createBody(),
      status: 200,
    });
  }

  static createBody() {
    return "<h1>Example controller for version 0.0.1</h1>";
  }
}

export default HomeController;
