interface FileResponseProps {
  body: ArrayBuffer;
  status: number;
  headers: Headers;
  name: string;
}

class FileResponse implements FileResponseProps {
  body;
  status: number = 0;
  headers: Headers;
  name = "";

  constructor({ name, body, status, headers }: FileResponseProps) {
    this.status = status;
    this.headers = headers;
    this.body = body;
    this.name = name;

    this.headers.append(
      "Content-Disposition",
      `attachment; filename="${this.name}"`,
    );
  }
}

export default FileResponse;
