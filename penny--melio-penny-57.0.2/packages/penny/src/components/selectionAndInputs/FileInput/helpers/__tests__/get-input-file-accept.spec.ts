import { expect } from 'vitest';

import {
  fileSignatures,
  type FileType,
  getInputFileAcceptByType,
  isAcceptedType,
  isNotPreviewableFileType,
} from '../get-input-file-accept';

describe('getInputFileAcceptByType', () => {
  it('gets the correct input file type according to the types given', () => {
    expect(getInputFileAcceptByType(['png', 'jpg', 'pdf'])).toBe('image/png, image/jpeg, application/pdf');
  });
});

describe('isAcceptedType', () => {
  it(`should return a valid type file for all available types`, async () => {
    const allFileTypes = Object.keys(fileSignatures) as FileType[];

    for (const fileType of allFileTypes) {
      const signatures = fileSignatures[fileType] ?? [];
      const signatureArrays = Array.isArray(signatures[0]) ? (signatures as number[][]) : [signatures as number[]];

      for (const signature of signatureArrays) {
        const mockFile = new File([new Uint8Array(signature)], `mockFile.${fileType}`);
        const isValid = await isAcceptedType(mockFile, allFileTypes);
        expect(isValid).toBe(true);
      }
    }
  });
});

describe('isNotPreviewableFileType', () => {
  //Those tests don't cover real test, isNotPreviewable function is getting a MIME type as parameter and not file title.

  it('should return true for a file type that is not previewable', () => {
    expect(isNotPreviewableFileType('example.woff')).toBe(true);
    expect(isNotPreviewableFileType('example.json')).toBe(true);
    expect(isNotPreviewableFileType('example.csv')).toBe(true);
    expect(isNotPreviewableFileType('example.xls')).toBe(true);
    expect(isNotPreviewableFileType('example.xlsx')).toBe(true);
  });

  it('should return false for a file type that is previewable', () => {
    expect(isNotPreviewableFileType('example.jpg')).toBe(false);
    expect(isNotPreviewableFileType('example.png')).toBe(false);
    expect(isNotPreviewableFileType('example.pdf')).toBe(false);
    expect(isNotPreviewableFileType('example.svg')).toBe(false);
  });

  it('should return false for undefined or empty value', () => {
    expect(isNotPreviewableFileType(undefined)).toBe(false);
    expect(isNotPreviewableFileType('')).toBe(false);
  });

  it('should return false for a string that does not contain a non-previewable file type', () => {
    expect(isNotPreviewableFileType('example.doc')).toBe(false);
    expect(isNotPreviewableFileType('text/plain')).toBe(false);
  });
});
