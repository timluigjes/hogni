import FileResponse from "@/Server/Response/FileResponse.ts";
import BaseController from "@/controllers/BaseController.ts";
import type HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import FileNotFoundController from "@/controllers/FileNotFoundController.ts";
import type { FileInfo } from "@/interfaces/FileInfo.ts";
import { join } from "https://deno.land/std/path/mod.ts";

// Simple in-memory cache for file responses
const fileCache = new Map<string, { data: Uint8Array; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache TTL

class FileController extends BaseController {
  private fileInfo: FileInfo;

  /**
   * Creates a new FileController instance
   * @param fileInfo Information about the file to serve
   */
  constructor(fileInfo: FileInfo) {
    super();
    this.fileInfo = fileInfo;
  }

  /**
   * Logs file access errors with appropriate context
   * @param filePath The path of the file that caused the error
   * @param error The error that occurred
   */
  private logFileAccessError(filePath: string, error: unknown): void {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
    
    const errorType = error instanceof Deno.errors.NotFound 
      ? 'File not found' 
      : error instanceof Deno.errors.PermissionDenied 
        ? 'Permission denied' 
        : 'File read error';
    
    console.error(`${errorType} for ${filePath}: ${errorMessage}`);
  }

  /**
   * Reads the file from disk or cache
   * @returns Promise that resolves when the file is read
   */
  async getFile(): Promise<Uint8Array | undefined> {
    const filePath = this.fileInfo.path;
    const now = Date.now();

    // Check if file is in cache and not expired
    if (fileCache.has(filePath)) {
      const cached = fileCache.get(filePath)!;
      if (now - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }
      // Cache expired, remove it
      fileCache.delete(filePath);
    }

    try {
      // Use path.join for safer path construction
      const fullPath = join(Deno.cwd(), "public", filePath);
      const file = await Deno.readFile(fullPath);

      // Cache the file
      fileCache.set(filePath, { data: file, timestamp: now });
      return file;
    } catch (error) {
      this.logFileAccessError(filePath, error);
      return undefined;
    }
  }

  /**
   * Gets the response for the file
   * @returns Promise that resolves to a FileResponse or HTMLResponse
   */
  async getResponse(): Promise<FileResponse | HTMLResponse> {
    const file = await this.getFile();

    if (file === undefined) {
      return FileNotFoundController.show();
    }

    const headers = new Headers();
    headers.append("Content-Type", this.fileInfo.mimeType);
    headers.append("Content-Length", String(file.byteLength));

    const arrayBuffer = new ArrayBuffer(file.byteLength);

    return new FileResponse({
      name: this.fileInfo.name,
      status: 200,
      body: arrayBuffer,
      headers: headers,
    });
  }
}

export default FileController;