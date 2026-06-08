import { act, renderHook } from '@testing-library/react';

import { useDebounceCallback } from './useDebounceCallback';

describe('useDebounceCallback', () => {
  it('debounces the invocation to the callback', () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const { result } = renderHook(() => useDebounceCallback(callback));

    // Invoke the debounced callback.
    result.current();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('debounces the invocation to the callback by a custom delay', () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const { result } = renderHook(() => useDebounceCallback(callback, 600));

    // Invoke the debounced callback.
    result.current();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
