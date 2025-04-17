import type HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import type FileResponse from "@/Server/Response/FileResponse.ts";

/**
 * Interface that all controllers must implement
 */
export interface InterfaceController {
  /** HTTP status code for the response */
  status: number;

  /**
   * Method to show the controller's content
   * @returns HTML or file response
   */
  show(): HTMLResponse | FileResponse;
}
