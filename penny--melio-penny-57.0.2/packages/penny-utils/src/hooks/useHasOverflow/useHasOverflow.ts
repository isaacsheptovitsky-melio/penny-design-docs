import { RefObject, useLayoutEffect, useState } from 'react';

import { useResizeObserver } from '../useResizeObserver';

type UseHasOverflowReturn = {
  hasOverflowX: boolean;
  hasOverflowY: boolean;
};

/**
 * Returns whether the element has overflow in the X and Y axis.
 */
export const useHasOverflow = <T extends HTMLElement>(ref: RefObject<T>): UseHasOverflowReturn => {
  // TODO:https://meliorisk.atlassian.net/browse/ME-110373
  const { width, height } = useResizeObserver({ ref });
  // eslint-disable-next-line react-hooks/refs
  const element = ref.current;

  // eslint-disable-next-line react-hooks/refs
  const scrollWidth = ref.current?.scrollWidth;
  // eslint-disable-next-line react-hooks/refs
  const clientWidth = ref.current?.clientWidth;
  const [hasOverflowX, setHasOverflowX] = useState(false);

  useLayoutEffect(() => {
    if (!element || !scrollWidth || !clientWidth) return;

    setHasOverflowX(scrollWidth > clientWidth);
    // We need to track `clientWidth` as it may change after first render.
    // eslint-disable-next-line react-hooks/refs
  }, [clientWidth, element, scrollWidth, width]);

  // eslint-disable-next-line react-hooks/refs
  const scrollHeight = ref.current?.scrollHeight;
  // eslint-disable-next-line react-hooks/refs
  const clientHeight = ref.current?.clientHeight;
  const [hasOverflowY, setHasOverflowY] = useState(false);

  useLayoutEffect(() => {
    if (!element || !scrollHeight || !clientHeight) return;

    setHasOverflowY(scrollHeight > clientHeight);
    // We need to track `clientHeight` as it may change after first render.
    // eslint-disable-next-line react-hooks/refs
  }, [clientHeight, element, scrollHeight, height]);

  return { hasOverflowX, hasOverflowY };
};
