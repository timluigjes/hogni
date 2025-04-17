/**
 * Interface for HTML response properties
 */
interface HTMLResponseProps {
  /** HTML content of the response */
  body: string;
  /** HTTP status code */
  status: number;
}

/**
 * Class representing an HTML response
 * Used for returning HTML content to the client
 */
class HTMLResponse implements HTMLResponseProps {
  /** HTML content of the response */
  readonly body: string;
  /** HTTP status code */
  readonly status: number;
  /** HTTP headers */
  readonly headers: Headers;

  /**
   * Creates a new HTMLResponse instance
   * @param param0 Object containing body and status
   */
  constructor({ body, status }: HTMLResponseProps) {
    this.body = body;
    this.status = status;
    const headers = new Headers();
    headers.append("Content-Type", "text/html; charset=UTF-8");
    this.headers = headers;
  }
}

export default HTMLResponse;
