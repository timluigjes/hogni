/**
 * Interface representing information about a file
 */
export interface FileInfo {
  /** Name of the file with extension */
  name: string;
  /** Path to the file relative to the public directory */
  path: string;
  /** MIME type of the file */
  mimeType: string;
  /** File extension (without the dot) */
  extension: string;
}
