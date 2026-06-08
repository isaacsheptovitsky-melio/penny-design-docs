import { act, renderHook } from '@testing-library/react';
import { type FocusEvent } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useFileUploadFocus } from '../useFileUploadFocus';

vi.mock('@melio/penny-utils', () => ({
  useAutoFocus: vi.fn(),
}));

describe('useFileUploadFocus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state and a ref', () => {
    const { result } = renderHook(() => useFileUploadFocus({}));

    expect(result.current.isInputFocuseVisible).toBe(false);
    expect(result.current.inputRef).toBeDefined();
    expect(typeof result.current.onFocus).toBe('function');
    expect(typeof result.current.onBlur).toBe('function');
  });

  it('should update focus state on focus and blur', () => {
    const { result } = renderHook(() => useFileUploadFocus({}));

    act(() => {
      result.current.onFocus?.({} as FocusEvent<HTMLInputElement>);
    });
    expect(result.current.isInputFocuseVisible).toBe(true);

    act(() => {
      result.current.onBlur?.({} as FocusEvent<HTMLInputElement>);
    });
    expect(result.current.isInputFocuseVisible).toBe(false);
  });

  it('should call onFocus and onBlur callbacks if provided', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const { result } = renderHook(() => useFileUploadFocus({ onFocus, onBlur }));

    const fakeFocusEvent = {} as FocusEvent<HTMLInputElement>;

    act(() => {
      result.current.onFocus?.(fakeFocusEvent);
    });
    expect(onFocus).toHaveBeenCalledWith(fakeFocusEvent);

    act(() => {
      result.current.onBlur?.(fakeFocusEvent);
    });
    expect(onBlur).toHaveBeenCalledWith(fakeFocusEvent);
  });
});
