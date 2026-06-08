import { act, renderHook } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { useScrollWidth } from './useScrollWidth';

describe('useScrollWidth', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('initially returns undefined scrollWidth', () => {
    const { result } = renderHook(() => useScrollWidth());
    expect(result.current.scrollWidth).toBeUndefined();
    expect(result.current.ref).toBeDefined();
  });

  it('updates scrollWidth when ref.current has scrollWidth', () => {
    const { result } = renderHook(() => useScrollWidth());

    // Simulate setting a DOM element with scrollWidth
    act(() => {
      result.current.ref.current = { scrollWidth: 100 } as HTMLDivElement;
    });

    // Advance timers to trigger the debounced update (which runs immediately on mount)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.scrollWidth).toEqual(100);
  });

  it('updates scrollWidth when resize event fires', () => {
    // Track the captured handler
    let capturedHandler: (() => void) | null = null;

    // Mock window.addEventListener to capture the resize handler
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = vi.fn((event, handler) => {
      if (event === 'resize') {
        capturedHandler = handler as () => void;
      }
    });

    const { result } = renderHook(() => useScrollWidth());

    // Set initial scrollWidth
    act(() => {
      result.current.ref.current = { scrollWidth: 100 } as HTMLDivElement;
    });

    // Advance timers for initial load
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.scrollWidth).toEqual(100);
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));

    // Update the scrollWidth
    act(() => {
      result.current.ref.current = { scrollWidth: 200 } as HTMLDivElement;
    });

    // Trigger the resize handler
    act(() => {
      if (capturedHandler) {
        capturedHandler();
      }
      vi.advanceTimersByTime(500);
    });

    expect(result.current.scrollWidth).toEqual(200);

    // Restore
    window.addEventListener = originalAddEventListener;
  });

  it('removes event listener on cleanup', () => {
    const originalRemoveEventListener = window.removeEventListener;
    window.removeEventListener = vi.fn();

    const { unmount } = renderHook(() => useScrollWidth());
    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));

    // Restore
    window.removeEventListener = originalRemoveEventListener;
  });

  it('uses custom delay when provided', () => {
    let capturedHandler: (() => void) | null = null;
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = vi.fn((event, handler) => {
      if (event === 'resize') {
        capturedHandler = handler as () => void;
      }
    });

    const { result } = renderHook(() => useScrollWidth({ delay: 1000 }));

    // Set initial scrollWidth
    act(() => {
      result.current.ref.current = { scrollWidth: 100 } as HTMLDivElement;
    });

    // Advance timers for initial load with custom delay
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.scrollWidth).toEqual(100);

    // Update the scrollWidth
    act(() => {
      result.current.ref.current = { scrollWidth: 300 } as HTMLDivElement;
    });

    // Trigger the resize handler but don't advance enough time
    act(() => {
      if (capturedHandler) {
        capturedHandler();
      }
      vi.advanceTimersByTime(500); // Less than custom delay
    });

    // Should still be the original value
    expect(result.current.scrollWidth).toEqual(100);

    // Now advance past the custom delay
    act(() => {
      vi.advanceTimersByTime(500); // Total 1000ms
    });

    // Should now be updated
    expect(result.current.scrollWidth).toEqual(300);

    // Restore
    window.addEventListener = originalAddEventListener;
  });
});
