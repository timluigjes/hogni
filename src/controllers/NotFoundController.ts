import HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import BaseController from "@/controllers/BaseController.ts";

/**
 * Controller for handling 404 route not found errors
 * This is an abstract class with only static methods
 */
abstract class NotFoundController extends BaseController {
  /**
   * Returns a 404 Not Found response for routes
   * @returns HTMLResponse with 404 status and error message
   */
  static show(): HTMLResponse {
    return new HTMLResponse({
      body:
        "<h1>Route not found</h1>\n<p>Please check routes.ts and add it.</p>",
      status: 404,
    });
  }
}

export default NotFoundController;
