export type FileError = 'file-invalid-type' | 'file-too-large' | 'file-too-small' | 'too-many-files' | (string & {});

export type FileValidator = (file: File) => FileError[];

export type FileRejection = {
  file: File;
  errors: FileError[];
};

/**
 * Maps MIME types to their allowed file extensions.
 * Follows the same convention as Ark UI and react-dropzone.
 *
 * @example
 * { 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpg', '.jpeg'] }
 */
export type Accept = Record<string, string[]>;
