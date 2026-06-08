import { type FileValue } from '../..';

export type FileUploadStates = 'loading' | 'preview' | 'placeholder';

export function getFileUploadState(
  value: FileValue | null | undefined,
  selectedFile: FileValue | null | undefined,
  isLoading: boolean | undefined
): FileUploadStates {
  const misMatchValue = value && !selectedFile;

  if (isLoading || misMatchValue) return 'loading';
  if (selectedFile) return 'preview';
  return 'placeholder';
}
