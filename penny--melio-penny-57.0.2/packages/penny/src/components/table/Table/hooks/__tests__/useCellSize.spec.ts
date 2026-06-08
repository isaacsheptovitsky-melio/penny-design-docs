import { expect } from 'vitest';

import { renderHook } from '@/test-utils/renderHook.utils';
import { resizeScreenByBreakpointKey } from '@/test-utils/resize-screen';

import { useCellSize } from '../useCellSize';

describe('_useCellSize', () => {
  describe('gets the correct cell size for extra large screen size', () => {
    it('should return the correct cell size for large cell size', () => {
      resizeScreenByBreakpointKey('xl');
      const { result } = renderHook(() => useCellSize('l'));
      expect(result.current).toEqual('l');
    });

    it('should return the correct cell size for medium cell size', () => {
      resizeScreenByBreakpointKey('xl');
      const { result } = renderHook(() => useCellSize('m'));
      expect(result.current).toEqual('m');
    });

    it('should return the correct cell size for small cell size', () => {
      resizeScreenByBreakpointKey('xl');
      const { result } = renderHook(() => useCellSize('s'));
      expect(result.current).toEqual('s');
    });

    it('should return the correct cell size for extra small cell size', () => {
      resizeScreenByBreakpointKey('xl');
      const { result } = renderHook(() => useCellSize('xs'));
      expect(result.current).toEqual('xs');
    });

    it('should return the correct cell size for fixed cell size', () => {
      resizeScreenByBreakpointKey('xl');
      const { result } = renderHook(() => useCellSize(120));
      expect(result.current).toEqual(120);
    });
  });

  describe('gets the correct cell size for extra small up to large screen size', () => {
    it('should return the correct cell size for large cell size', () => {
      resizeScreenByBreakpointKey('l');
      const { result } = renderHook(() => useCellSize('l'));
      expect(result.current).toEqual('l');
    });

    it('should return the correct cell size for medium cell size', () => {
      resizeScreenByBreakpointKey('l');
      const { result } = renderHook(() => useCellSize('m'));
      expect(result.current).toEqual('m');
    });

    it('should return the correct cell size for small cell size', () => {
      resizeScreenByBreakpointKey('l');
      const { result } = renderHook(() => useCellSize('s'));
      expect(result.current).toEqual('s');
    });

    it('should return the correct cell size for extra small cell size', () => {
      resizeScreenByBreakpointKey('l');
      const { result } = renderHook(() => useCellSize('xs'));
      expect(result.current).toEqual('xs');
    });

    it('should return the correct cell size for fixed cell size', () => {
      resizeScreenByBreakpointKey('l');
      const { result } = renderHook(() => useCellSize(120));
      expect(result.current).toEqual(120);
    });
  });
});
