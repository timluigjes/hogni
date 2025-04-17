/**
 * Interface for indexing MIME types by file extension
 * Used to look up MIME types from file extensions
 */
export interface MimeTypeIndex {
  /** Maps file extensions to MIME types */
  [key: string]: string;
}
