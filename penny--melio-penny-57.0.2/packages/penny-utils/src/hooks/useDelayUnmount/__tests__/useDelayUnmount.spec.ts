import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useDelayUnmount } from '../useDelayUnmount';

describe('useDelayUnmount', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should immediately return true when isOpen is true', () => {
    const { result } = renderHook(() => useDelayUnmount({ isOpen: true }));

    expect(result.current).toBeTruthy();
  });

  it('should return false after the delay when isOpen changes to false', () => {
    const { result, rerender } = renderHook(({ isOpen }) => useDelayUnmount({ isOpen, delay: 500 }), {
      initialProps: { isOpen: true },
    });

    expect(result.current).toBeTruthy();

    // Close the component
    rerender({ isOpen: false });

    expect(result.current).toBeTruthy(); // Should still be true before the timeout

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBeFalsy();
  });

  it('should remain mounted if reopened before the delay completes', () => {
    const { result, rerender } = renderHook(({ isOpen }) => useDelayUnmount({ isOpen, delay: 500 }), {
      initialProps: { isOpen: true },
    });

    expect(result.current).toBeTruthy();

    // Close the component
    rerender({ isOpen: false });

    act(() => {
      vi.advanceTimersByTime(250); // Halfway through delay
    });

    // Reopen the component before the timeout finishes
    rerender({ isOpen: true });

    expect(result.current).toBeTruthy(); // Should remain mounted

    act(() => {
      vi.advanceTimersByTime(500); // Move past original delay
    });

    expect(result.current).toBeTruthy(); // Should still be mounted
  });
});
