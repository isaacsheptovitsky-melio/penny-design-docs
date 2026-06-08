import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useDelayMount } from '../useDelayMount';

describe('useDelayMount', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should immediately return false when isOpen is false', () => {
    const { result } = renderHook(() => useDelayMount({ isOpen: false }));

    // The component should not be mounted initially
    expect(result.current).toBeFalsy();
  });

  it('should return true after the delay when isOpen changes to true', () => {
    const { result, rerender } = renderHook(({ isOpen }) => useDelayMount({ isOpen, delay: 500 }), {
      initialProps: { isOpen: false },
    });

    // Initially, it should be false
    expect(result.current).toBeFalsy();

    // Open the component
    rerender({ isOpen: true });

    // It should stay false until the delay completes
    expect(result.current).toBeFalsy();

    // Advance time by the delay
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // After the delay, it should return true
    expect(result.current).toBeTruthy();
  });

  it('should remain false if isOpen is set to false again before the delay completes', () => {
    const { result, rerender } = renderHook(({ isOpen }) => useDelayMount({ isOpen, delay: 500 }), {
      initialProps: { isOpen: false },
    });

    // Initially, it should be false
    expect(result.current).toBeFalsy();

    // Open the component
    rerender({ isOpen: true });

    // It should remain false until the delay completes
    expect(result.current).toBeFalsy();

    // Close the component before the delay finishes
    rerender({ isOpen: false });

    // It should still be false since it hasn't completed the delay
    expect(result.current).toBeFalsy();

    // Advance time by the delay
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Since the component was closed before the delay completed, it should stay false
    expect(result.current).toBeFalsy();
  });
});
