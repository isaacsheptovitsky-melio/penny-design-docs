import _useResizeObserver from 'use-resize-observer';

type UseResizeObserveOptions<T extends HTMLElement> = Parameters<typeof _useResizeObserver<T>>[0];

/**
 * A wrapper for [`use-resize-observer`](https://github.com/ZeeCoder/use-resize-observer).
 */
export const useResizeObserver = <T extends HTMLElement>(options: UseResizeObserveOptions<T>) =>
  _useResizeObserver(options);
