import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useActiveElementIndex } from '../useActiveElementIndex';

describe('useActiveElementIndex', () => {
  it('should initialize with activeElementIndex as 0', () => {
    const { result } = renderHook(() => useActiveElementIndex());

    expect(result.current.activeElementIndex).toBe(0);
    expect(typeof result.current.setActiveElementRef).toBe('function');
    expect(typeof result.current.resetActiveElementIndex).toBe('function');
  });

  it('should reset activeElementIndex to 0 when resetActiveElementIndex is called', () => {
    const { result } = renderHook(() => useActiveElementIndex());

    act(() => {
      result.current.resetActiveElementIndex();
    });

    expect(result.current.activeElementIndex).toBe(0);
  });

  it('should handle focusin events and call tabbable library', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { result } = renderHook(() => useActiveElementIndex());

    // Attach the ref to the container
    act(() => {
      result.current.setActiveElementRef(container);
    });

    act(() => {
      const focusEvent = new Event('focusin', { bubbles: true });
      Object.defineProperty(focusEvent, 'target', {
        value: document.createElement('button'),
        enumerable: true,
      });
      container.dispatchEvent(focusEvent);
    });

    expect(typeof result.current.activeElementIndex).toBe('number');

    document.body.removeChild(container);
  });

  it('should return -1 when focused element is not in tabbable list', () => {
    const container = document.createElement('div');
    const nonTabbableDiv = document.createElement('div');

    container.appendChild(nonTabbableDiv);
    document.body.appendChild(container);

    const { result } = renderHook(() => useActiveElementIndex());

    act(() => {
      result.current.setActiveElementRef(container);
    });

    // Simulate focusin on non-tabbable element
    act(() => {
      const focusEvent = new Event('focusin', { bubbles: true });
      Object.defineProperty(focusEvent, 'target', {
        value: nonTabbableDiv,
        enumerable: true,
      });
      container.dispatchEvent(focusEvent);
    });

    expect(result.current.activeElementIndex).toBe(-1);

    document.body.removeChild(container);
  });

  it('should not add event listener when ref is null', () => {
    const { result } = renderHook(() => useActiveElementIndex());

    act(() => {
      result.current.setActiveElementRef(null);
    });

    expect(result.current.activeElementIndex).toBe(0);
  });
});
