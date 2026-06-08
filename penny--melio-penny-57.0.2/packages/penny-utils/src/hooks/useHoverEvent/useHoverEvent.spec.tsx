import { act, renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { useHoverEvent } from './useHoverEvent';

describe('useHoverEvent', () => {
  it('isHover `true` when mouse over', () => {
    const { result } = renderHook(() => useHoverEvent({}));

    act(() => {
      result.current.onMouseOver({} as never);
    });

    expect(result.current.isHover).toBeTruthy();
  });

  it('isHover `false` when mouse leave', () => {
    const { result } = renderHook(() => useHoverEvent({}));

    act(() => {
      result.current.onMouseOver({} as never);
      result.current.onMouseLeave({} as never);
    });

    expect(result.current.isHover).toBeFalsy();
  });

  it('trigger `onMouseOver` callback when mouse over', () => {
    const onMouseOverMock = vi.fn();
    const { result } = renderHook(() => useHoverEvent({ onMouseOver: onMouseOverMock }));

    act(() => {
      result.current.onMouseOver({} as never);
    });

    expect(onMouseOverMock).toBeCalled();
  });

  it('trigger `onMouseLeave` callback when mouse leave', () => {
    const onMouseLeaveMock = vi.fn();
    const { result } = renderHook(() => useHoverEvent({ onMouseLeave: onMouseLeaveMock }));

    act(() => {
      result.current.onMouseLeave({} as never);
    });

    expect(onMouseLeaveMock).toBeCalled();
  });
});
