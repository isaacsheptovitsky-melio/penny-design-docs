import { waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderHook } from '@/test-utils/renderHook.utils';

import * as FileUtils from '../../../FileInput/helpers';
import { useFilePreview } from '../useFilePreview';

describe('useFilePreview', () => {
  const mockFile = new File(['file-content'], 'example.png', { type: 'image/png' });

  const mockMetadata = {
    name: 'example.png',
    type: 'image/png',
    url: 'data:image/png;base64,...',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return null when no file is selected', () => {
    const { result } = renderHook(() => useFilePreview({ selectedFile: null }));
    expect(result.current).toBeNull();
  });

  it('should return preview metadata when file is selected', async () => {
    vi.spyOn(FileUtils, 'readFileDataURL').mockResolvedValue('data:image/png;base64,...');
    vi.spyOn(FileUtils, 'getPreviewFileMetadata').mockReturnValue(mockMetadata);

    const { result } = renderHook(() => useFilePreview({ selectedFile: mockFile }));

    await waitFor(() => expect(result.current).toEqual(mockMetadata));
    expect(FileUtils.readFileDataURL).toHaveBeenCalledWith(mockFile);
    expect(FileUtils.getPreviewFileMetadata).toHaveBeenCalledWith(mockFile, 'data:image/png;base64,...');
  });

  it('should return null if readFileDataURL throws', () => {
    vi.spyOn(FileUtils, 'readFileDataURL').mockRejectedValue(new Error('read error'));
    vi.spyOn(FileUtils, 'getPreviewFileMetadata');

    const { result } = renderHook(() => useFilePreview({ selectedFile: mockFile }));

    expect(result.current).toBeNull();
    expect(FileUtils.getPreviewFileMetadata).not.toHaveBeenCalled();
  });
});
