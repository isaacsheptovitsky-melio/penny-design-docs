import { expect } from 'vitest';

import { renderHook } from '../../../test-utils/renderHook.utils';
import {
  breakpointsWidth,
  DEFAULT_WINDOW_HEIGHT,
  resizeScreenByBreakpointKey,
  windowResizeTo,
} from '../../../test-utils/resize-screen';
import { useBreakpoint } from '../../providers';

describe('useBreakpoint', () => {
  it('exposes the correct breakpoint key according to the largest screen size', () => {
    resizeScreenByBreakpointKey('xl');
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toEqual('xl');
    expect(result.current.isExtraLargeScreen).toBeTruthy();
  });

  it('exposes the correct breakpoint key according to screen size between 1239px to 1440px', () => {
    resizeScreenByBreakpointKey('l');
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toEqual('l');
    expect(result.current.isLargeScreen).toBeTruthy();
  });

  it('exposes the correct breakpoint key according to screen size between 904px to 1239px', () => {
    resizeScreenByBreakpointKey('m');
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toEqual('m');
    expect(result.current.isMediumScreen).toBeTruthy();
  });

  it('exposes the correct breakpoint key according to screen size between 599px to 904px', () => {
    resizeScreenByBreakpointKey('s');
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toEqual('s');
    expect(result.current.isSmallScreen).toBeTruthy();
  });

  it('exposes the correct breakpoint key according to screen size under 599px', () => {
    resizeScreenByBreakpointKey('xs');
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toEqual('xs');
    expect(result.current.isExtraSmallScreen).toBeTruthy();
  });
  it('returns defaultBreakpoint when window.innerWidth is undefined', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: undefined,
    });
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toEqual('xs');
    expect(result.current.isExtraSmallScreen).toBeTruthy();
  });
  describe('breakpoint edge cases', () => {
    it("exposes the correct breakpoint key according to smallest size of 'xl' breakpoint", () => {
      windowResizeTo(breakpointsWidth.xl, DEFAULT_WINDOW_HEIGHT);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current.breakpoint).toEqual('xl');
      expect(result.current.isExtraLargeScreen).toBeTruthy();
    });
    it("exposes the correct breakpoint key according to largest size of 'l' breakpoint / 1px smaller than 'xl'", () => {
      windowResizeTo(breakpointsWidth.xl - 1, DEFAULT_WINDOW_HEIGHT);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current.breakpoint).toEqual('l');
      expect(result.current.isLargeScreen).toBeTruthy();
    });
    it("exposes the correct breakpoint key according to smallest size of 'l' breakpoint", () => {
      windowResizeTo(breakpointsWidth.l, DEFAULT_WINDOW_HEIGHT);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current.breakpoint).toEqual('l');
      expect(result.current.isLargeScreen).toBeTruthy();
    });
    it("exposes the correct breakpoint key according to largest size of 'm' breakpoint / 1px smaller than 'l'", () => {
      windowResizeTo(breakpointsWidth.l - 1, DEFAULT_WINDOW_HEIGHT);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current.breakpoint).toEqual('m');
      expect(result.current.isMediumScreen).toBeTruthy();
    });
    it("exposes the correct breakpoint key according to smallest size of 'm' breakpoint", () => {
      windowResizeTo(breakpointsWidth.m, DEFAULT_WINDOW_HEIGHT);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current.breakpoint).toEqual('m');
      expect(result.current.isMediumScreen).toBeTruthy();
    });
    it("exposes the correct breakpoint key according to largest size of 's' breakpoint / 1px smaller than 'm'", () => {
      windowResizeTo(breakpointsWidth.m - 1, DEFAULT_WINDOW_HEIGHT);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current.breakpoint).toEqual('s');
      expect(result.current.isSmallScreen).toBeTruthy();
    });
    it("exposes the correct breakpoint key according to smallest size of 's' breakpoint", () => {
      windowResizeTo(breakpointsWidth.s, DEFAULT_WINDOW_HEIGHT);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current.breakpoint).toEqual('s');
      expect(result.current.isSmallScreen).toBeTruthy();
    });
    it("exposes the correct breakpoint key according to largest size of 'xs' breakpoint / 1px smaller than 's'", () => {
      windowResizeTo(breakpointsWidth.s - 1, DEFAULT_WINDOW_HEIGHT);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current.breakpoint).toEqual('xs');
      expect(result.current.isExtraSmallScreen).toBeTruthy();
    });
    it("exposes the correct breakpoint key according to smallest size of 'xs' breakpoint", () => {
      windowResizeTo(breakpointsWidth.xs, DEFAULT_WINDOW_HEIGHT);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current.breakpoint).toEqual('xs');
      expect(result.current.isExtraSmallScreen).toBeTruthy();
    });
  });
});
