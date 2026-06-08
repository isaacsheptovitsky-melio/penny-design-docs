import { act } from '@testing-library/react';
import { type ChangeEvent, type MouseEvent } from 'react';
import { expect, type Mock, vi } from 'vitest';

import { renderHook } from '@/test-utils/renderHook.utils';

import { isAcceptedType } from '../helpers/get-input-file-accept';
import { useFileUpload } from '../useFileUpload';

vi.mock('../helpers/get-input-file-accept', () => ({
  isAcceptedType: vi.fn(),
}));

describe('useFileUpload', () => {
  const createFile = (name = 'test.png', type = 'image/png') => new File(['file content'], name, { type });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with given value', () => {
    const mockFile = createFile();
    const { result } = renderHook(() =>
      useFileUpload({
        value: mockFile,
      })
    );

    expect(result.current.file).toBe(mockFile);
    expect(result.current.error).toBeNull();
    expect(result.current.isInvalid).toBe(false);
  });

  it('calls onClick to trigger inputRef click', async () => {
    const { result } = renderHook(() =>
      useFileUpload({
        value: null,
      })
    );

    const input = document.createElement('input');
    result.current.inputProps.ref.current = input;
    const clickSpy = vi.spyOn(input, 'click');

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      result.current.onClick({
        target: input,
        stopPropagation: vi.fn(),
      } as unknown as MouseEvent<HTMLInputElement>);
    });

    expect(clickSpy).toHaveBeenCalled();
  });

  it('handles valid file upload and calls onChange', async () => {
    const file = new File(['file content'], 'test.png', { type: 'image/png' });
    (isAcceptedType as Mock).mockResolvedValue(true);
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useFileUpload({
        value: null,
        onChange,
      })
    );

    const input = { files: [file] } as unknown as HTMLInputElement;

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      result.current.inputProps.onChange({
        target: input,
        stopPropagation: vi.fn(),
      } as unknown as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.file).toEqual(file);
    expect(result.current.error).toBeNull();
    expect(onChange).toHaveBeenCalledWith(file);
  });

  it('handles file with invalid type', async () => {
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    (isAcceptedType as Mock).mockResolvedValue(false);

    const { result } = renderHook(() =>
      useFileUpload({
        value: null,
        invalidFileTypeErrorMessage: 'Not supported',
      })
    );

    const mockInputEvent = {
      target: { files: [file] },
      stopPropagation: vi.fn(),
    } as unknown as ChangeEvent<HTMLInputElement>;

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      result.current.inputProps.onChange(mockInputEvent);
    });

    expect(result.current.file).toBeNull();

    expect(result.current.error).toBe('Not supported');

    expect(result.current.isInvalid).toBe(true);
  });

  it('handles custom validator returning an error', async () => {
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    (isAcceptedType as Mock).mockResolvedValue(true);

    const validator = vi.fn().mockResolvedValue('Custom error');
    const { result } = renderHook(() =>
      useFileUpload({
        value: null,
        validator,
      })
    );

    const mockInputEvent = {
      target: { files: [file] },
      stopPropagation: vi.fn(),
    } as unknown as ChangeEvent<HTMLInputElement>;

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      result.current.inputProps.onChange(mockInputEvent);
    });

    expect(validator).toHaveBeenCalledWith(file);
    expect(result.current.file).toBeNull();
    expect(result.current.error).toBe('Custom error');
  });

  it('handles delete correctly', () => {
    const file = createFile();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useFileUpload({
        value: file,
        onChange,
      })
    );

    const input = document.createElement('input');
    input.value = 'something';
    result.current.inputProps.ref.current = input;

    act(() => {
      result.current.onDelete();
    });

    expect(result.current.file).toBeNull();
    expect(result.current.error).toBeNull();
    expect(input.value).toBe('');
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('updates file state when value changes from the outside', () => {
    const initialFile = createFile('initial.png');
    const updatedFile = createFile('updated.png');

    const { result, rerender } = renderHook(
      (props: { value: File | null }) =>
        useFileUpload({
          value: props?.value ?? null,
        }),
      {
        initialProps: { value: initialFile },
      }
    );

    expect(result.current.file).toBe(initialFile);

    // Rerender with new value
    rerender({ value: updatedFile });

    expect(result.current.file).toBe(updatedFile);

    // Rerender with null to simulate external reset
    rerender();

    expect(result.current.file).toBeNull();
  });
});
