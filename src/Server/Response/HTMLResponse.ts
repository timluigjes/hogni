interface HTMLResponseProps {
  body: string;
  status: number;
}

class HTMLResponse implements HTMLResponseProps {
  readonly body: string;
  readonly status: number;
  readonly headers: Headers;

  constructor({ body, status }: HTMLResponseProps) {
    this.body = body;
    this.status = status;
    const headers = new Headers();
    headers.append("Content-Type", "text/html; charset=UTF-8");
    this.headers = headers;
  }
}

export default HTMLResponse;
