import { useEffect, useRef, useState } from 'react';

import { useDebounceCallback } from '../useDebounceCallback';

type UseScrollWidthOptions = {
  delay?: number;
};

export const useScrollWidth = (options: UseScrollWidthOptions = {}) => {
  const { delay = 500 } = options;
  const [scrollWidth, setScrollWidth] = useState<number | undefined>();
  const ref = useRef<HTMLDivElement | null>(null);

  const updateScrollWidth = useDebounceCallback(() => {
    setScrollWidth(ref.current?.scrollWidth);
  }, delay);

  useEffect(() => {
    window.addEventListener('resize', updateScrollWidth);
    updateScrollWidth();

    return () => window.removeEventListener('resize', updateScrollWidth);
  }, [updateScrollWidth]);

  return {
    ref,
    scrollWidth,
  };
};
