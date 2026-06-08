import { renderHook } from '@testing-library/react';
import { RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useEventListener } from '../useEventListener';

describe('useEventListener', () => {
  it('should add event listener when ref has an element', () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const mockElement = { addEventListener, removeEventListener };
    const ref = { current: mockElement };
    const callback = vi.fn();

    renderHook(() =>
      useEventListener({
        ref: ref as unknown as RefObject<HTMLElement>,
        eventName: 'click',
        callback,
      })
    );

    expect(addEventListener).toHaveBeenCalledWith('click', callback);
  });

  it('should remove event listener on cleanup', () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const mockElement = { addEventListener, removeEventListener };
    const ref = { current: mockElement };
    const callback = vi.fn();

    const { unmount } = renderHook(() =>
      useEventListener({
        ref: ref as unknown as RefObject<HTMLElement>,
        eventName: 'click',
        callback,
      })
    );

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('click', callback);
  });

  it('should not add event listener when ref is null', () => {
    const addEventListener = vi.fn();
    const ref = { current: null };
    const callback = vi.fn();

    renderHook(() =>
      useEventListener({
        ref: ref as RefObject<HTMLElement>,
        eventName: 'click',
        callback,
      })
    );

    expect(addEventListener).not.toHaveBeenCalled();
  });

  it.each<keyof HTMLElementEventMap>(['click', 'keydown', 'mouseenter', 'focus', 'blur'])(
    'should handle %s event type',
    (eventName) => {
      const addEventListener = vi.fn();
      const removeEventListener = vi.fn();
      const mockElement = { addEventListener, removeEventListener };
      const ref = { current: mockElement };
      const callback = vi.fn();

      renderHook(() =>
        useEventListener({
          ref: ref as unknown as RefObject<HTMLElement>,
          eventName,
          callback,
        })
      );

      expect(addEventListener).toHaveBeenCalledWith(eventName, callback);
    }
  );

  it('should re-attach listener when parameters change', () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const mockElement = { addEventListener, removeEventListener };
    const ref = { current: mockElement };
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { rerender } = renderHook(
      ({ callback }) =>
        useEventListener({
          ref: ref as unknown as RefObject<HTMLElement>,
          eventName: 'click',
          callback,
        }),
      { initialProps: { callback: callback1 } }
    );

    expect(addEventListener).toHaveBeenCalledWith('click', callback1);

    rerender({ callback: callback2 });

    expect(removeEventListener).toHaveBeenCalledWith('click', callback1);
    expect(addEventListener).toHaveBeenCalledWith('click', callback2);
  });
});
