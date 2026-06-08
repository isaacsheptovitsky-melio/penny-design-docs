import { expect } from 'vitest';

import { renderHook } from '@/test-utils/renderHook.utils';
import { resizeScreenByBreakpointKey } from '@/test-utils/resize-screen';

import { useDrawerSize } from '../useDrawerSize';

describe('useDrawerSize', () => {
  it('returns string value for screen size "xs" when given responsive values', () => {
    resizeScreenByBreakpointKey('xs');
    const { result } = renderHook(() => useDrawerSize({ xs: '10px', s: '100px' }));
    expect(result.current).toEqual('10px');
  });
  it('returns string value for screen size "xs" when given numric value', () => {
    resizeScreenByBreakpointKey('xs');
    const { result } = renderHook(() => useDrawerSize(300));
    expect(result.current).toEqual('300px');
  });
  it('returns string value for screen size "m" when given preset value', () => {
    resizeScreenByBreakpointKey('m');
    const { result } = renderHook(() => useDrawerSize('s'));
    expect(result.current).toEqual('480px');
  });
});
