import { act, waitFor } from '@testing-library/react';
import { type ChangeEvent, type MouseEvent } from 'react';
import { expect, type Mock, vi } from 'vitest';

import { renderHook } from '@/test-utils/renderHook.utils';

import { isAcceptedType } from '../../../FileInput/helpers/get-input-file-accept';
import { useFileUploadController } from '../useFileUploadController';

vi.mock('../../../FileInput/helpers/get-input-file-accept', () => ({
  isAcceptedType: vi.fn(),
}));

vi.mock('../../../../../utils/userAgent', () => ({
  isWindowsOS: vi.fn(),
}));

const mockFile = new File(['invoice'], 'invoice.jpeg', { type: 'image/jpeg' });

describe('useFileUploadController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useFileUploadController({}));

    expect(result.current.selectedFile).toBeNull();
    expect(result.current.fileError).toBeNull();
  });

  it('should set selected file and clear error on valid file upload', async () => {
    (isAcceptedType as Mock).mockResolvedValue(true);

    const onChange = vi.fn();
    const { result } = renderHook(() => useFileUploadController({ onChange }));

    act(() => {
      result.current.inputProps.onChange({
        target: { files: [mockFile] },
        stopPropagation: vi.fn(),
      } as unknown as ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => expect(result.current.selectedFile).toEqual(mockFile));
    expect(result.current.fileError).toBeNull();
    expect(onChange).toHaveBeenCalledWith(mockFile);
  });

  it('should set error and clear file on invalid file upload', async () => {
    (isAcceptedType as Mock).mockResolvedValue(false);

    const onChange = vi.fn();
    const { result } = renderHook(() => useFileUploadController({ onChange }));

    act(() =>
      result.current.inputProps.onChange({
        target: { files: [mockFile] },
        stopPropagation: vi.fn(),
      } as unknown as ChangeEvent<HTMLInputElement>)
    );

    await waitFor(() => {
      expect(result.current.selectedFile).toBeNull();
      expect(result.current.fileError).toBe('Invalid file type');
    });

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('should handle delete file', () => {
    const onChange = vi.fn();

    const { result } = renderHook(() => useFileUploadController({ onChange, value: mockFile }));

    act(() => {
      result.current.handleDelete({ stopPropagation: vi.fn() } as unknown as MouseEvent<HTMLButtonElement>);
    });

    expect(onChange).toHaveBeenCalledWith(null);
    expect(result.current.selectedFile).toBeNull();
  });

  it('should handle delete file when controlled', () => {
    const onDelete = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() => useFileUploadController({ onDelete, onChange, value: mockFile }));

    act(() => {
      result.current.handleDelete({ stopPropagation: vi.fn() } as unknown as MouseEvent<HTMLButtonElement>);
    });

    expect(onDelete).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should call onReplace and trigger file input click', () => {
    const onReplace = vi.fn();
    const { result } = renderHook(() => useFileUploadController({ onReplace }));

    act(() => {
      result.current.handleReplace({
        stopPropagation: vi.fn(),
      } as unknown as MouseEvent<HTMLButtonElement> as unknown as MouseEvent<HTMLButtonElement>);
    });

    expect(onReplace).toHaveBeenCalled();
  });
});
