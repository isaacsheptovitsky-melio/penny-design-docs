import { useCallback } from 'react';

import { useControlled } from '@/utils/useControlled';

import type { Accept, FileError, FileRejection, FileValidator } from './Dropzone.types';

const fileMatchesAccept = (file: File, accept: Accept): boolean => {
  return Object.entries(accept).some(([mimeType, extensions]) => {
    if (mimeType.endsWith('/*') && file.type.startsWith(mimeType.slice(0, -1))) return true;
    if (file.type === mimeType) return true;
    return extensions.some((ext) => file.name.toLowerCase().endsWith(ext.toLowerCase()));
  });
};

export type UseDropzoneFileHandlerProps = {
  acceptedFiles?: File[];
  defaultAcceptedFiles?: File[];
  rejectedFiles?: FileRejection[];
  defaultRejectedFiles?: FileRejection[];
  onFileAccept?: (files: File[]) => void;
  onFileReject?: (rejections: FileRejection[]) => void;
  onFileChange?: (details: { acceptedFiles: File[]; rejectedFiles: FileRejection[] }) => void;
  accept?: Accept;
  validate?: FileValidator;
  maxFiles?: number;
  maxFileSize?: number;
  minFileSize?: number;
  multiple?: boolean;
};

export type UseDropzoneFileHandlerResult = {
  processFiles: (files: File[]) => void;
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
};

export function useDropzoneFileHandler({
  acceptedFiles: acceptedFilesProp,
  defaultAcceptedFiles,
  rejectedFiles: rejectedFilesProp,
  defaultRejectedFiles,
  onFileAccept,
  onFileReject,
  onFileChange,
  accept,
  validate,
  maxFiles,
  maxFileSize,
  minFileSize,
  multiple,
}: UseDropzoneFileHandlerProps): UseDropzoneFileHandlerResult {
  const [acceptedFiles, setAcceptedFiles] = useControlled<File[], []>(
    acceptedFilesProp,
    onFileAccept,
    defaultAcceptedFiles ?? []
  );

  const [rejectedFiles, setRejectedFiles] = useControlled<FileRejection[], []>(
    rejectedFilesProp,
    onFileReject,
    defaultRejectedFiles ?? []
  );

  const processFiles = useCallback(
    (rawFiles: File[]) => {
      const accepted: File[] = [];
      const rejected: FileRejection[] = [];

      // maxFiles is a cumulative limit — count existing accepted files plus the incoming batch.
      // When multiple=false this check is skipped: a new file always replaces the existing one.
      const totalCount = (acceptedFiles?.length ?? 0) + rawFiles.length;

      for (const file of rawFiles) {
        const errors: FileError[] = [];

        if (accept && !fileMatchesAccept(file, accept)) {
          errors.push('file-invalid-type');
        }

        if (maxFileSize !== undefined && file.size > maxFileSize) {
          errors.push('file-too-large');
        }

        if (minFileSize !== undefined && file.size < minFileSize) {
          errors.push('file-too-small');
        }

        if (!multiple && rawFiles.length > 1) {
          errors.push('too-many-files');
        } else if (multiple && maxFiles !== undefined && totalCount > maxFiles) {
          errors.push('too-many-files');
        }

        if (validate) {
          errors.push(...validate(file));
        }

        if (errors.length > 0) {
          rejected.push({ file, errors });
        } else {
          accepted.push(file);
        }
      }

      // When multiple=true, accumulate across uploads so onFileAccept reflects the full list.
      // When multiple=false, the new file replaces the existing one.
      const newAcceptedFiles = multiple ? [...(acceptedFiles ?? []), ...accepted] : accepted;

      setAcceptedFiles(newAcceptedFiles);
      setRejectedFiles(rejected);
      onFileChange?.({ acceptedFiles: newAcceptedFiles, rejectedFiles: rejected });
    },
    [
      accept,
      acceptedFiles,
      maxFiles,
      maxFileSize,
      minFileSize,
      multiple,
      onFileChange,
      setAcceptedFiles,
      setRejectedFiles,
      validate,
    ]
  );

  return {
    processFiles,
    acceptedFiles: acceptedFiles ?? [],
    rejectedFiles: rejectedFiles ?? [],
  };
}
