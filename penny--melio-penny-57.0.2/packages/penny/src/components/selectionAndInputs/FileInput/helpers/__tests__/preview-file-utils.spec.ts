import { expect, vi } from 'vitest';

import { getFileSize, getPreviewFileMetadata, previewDataURLFile, readFileDataURL } from '../preview-file-utils';

describe('previewDataURLFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should open a new window and write an iframe with the given fileDataURL', () => {
    const mockWindow = {
      document: {
        write: vi.fn(),
      },
    };

    // Mock window.open to return a mock window object
    const windowOpenSpy = vi.spyOn(window, 'open').mockReturnValue(mockWindow as unknown as Window);

    const fileDataURL = 'data:text/plain;base64,SGVsbG8gV29ybGQ='; // Example Data URL
    previewDataURLFile(fileDataURL);

    // Verify that window.open was called
    expect(windowOpenSpy).toHaveBeenCalled();

    // Verify that document.write was called with the correct iframe HTML
    expect(mockWindow.document.write).toHaveBeenCalledWith(
      `<iframe width="100%" height="100%" src=${fileDataURL} frameborder="0" allowfullscreen></iframe>`
    );
  });

  it('should not open a window or write if fileDataURL is null', () => {
    const windowOpenSpy = vi.spyOn(window, 'open');

    previewDataURLFile(null);

    // Verify that window.open was not called
    expect(windowOpenSpy).not.toHaveBeenCalled();
  });
});

describe('getPreviewFileMetadata', () => {
  type FileInfo = { url: string; type: string; name: string };

  it('should return null if the file is null', () => {
    const result = getPreviewFileMetadata(null, null);
    expect(result).toBeNull();
  });

  it('should return null if the file is not a File or a valid FileInfo', () => {
    const invalidFile = { type: 'text/plain', name: 'invalid.txt' }; // Missing `url` property
    const result = getPreviewFileMetadata(invalidFile as unknown as File | FileInfo, null);
    expect(result).toBeNull();
  });

  it('should return null if the file is an instance of File but fileDataURL is null', () => {
    const file = new File(['Hello World'], 'example.txt', { type: 'text/plain' });
    const result = getPreviewFileMetadata(file, null);
    expect(result).toBeNull();
  });

  it('should return metadata for a File with a valid fileDataURL', () => {
    const file = new File(['Hello World'], 'example.txt', { type: 'text/plain' });
    const fileDataURL = 'data:text/plain;base64,SGVsbG8gV29ybGQ=';
    const result = getPreviewFileMetadata(file, fileDataURL);

    expect(result).toEqual({
      url: fileDataURL,
      type: 'text/plain',
      name: 'example.txt',
    });
  });

  it('should return file metadata for a valid FileInfo object', () => {
    const fileInfo: FileInfo = { url: '/path/to/example.txt', type: 'text/plain', name: 'example.txt' };
    const result = getPreviewFileMetadata(fileInfo, null);

    expect(result).toEqual(fileInfo);
  });

  it('should return null if the file is neither a File nor a valid FileInfo object', () => {
    const invalidFile = { foo: 'bar' }; // Invalid structure
    const result = getPreviewFileMetadata(invalidFile as unknown as File | FileInfo, null);
    expect(result).toBeNull();
  });

  it('should handle empty strings in fileDataURL gracefully when the file is a File', () => {
    const file = new File(['Hello World'], 'example.txt', { type: 'text/plain' });
    const result = getPreviewFileMetadata(file, '');

    expect(result).toBeNull();
  });
});

describe('getFileSize', () => {
  it('should return the file size in MB for files larger than 1 MB', () => {
    const file = new File(['a'.repeat(2 * 1024 * 1024)], 'large-file.txt', { type: 'text/plain' }); // 2 MB
    const result = getFileSize(file);
    expect(result).toEqual({ size: 2.0, unit: 'MB' });
  });

  it('should return the file size in KB for files between 1 KB and 1 MB', () => {
    const file = new File(['a'.repeat(50 * 1024)], 'medium-file.txt', { type: 'text/plain' }); // 50 KB
    const result = getFileSize(file);
    expect(result).toEqual({ size: 50.0, unit: 'KB' });
  });

  it('should return the file size in bytes for files smaller than 1 KB', () => {
    const file = new File(['a'.repeat(500)], 'small-file.txt', { type: 'text/plain' }); // 500 bytes
    const result = getFileSize(file);
    expect(result).toEqual({ size: 500, unit: 'bytes' });
  });

  it('should return null if the input is not an instance of File', () => {
    const result = getFileSize(null); // Null input
    expect(result).toBeNull();

    const notAFile = { size: 1024, name: 'fake-file' }; // Fake file object
    const result2 = getFileSize(notAFile as unknown as File);
    expect(result2).toBeNull();
  });

  it('should correctly handle edge cases like exactly 1 MB or 1 KB', () => {
    const file1MB = new File(['a'.repeat(1024 * 1024)], 'file1MB.txt', { type: 'text/plain' }); // 1 MB
    const result1MB = getFileSize(file1MB);
    expect(result1MB).toEqual({ size: 1.0, unit: 'MB' });

    const file1KB = new File(['a'.repeat(1024)], 'file1KB.txt', { type: 'text/plain' }); // 1 KB
    const result1KB = getFileSize(file1KB);
    expect(result1KB).toEqual({ size: 1.0, unit: 'KB' });
  });

  it('should cut the size to 3 decimal places without rounding', () => {
    const file = new File(['a'.repeat(Math.floor(1.2345 * 1024 * 1024))], 'precise-file.txt', { type: 'text/plain' }); // ~1.2345 MB
    const result = getFileSize(file);
    expect(result).toEqual({ size: 1.234, unit: 'MB' });
  });

  it('should handle file read and set data URL', async () => {
    const mockFileReader = {
      EMPTY: 0,
      LOADING: 1,
      DONE: 2,
      readAsDataURL: vi.fn(function (this: FileReader) {
        if (this.onload) {
          Object.defineProperty(this, 'result', {
            value: 'mockDataUrl',
            configurable: true,
          });
          this.onload({ target: { result: this.result } } as ProgressEvent<FileReader>);
        }
      }),
      abort: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
    const mockFile = new File(['invoice'], 'invoice.jpeg', { type: 'image/jpeg' });

    window.FileReader = vi.fn(() => mockFileReader as unknown as FileReader) as unknown as typeof FileReader;

    const result = await readFileDataURL(mockFile);

    expect(result).toBe('mockDataUrl');
  });
});
