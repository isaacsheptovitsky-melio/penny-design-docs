import { type FileType } from './helpers/get-input-file-accept';

// Use for setting initial value for file upload input
export type FileMetadata = {
  url: string;
  name: string;
  type: string;
};

export type FileValue = File | FileMetadata;

type ValidatorFn = (file: File) => string | null | Promise<string | null>;

export type UseFileUploadProps = {
  validator?: ValidatorFn;
  onDelete?: VoidFunction;
  onChange?: (file: File | null) => void;
  value: FileValue | null;
  acceptTypes?: FileType[];
  invalidFileTypeErrorMessage?: string;
};
