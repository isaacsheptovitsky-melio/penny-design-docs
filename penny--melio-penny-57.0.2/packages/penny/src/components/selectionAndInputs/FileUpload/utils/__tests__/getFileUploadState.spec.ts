import { describe, expect, it } from 'vitest';

import { type FileValue } from '../../../FileInput';
import { getFileUploadState } from '../getFileUploadState';

describe('getFileUploadState', () => {
  const mockFile: File = new File(['content'], 'test.txt', { type: 'text/plain' });
  const mockFileMetadata: FileValue = {
    url: 'https://example.com/file.txt',
    name: 'test.txt',
    type: 'text/plain',
  };

  describe('when isLoading is true', () => {
    it('should return "loading" when isLoading is true and value exists', () => {
      const result = getFileUploadState(mockFile, mockFile, true);

      expect(result).toBe('loading');
    });

    it('should return "loading" when isLoading is true and selectedFile exists', () => {
      const result = getFileUploadState(null, mockFile, true);

      expect(result).toBe('loading');
    });

    it('should return "loading" when isLoading is true and both value and selectedFile are both null', () => {
      const result = getFileUploadState(null, null, true);

      expect(result).toBe('loading');
    });

    it('should return "loading" when isLoading is true and value and selectedFile are both undefined', () => {
      const result = getFileUploadState(undefined, undefined, true);

      expect(result).toBe('loading');
    });

    it('should return "loading" when isLoading is true and value exists but selectedFile is null', () => {
      const result = getFileUploadState(mockFile, null, true);

      expect(result).toBe('loading');
    });

    it('should return "loading" when isLoading is true and value is null but selectedFile exists', () => {
      const result = getFileUploadState(null, mockFile, true);

      expect(result).toBe('loading');
    });
  });

  describe('when there is a mismatch between value and selectedFile', () => {
    it('should return "loading" when value exists but selectedFile is null', () => {
      const result = getFileUploadState(mockFile, null, false);

      expect(result).toBe('loading');
    });

    it('should return "loading" when value exists but selectedFile is undefined', () => {
      const result = getFileUploadState(mockFile, undefined, false);

      expect(result).toBe('loading');
    });

    it('should return "loading" when value is FileMetadata but selectedFile is null', () => {
      const result = getFileUploadState(mockFileMetadata, null, false);

      expect(result).toBe('loading');
    });
  });

  describe('when selectedFile exists', () => {
    it('should return "preview" when selectedFile is a File', () => {
      const result = getFileUploadState(null, mockFile, false);

      expect(result).toBe('preview');
    });

    it('should return "preview" when selectedFile is FileMetadata', () => {
      const result = getFileUploadState(null, mockFileMetadata, false);

      expect(result).toBe('preview');
    });

    it('should return "preview" when both value and selectedFile exist and match', () => {
      const result = getFileUploadState(mockFile, mockFile, false);

      expect(result).toBe('preview');
    });

    it('should return "preview" when selectedFile exists even if value is undefined', () => {
      const result = getFileUploadState(undefined as FileValue | null | undefined, mockFile, false);

      expect(result).toBe('preview');
    });
  });

  describe('when no file is selected', () => {
    it('should return "placeholder" when value and selectedFile are both null', () => {
      const result = getFileUploadState(null, null, false);

      expect(result).toBe('placeholder');
    });

    it('should return "placeholder" when value and selectedFile are both undefined', () => {
      const result = getFileUploadState(undefined, undefined, false);

      expect(result).toBe('placeholder');
    });

    it('should return "placeholder" when value is null and selectedFile is undefined', () => {
      const result = getFileUploadState(null, undefined, false);

      expect(result).toBe('placeholder');
    });

    it('should return "placeholder" when value is undefined and selectedFile is null', () => {
      const result = getFileUploadState(undefined as FileValue | null | undefined, null, false);

      expect(result).toBe('placeholder');
    });
  });
});
