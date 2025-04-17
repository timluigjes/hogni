import type { InterfaceController } from "@/interfaces/InterfaceController.ts";
import HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import type FileResponse from "@/Server/Response/FileResponse.ts";

/**
 * Base controller class that all controllers should extend
 * Provides common functionality for controllers
 */
class BaseController implements InterfaceController {
  /** HTTP status code for the response */
  status: number;

  /**
   * Creates a new BaseController instance
   */
  constructor() {
    this.status = 0;
  }

  /**
   * Default implementation of the show method
   * @returns HTML response with a default message
   */
  show(): HTMLResponse | FileResponse {
    return new HTMLResponse({
      body: "<h1>Base controller is working</h1>",
      status: this.status,
    });
  }
}

export default BaseController;
