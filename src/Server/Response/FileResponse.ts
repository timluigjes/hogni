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
   * Constructs a new instance of the class.
   *
   * @param {Object} params The parameters for the constructor.
   * @param {string} params.name The name of the file. This is a required parameter.
   * @param {Buffer|string} params.body The content of the file. This is a required parameter.
   * @param {number} [params.status=200] The HTTP status code. Defaults to 200 if not provided.
   * @param {Object} params.headers The headers for the file response. This is a required parameter.
   * @throws {Error} If the name, body, or headers are not provided.
   * @return {void} Does not return a value.
   */
  constructor({
    name, 
    body, 
    status, 
    headers 
  }: FileResponseProps) {
    // Validate required parameters
    if (!name) throw new Error("Filename is required");
    if (!body) throw new Error("File body is required");
    if (!headers) throw new Error("Headers object is required");
    
    this.name = name;
    this.body = body;
    this.status = status || 200; // Default to 200 if not provided
    this.headers = headers;
    
    this.setContentDispositionHeader();
  }

  /**
   * Sets the Content-Disposition header to make the browser download the file
   * @private
   */
  private setContentDispositionHeader(): void {
    this.headers.append(
      "Content-Disposition",
      `attachment; filename="${this.name}"`
    );
  }
}

export default FileResponse;