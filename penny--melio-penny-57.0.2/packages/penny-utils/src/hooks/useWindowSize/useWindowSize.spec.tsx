import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { expect, vi } from 'vitest';

import { useWindowSize } from './useWindowSize';

vi.mock('react', async (importOriginal) => {
  const react = await importOriginal<typeof import('react')>();
  return {
    ...react,
    useState: vi.fn(),
  };
});

describe('useWindowSize', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  let events: Record<string, () => void> = {};

  beforeEach(() => {
    events = {};
    window.addEventListener = vi.fn().mockImplementation((event, handler) => {
      if (event === 'resize' && typeof handler === 'function') {
        events[event as string] = handler as () => void;
      }
    });
    window.removeEventListener = vi.fn();

    const mockState = {
      width: originalInnerWidth,
      height: originalInnerHeight,
    };
    const mockSetState = vi.fn((newState) => {
      Object.assign(mockState, newState);
    });
    vi.mocked(useState).mockReturnValue([mockState, mockSetState]);
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Restore original window dimensions
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight });
  });

  it('adds event listener when not disabled', () => {
    renderHook(() => useWindowSize());
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('does not add event listener when isDisabled is true', () => {
    renderHook(() => useWindowSize({ isDisabled: true }));
    expect(window.addEventListener).not.toHaveBeenCalled();
  });

  it('updates window dimensions when resize event fires', () => {
    vi.useFakeTimers();

    try {
      const { result } = renderHook(() => useWindowSize());

      expect(result.current).toEqual({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      Object.defineProperty(window, 'innerWidth', { value: 1024 });
      Object.defineProperty(window, 'innerHeight', { value: 768 });

      act(() => {
        events['resize']?.();
        vi.advanceTimersByTime(500); // Default delay
      });

      expect(result.current).toEqual({
        width: 1024,
        height: 768,
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it('respects custom delay when provided', () => {
    vi.useFakeTimers();

    try {
      const { result } = renderHook(() => useWindowSize({ delay: 1000 }));

      Object.defineProperty(window, 'innerWidth', { value: 1024 });
      Object.defineProperty(window, 'innerHeight', { value: 768 });

      // Trigger resize but don't advance enough time
      act(() => {
        events['resize']?.();
        vi.advanceTimersByTime(500); // Less than custom delay
      });

      // Should still have original dimensions
      expect(result.current).toEqual({
        width: originalInnerWidth,
        height: originalInnerHeight,
      });

      // Now advance past the custom delay
      act(() => {
        vi.advanceTimersByTime(500); // Total 1000ms
      });

      // Should now be updated
      expect(result.current).toEqual({
        width: 1024,
        height: 768,
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it('resets dimensions and removes event listener on unmount', () => {
    const mockState = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const mockSetState = vi.fn((newState) => {
      Object.assign(mockState, newState);
    });
    vi.mocked(useState).mockReturnValueOnce([mockState, mockSetState]);

    let resizeHandler: (() => void) | undefined = undefined;
    window.addEventListener = vi.fn().mockImplementation((event, handler) => {
      if (event === 'resize' && typeof handler === 'function') {
        events[event as string] = handler as () => void;
        resizeHandler = handler as () => void;
      }
    });

    const { unmount } = renderHook(() => useWindowSize());

    expect(mockState.width).toBeDefined();
    expect(mockState.height).toBeDefined();

    unmount();

    expect(mockSetState).toHaveBeenCalledWith({
      width: undefined,
      height: undefined,
    });
    expect(mockState).toEqual({
      width: undefined,
      height: undefined,
    });
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', resizeHandler);
  });
});
