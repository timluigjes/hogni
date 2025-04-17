/**
 * Interface for file response properties
 */
interface FileResponseProps {
  /** File content as ArrayBuffer */
  body: ArrayBuffer;
  /** HTTP status code */
  status: number;
  /** HTTP headers */
  headers: Headers;
  /** Filename */
  name: string;
}

/**
 * Class representing a file response
 * Used for returning file content to the client
 */
class FileResponse implements FileResponseProps {
  /** File content */
  body;
  /** HTTP status code */
  status: number = 0;
  /** HTTP headers */
  headers: Headers;
  /** Filename */
  name = "";

  /**
   * Creates a new FileResponse instance
   * @param param0 Object containing name, body, status, and headers
   */
  constructor({ name, body, status, headers }: FileResponseProps) {
    this.status = status;
    this.headers = headers;
    this.body = body;
    this.name = name;

    // Add Content-Disposition header to make the browser download the file
    this.headers.append(
      "Content-Disposition",
      `attachment; filename="${this.name}"`,
    );
  }
}

export default FileResponse;
