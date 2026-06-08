import { act, renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { useActiveEvent } from './useActiveEvent';

describe('useActiveEvent', () => {
  it('isActive `true` when mouse down', () => {
    const { result } = renderHook(() => useActiveEvent({}));

    act(() => {
      result.current.onMouseDown({} as never);
    });

    expect(result.current.isActive).toBeTruthy();
  });

  it('isActive `false` when mouse up', () => {
    const { result } = renderHook(() => useActiveEvent({}));

    act(() => {
      result.current.onMouseDown({} as never);
      result.current.onMouseUp({} as never);
    });

    expect(result.current.isActive).toBeFalsy();
  });

  it('trigger `onMouseDown` callback when mouse down', () => {
    const onMouseDownMock = vi.fn();
    const { result } = renderHook(() => useActiveEvent({ onMouseDown: onMouseDownMock }));

    act(() => {
      result.current.onMouseDown({} as never);
    });

    expect(onMouseDownMock).toBeCalled();
  });

  it('trigger `onMouseUp` callback when mouse up', () => {
    const onMouseUpMock = vi.fn();
    const { result } = renderHook(() => useActiveEvent({ onMouseUp: onMouseUpMock }));

    act(() => {
      result.current.onMouseUp({} as never);
    });

    expect(onMouseUpMock).toBeCalled();
  });
});
