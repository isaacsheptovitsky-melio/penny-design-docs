import { useEventListener, useResizeObserver } from '@melio/penny-utils';
import { type RefObject, useCallback, useEffect, useState } from 'react';

type UseScrollBordersReturnType = {
  isOverflowY: boolean;
  scrollAtTop: boolean;
  scrollAtBottom: boolean;
  isOverflowX: boolean;
  scrollAtLeft: boolean;
  scrollAtRight: boolean;
  isMounted: boolean;
};

export const useScrollBorders = <T extends HTMLElement>({ ref }: { ref: RefObject<T> }): UseScrollBordersReturnType => {
  const [isOverflowY, setIsOverflowY] = useState(false);
  const [scrollAtTop, setScrollAtTop] = useState(false);
  const [scrollAtBottom, setScrollAtBottom] = useState(false);

  const [isOverflowX, setIsOverflowX] = useState(false);
  const [scrollAtLeft, setScrollAtLeft] = useState(false);
  const [scrollAtRight, setScrollAtRight] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { width, height } = useResizeObserver({ ref });
  const element = ref.current;

  useEffect(() => {
    if (element) {
      const isOverflowY_ = element.scrollHeight > element.clientHeight;
      const isOverflowX_ = element.scrollWidth > element.clientWidth;

      setIsOverflowY(isOverflowY_);
      setIsOverflowX(isOverflowX_);
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/immutability
      calculateScrollBorders(element);
      setIsMounted(true);
    }
  }, [element, width, height]);

  const calculateScrollBorders = (element: HTMLElement) => {
    setScrollAtTop(element.scrollTop === 0);
    setScrollAtBottom(element.scrollHeight - Math.ceil(element.scrollTop) === element.clientHeight);

    setScrollAtLeft(element.scrollLeft === 0);
    setScrollAtRight(element.scrollWidth - Math.ceil(element.scrollLeft) === element.clientWidth);
  };

  const onScroll = useCallback((event: Event) => {
    calculateScrollBorders(event.target as HTMLElement);
  }, []);

  useEventListener({ ref, eventName: 'scroll', callback: onScroll });

  return {
    isOverflowY,
    scrollAtTop,
    scrollAtBottom,
    isOverflowX,
    scrollAtLeft,
    scrollAtRight,
    isMounted,
  };
};
