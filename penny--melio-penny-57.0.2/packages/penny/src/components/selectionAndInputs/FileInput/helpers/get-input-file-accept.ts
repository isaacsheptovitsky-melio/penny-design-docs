type FileSignatures = {
  [key: string]: number[] | number[][];
};

export const fileSignatures: FileSignatures = {
  jpg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
  pdf: [0x25, 0x50, 0x44, 0x46],
  svg: [
    [0x3c, 0x3f, 0x78, 0x6d, 0x6c, 0x20, 0x76, 0x65], // '<?xml ve...'
    [0x3c, 0x73, 0x76, 0x67], // '<svg'
  ],
  woff: [0x77, 0x4f, 0x46, 0x46], // WOFF file signature
  json: [0x7b], // JSON starts with '{' in ASCII
  csv: [0xef, 0xbb, 0xbf], // UTF-8 BOM (optional)
  xls: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], // XLS (OLE Compound File)
  xlsx: [0x50, 0x4b, 0x03, 0x04], // XLSX (ZIP format)
};

/**
 * This array defines the file types that do not support preview mode,
 * such as custom fonts, JSON files, and CSV files.
 * These types are used as fallback preview file types in specific scenarios.
 */
const notPreviewableFileTypes = ['woff', 'json', 'csv', 'xls', 'xlsx'] as const;

type PreviewableFileType = (typeof notPreviewableFileTypes)[number];

/**
 * This type represents the supported file types for the system.
 * It includes common previewable file types (e.g., images and PDFs)
 * as well as fallback types that are not previewable.
 */
export type FileType = 'jpg' | 'png' | 'pdf' | 'svg' | PreviewableFileType;

export const isNotPreviewableFileType = (value?: string): value is PreviewableFileType =>
  notPreviewableFileTypes.some((type) => {
    if (value?.includes('vnd.ms-excel') || value?.includes('vnd.openxmlformats')) return true;
    return value?.includes(type);
  });

export const fileTypes: Record<FileType, string> = {
  jpg: 'image/jpeg',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  woff: '.woff, font/woff',
  json: 'application/json',
  csv: 'text/csv',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const getInputFileAcceptByType = (types: FileType[] = []) => types.map((type) => fileTypes[type]).join(', ');

const getFileTypeBySignature = async (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    // Read more bytes to cover longer signatures (e.g. "<?xml")
    const fileSlice = file.slice(0, 16);
    reader.readAsArrayBuffer(fileSlice);

    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      if (arrayBuffer) {
        const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);

        // Check if the file name ends with .csv
        const isCSVExtension = file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');

        for (const fileType in fileSignatures) {
          const signatures = fileSignatures[fileType];
          if (!signatures) continue;

          const signatureArrays = (Array.isArray(signatures[0]) ? signatures : [signatures]) as number[][];

          for (const signature of signatureArrays) {
            if (signature.every((byte, index) => byte === uint8Array[index])) {
              resolve(fileType);
              return;
            }
          }
        }

        if (isCSVExtension) {
          resolve('csv');
          return;
        }

        resolve('unknown');
      } else {
        resolve('unknown');
      }
    };

    reader.onerror = () => {
      const error = new Error('Error reading file');
      reject(error);
    };
  });

export const isAcceptedType = async (file: File, acceptTypes?: FileType[]): Promise<boolean> => {
  if (!acceptTypes) return true;
  const fileType = await getFileTypeBySignature(file);
  return acceptTypes.includes(fileType as FileType);
};
