/**
 * Stub for @melio/penny-utils — only the subset used by the vendored components.
 */
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

import { cloneDeep, unionBy } from 'es-toolkit';
import { get, merge } from 'es-toolkit/compat';

// ─── Re-exports from es-toolkit ──────────────────────────────────────────────

export { cloneDeep, get, merge, unionBy };

// ─── Misc ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noop = (..._args: any[]): void => {
  // does nothing
};

// ─── Types ───────────────────────────────────────────────────────────────────

export type TestIdProp = {
  'data-testid'?: string;
};

export type GetTestId = (...childNames: (string | number | false | null | undefined)[]) => TestIdProp;

// ─── Core utils ──────────────────────────────────────────────────────────────

let _counter = 0;
export const uniqueId = (prefix = ''): string => `${prefix}${++_counter}`;

// ─── User-agent ───────────────────────────────────────────────────────────────

export const isMobileAndroid = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /android/i.test(navigator.userAgent);
};

export const isAndroid = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};

export const isMobileIOS = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
};

export const isWindowsOS = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Win/i.test(navigator.userAgent);
};

export const isMobileDevice = (): boolean => isMobileIOS() || isMobileAndroid();

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const useTestId = (componentName: string): GetTestId => {
  return useCallback(
    (...childNames: (string | number | false | null | undefined)[]) => {
      const dataTestId = [componentName, ...childNames]
        .filter((v) => v === 0 || Boolean(v))
        .map(String)
        .join('-');
      return { 'data-testid': dataTestId };
    },
    [componentName]
  );
};

export const useHasOverflow = <T extends HTMLElement>(
  ref: RefObject<T>
): { hasOverflowX: boolean; hasOverflowY: boolean } => {
  const [hasOverflowX, setHasOverflowX] = useState(false);
  const [hasOverflowY, setHasOverflowY] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setHasOverflowX(el.scrollWidth > el.clientWidth);
    setHasOverflowY(el.scrollHeight > el.clientHeight);
  });

  return { hasOverflowX, hasOverflowY };
};

export const useResizeObserver = (_opts: { ref: RefObject<HTMLElement> }) => ({
  width: undefined as number | undefined,
  height: undefined as number | undefined,
});

export const useWindowSize = () => {
  const [size] = useState({ width: window.innerWidth, height: window.innerHeight });
  return size;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounceCallback = <T extends (...args: any[]) => any>(callback: T, _delay: number): T => callback;

export const useEventListener = (
  _eventName: string,
  _handler: (e: Event) => void,
  _element?: RefObject<EventTarget> | null
) => {};

type UseBooleanResult = [
  boolean,
  {
    on: VoidFunction;
    off: VoidFunction;
    toggle: VoidFunction;
  },
];

export const useBoolean = (defaultValue = false): UseBooleanResult => {
  const [state, setState] = useState(defaultValue);
  return [
    state,
    {
      on: () => setState(true),
      off: () => setState(false),
      toggle: () => setState((prev) => !prev),
    },
  ];
};

/**
 * Delays the unmounting of a component to allow animations to complete.
 */
export const useDelayUnmount = ({ isOpen, delay = 500 }: { isOpen: boolean; delay?: number }): boolean => {
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isOpen) {
      setIsMounted(true);
    } else {
      timeoutId = setTimeout(() => setIsMounted(false), delay);
    }
    return () => clearTimeout(timeoutId);
  }, [delay, isOpen]);

  return isMounted;
};

export const useDelayMount = ({ isOpen, delay = 0 }: { isOpen: boolean; delay?: number }): boolean => {
  const [mounted, setMounted] = useState(isOpen);
  useLayoutEffect(() => {
    if (isOpen) {
      setMounted(true);
      return;
    }
    const id = setTimeout(() => setMounted(false), delay);
    return () => clearTimeout(id);
  }, [isOpen, delay]);
  return mounted;
};

// ─── Intl ────────────────────────────────────────────────────────────────────
// Minimal stub of the real `useIntl` — only the subset used by vendored components.
export type Currency = string;

export const useIntl = () => ({
  formatNumberToParts: (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat('en-US', options).formatToParts(value),
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat('en-US', options).format(value),
});
