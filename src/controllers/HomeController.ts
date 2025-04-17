import HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import BaseController from "@/controllers/BaseController.ts";

/**
 * Controller for the home page
 */
class HomeController extends BaseController {
  /**
   * Returns the home page
   * @returns HTMLResponse with 200 status and home page content
   */
  static show(): HTMLResponse {
    return new HTMLResponse({
      body: this.createBody(),
      status: 200,
    });
  }

  /**
   * Creates the HTML body for the home page
   * @returns HTML string
   */
  static createBody() {
    return "<h1>Example controller for version 0.0.2</h1>";
  }
}

export default HomeController;
