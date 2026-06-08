import { renderHook } from '@testing-library/react';
import { RefObject } from 'react';

import { useHasOverflow } from '../useHasOverflow';

// Mock implementation of useResizeObserver
vi.mock('./useResizeObserver', () => ({
  useResizeObserver: vi.fn().mockImplementation(() => ({ width: 100, height: 100 })),
}));

describe('useHasOverflow', () => {
  it('should return true for hasOverflowX when the element has horizontal overflow', () => {
    const ref = { current: { scrollWidth: 200, clientWidth: 100, scrollHeight: 100, clientHeight: 100 } };
    const { result } = renderHook(() => useHasOverflow(ref as RefObject<HTMLElement>));
    expect(result.current.hasOverflowX).toBe(true);
    expect(result.current.hasOverflowY).toBe(false);
  });

  it('should return true for hasOverflowY when the element has vertical overflow', () => {
    const ref = { current: { scrollWidth: 100, clientWidth: 100, scrollHeight: 200, clientHeight: 100 } };
    const { result } = renderHook(() => useHasOverflow(ref as RefObject<HTMLElement>));
    expect(result.current.hasOverflowX).toBe(false);
    expect(result.current.hasOverflowY).toBe(true);
  });

  it('should return true for both hasOverflowX and hasOverflowY when the element has both horizontal and vertical overflow', () => {
    const ref = { current: { scrollWidth: 200, clientWidth: 100, scrollHeight: 200, clientHeight: 100 } };
    const { result } = renderHook(() => useHasOverflow(ref as RefObject<HTMLElement>));
    expect(result.current.hasOverflowX).toBe(true);
    expect(result.current.hasOverflowY).toBe(true);
  });

  it('should return false for both hasOverflowX and hasOverflowY when the element does not have overflow', () => {
    const ref = { current: { scrollWidth: 100, clientWidth: 100, scrollHeight: 100, clientHeight: 100 } };
    const { result } = renderHook(() => useHasOverflow(ref as RefObject<HTMLElement>));
    expect(result.current.hasOverflowX).toBe(false);
    expect(result.current.hasOverflowY).toBe(false);
  });
});
