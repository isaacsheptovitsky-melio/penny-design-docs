import { act, renderHook } from '@testing-library/react';
import { type FocusEvent, type KeyboardEvent, type MouseEvent } from 'react';
import { expect } from 'vitest';

import { useActionArea } from '../useActionArea';

describe('useActionArea Hook', () => {
  it('should return default containerProps and actionAreaProps', () => {
    const { result } = renderHook(() => useActionArea());

    expect(result.current.containerProps).toEqual({
      'data-hover': null,
      'data-focus-visible': null,
      id: 'action-area-1',
    });

    expect(result.current.actionAreaProps).toHaveProperty('aria-labelledby');
    expect(result.current.actionAreaProps['aria-labelledby']).toEqual('action-area-1');
  });

  it('should set data-hover to true on mouse enter', () => {
    const { result } = renderHook(() => useActionArea());
    const { onMouseEnter } = result.current.actionAreaProps;

    act(() => {
      onMouseEnter?.({} as MouseEvent<HTMLButtonElement>);
    });

    expect(result.current.containerProps['data-hover']).toBeTruthy();
  });

  it('should set data-hover to null on mouse leave', () => {
    const firstRunHook = renderHook(() => useActionArea());
    const { onMouseEnter, onMouseLeave } = firstRunHook.result.current.actionAreaProps;

    act(() => {
      onMouseEnter?.({
        currentTarget: { getBoundingClientRect: vi.fn(() => ({ left: 0, top: 0, right: 100, bottom: 100 })) },
      } as unknown as MouseEvent<HTMLButtonElement>);
    });

    expect(firstRunHook.result.current.containerProps['data-hover']).toBeTruthy();

    act(() => {
      onMouseLeave?.({
        clientX: 200,
        clientY: 200,
        currentTarget: { getBoundingClientRect: vi.fn(() => ({ left: 0, top: 0, right: 100, bottom: 100 })) },
      } as unknown as MouseEvent<HTMLButtonElement>);
    });

    const updatedRunHook = renderHook(() => useActionArea());
    expect(updatedRunHook.result.current.containerProps['data-hover']).toBeNull();
  });

  it('should set data-focus-visible on focus from keyboard', () => {
    const { result } = renderHook(() => useActionArea());
    const { onKeyDown, onFocus } = result.current.actionAreaProps;

    act(() => {
      onKeyDown?.({ code: 'Tab' } as KeyboardEvent<HTMLButtonElement>);
      onFocus?.({} as FocusEvent<HTMLButtonElement>);
    });

    expect(result.current.containerProps['data-focus-visible']).toBeTruthy();
  });

  it('should not set data-focus-visible on focus from mouse', () => {
    const firstRunHook = renderHook(() => useActionArea());
    const { onMouseDown, onFocus } = firstRunHook.result.current.actionAreaProps;

    act(() => {
      onMouseDown?.({ currentTarget: { blur: vi.fn() } } as unknown as MouseEvent<HTMLButtonElement>);
      onFocus?.({ currentTarget: document.createElement('button') } as FocusEvent<HTMLButtonElement>);
    });

    const updatedRunHook = renderHook(() => useActionArea());
    expect(updatedRunHook.result.current.containerProps['data-focus-visible']).toBeNull();
  });

  it('should call onClick when Space or Enter is pressed', () => {
    const onClick = vi.fn();
    const { result } = renderHook(() => useActionArea({ onClick }));

    const { onKeyDown } = result.current.actionAreaProps;

    act(() => {
      onKeyDown?.({ code: 'Space', preventDefault: vi.fn() } as unknown as KeyboardEvent<HTMLButtonElement>);
      onKeyDown?.({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent<HTMLButtonElement>);
    });

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should not trigger interactions when isDisabled is true', () => {
    const onClick = vi.fn();
    const { result } = renderHook(() => useActionArea({ onClick, isDisabled: true }));

    const { onKeyDown, onMouseEnter, onClick: clickHandler } = result.current.actionAreaProps;

    act(() => {
      onMouseEnter?.({} as MouseEvent<HTMLButtonElement>);
      onKeyDown?.({ code: 'Space', preventDefault: vi.fn() } as unknown as KeyboardEvent<HTMLButtonElement>);
      clickHandler?.({} as MouseEvent<HTMLButtonElement>);
    });

    expect(result.current.containerProps['data-hover']).toBeNull();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should call onBlur and clear focus-visible on blur', () => {
    const onBlur = vi.fn();
    const { result } = renderHook(() => useActionArea({ onBlur }));

    const { onFocus, onBlur: blurHandler } = result.current.actionAreaProps;

    act(() => {
      onFocus?.({} as FocusEvent<HTMLButtonElement>);
      blurHandler?.({} as FocusEvent<HTMLButtonElement>);
    });

    expect(result.current.containerProps['data-focus-visible']).toBeNull();
    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle refs correctly', () => {
    const { result } = renderHook(() => useActionArea());
    expect(result.current.actionAreaProps.ref).toBeDefined();
  });
});
