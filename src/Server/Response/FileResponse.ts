interface FileResponseProps {
  body: string;
  status: number;
  headers: Headers;
}

class FileResponse implements FileResponseProps {
  body = "";
  status: number = 0;
  headers: Headers;

  constructor({ body, status, headers }: FileResponseProps) {
    this.status = status;
    this.headers = headers;
    this.body = body;
  }
}

export default FileResponse;
