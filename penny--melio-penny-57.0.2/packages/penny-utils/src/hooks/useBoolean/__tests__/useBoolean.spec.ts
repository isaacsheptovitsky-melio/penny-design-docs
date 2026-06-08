import { act, renderHook } from '@testing-library/react';

import { useBoolean } from '../useBoolean';

describe('useBoolean', () => {
  it('sets the default value to `false`', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toBe(false);
  });

  it('respects the `initialValue` argument', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current[0]).toBe(true);
  });

  it('updates value to `false` when calling `off()`', () => {
    const { result } = renderHook(() => useBoolean(true));
    act(() => result.current[1].off());
    expect(result.current[0]).toBe(false);
  });

  it('updates value to `true` when calling `on()`', () => {
    const { result } = renderHook(() => useBoolean());
    act(() => result.current[1].on());
    expect(result.current[0]).toBe(true);
  });

  it('toggles value  when calling `toggle()`', () => {
    const { result } = renderHook(() => useBoolean());
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);
  });
});
