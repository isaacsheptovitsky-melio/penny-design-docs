import { expect } from 'vitest';

import { renderHook } from '../../../test-utils/renderHook.utils';
import { resizeScreenByBreakpointKey } from '../../../test-utils/resize-screen';
import { sortBreakpoints, useBreakpointValue } from '../useBreakpointValue';

describe('useBreakpointValue', () => {
  it('exposes the correct value according to the largest screen size', () => {
    resizeScreenByBreakpointKey('xl');
    const { result } = renderHook(() => useBreakpointValue({ xs: 'red', s: 'yellow' }));
    expect(result.current).toEqual('yellow');
  });
  it('exposes the correct value according to the smallest screen size', () => {
    resizeScreenByBreakpointKey('xs');
    const { result } = renderHook(() => useBreakpointValue({ xs: 'red', s: 'blue', m: 'yellow' }));
    expect(result.current).toEqual('red');
  });
  it("exposes the correct value according to 's' breakpoint", () => {
    resizeScreenByBreakpointKey('s');
    const { result } = renderHook(() => useBreakpointValue({ xs: 'red', s: 'blue', m: 'yellow' }));
    expect(result.current).toEqual('blue');
  });
  it('returns closest provided value for smallest screens', () => {
    resizeScreenByBreakpointKey('xs');
    const { result } = renderHook(() => useBreakpointValue({ xl: true, s: false }));
    expect(result.current).toBeFalsy();
  });
  it('returns closest provided value for biggest screens', () => {
    resizeScreenByBreakpointKey('xl');
    const { result } = renderHook(() => useBreakpointValue({ l: true, s: false }));
    expect(result.current).toBeTruthy();
  });
  it("returns defaultBreakpoint's value when window.innerWidth is undefined", () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: undefined,
    });
    const { result } = renderHook(() => useBreakpointValue({ xl: 'red', s: 'blue' }));
    expect(result.current).toEqual('blue');
  });
  it("returns the provided defaultBreakpoint's value when window.innerWidth is undefined", () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: undefined,
    });
    const { result } = renderHook(() => useBreakpointValue({ xs: 'red', s: 'blue' }));
    expect(result.current).toEqual('red');
  });
  describe('useBreakpointValue sortBreakpoints', () => {
    const keysOrder = ['xs', 's', 'm', 'l', 'xl'];
    it('sorts the provided value according to the themeBreakpoints', () => {
      const sorted = sortBreakpoints({
        xl: 'extra-large',
        m: 'medium',
        xs: 'extra-small',
        l: 'large',
        s: 'small',
      });
      expect(Object.keys(sorted)).toEqual(keysOrder);
    });
    it('sorts and complete the missing breakpoints with the matched closest values according to the provided object', () => {
      const sorted = sortBreakpoints({
        l: 'large',
        m: 'medium',
        s: 'small',
      });
      expect(Object.keys(sorted)).toEqual(keysOrder);
      expect(Object.values(sorted)).toEqual(['small', 'small', 'medium', 'large', 'large']);
    });
  });
});
