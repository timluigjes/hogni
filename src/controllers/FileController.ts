import FileResponse from "@/Server/Response/FileResponse.ts";
import BaseController from "@/controllers/BaseController.ts";
import type HTMLResponse from "@/Server/Response/HTMLResponse.ts";
import FileNotFoundController from "@/controllers/FileNotFoundController.ts";
import type { FileInfo } from "@/interfaces/FileInfo.ts";

class FileController extends BaseController {
  private fileInfo: FileInfo;
  private file: Uint8Array | undefined;
  constructor(fileInfo: FileInfo) {
    super();
    this.fileInfo = fileInfo;
    this.getFile();
  }

  getFile() {
    console.log(this.fileInfo);
    let file = undefined;
    try {
      file = Deno.readFileSync(
        Deno.cwd() + "/public/" + this.fileInfo.path,
      );
    } catch (error) {
      console.error(error);
    }

    this.file = file;
  }

  getResponse(): FileResponse | HTMLResponse {
    if (this.file === undefined) {
      return FileNotFoundController.show();
    }

    const headers = new Headers();
    headers.append("Content-Type", this.fileInfo.mimeType);
    headers.append("Content-Length", String(this.file.byteLength));

    return new FileResponse({
      name: this.fileInfo.name,
      status: 200,
      body: this.file,
      headers: headers,
    });
  }
}

export default FileController;
