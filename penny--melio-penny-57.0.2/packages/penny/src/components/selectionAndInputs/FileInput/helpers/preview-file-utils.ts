import { type FileMetadata, type FileValue } from '../types';

export const previewDataURLFile = (fileDataURL: string | ArrayBuffer | null) => {
  if (!fileDataURL) return;
  const win = window.open();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  win?.document.write(
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    `<iframe width="100%" height="100%" src=${fileDataURL.toString()} frameborder="0" allowfullscreen></iframe>`
  );
};

export const readFileDataURL = (file: FileValue | null): Promise<string | ArrayBuffer | undefined> | null => {
  if (!file || !(file instanceof File)) return null;

  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (result !== null) {
        resolve(result);
      } else {
        reject(new Error('Failed to read file.'));
      }
    };

    fileReader.onerror = () => {
      reject(new Error('File reading error.'));
    };

    fileReader.readAsDataURL(file);
  });
};

export function getPreviewFileMetadata(
  file: FileValue | null,
  fileDataURL: string | ArrayBuffer | null
): FileMetadata | null {
  if (!file) {
    return null;
  }

  if (file instanceof File) {
    if (!fileDataURL) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return { url: fileDataURL.toString(), type: file.type, name: file.name };
  }

  if (typeof file.url === 'string') {
    return file;
  }

  return null;
}

export const getFileSize = (file: FileValue | null): { size: number; unit: 'MB' | 'KB' | 'bytes' } | null => {
  if (!(file instanceof File)) return null;

  // Get the file size in bytes
  const fileSizeInBytes = file.size;

  if (fileSizeInBytes >= 1024 * 1024) {
    // Convert to MB and cut to 3 decimal places
    const size = Math.floor((fileSizeInBytes / (1024 * 1024)) * 1000) / 1000;
    return { size, unit: 'MB' };
  } else if (fileSizeInBytes >= 1024) {
    // Convert to KB and cut to 3 decimal places
    const size = Math.floor((fileSizeInBytes / 1024) * 1000) / 1000;
    return { size, unit: 'KB' };
  } else {
    // Return size in bytes as is
    return { size: fileSizeInBytes, unit: 'bytes' };
  }
};
