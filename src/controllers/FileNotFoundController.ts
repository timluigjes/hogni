import HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import BaseController from "@/controllers/BaseController.ts";

/**
 * Controller for handling 404 file not found errors
 * This is an abstract class with only static methods
 */
abstract class FileNotFoundController extends BaseController {
  /**
   * Returns a 404 Not Found response for files
   * @returns HTMLResponse with 404 status and error message
   */
  static show(): HTMLResponse {
    return new HTMLResponse({
      body:
        "<h1>File not found</h1>\n<p>Please check the public folder add it.</p>",
      status: 404,
    });
  }
}

export default FileNotFoundController;
