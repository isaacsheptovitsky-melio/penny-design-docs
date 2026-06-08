import { useEffect, useState } from 'react';

import { useDebounceCallback } from '../useDebounceCallback';

type WindowSize = {
  width?: number;
  height?: number;
};

type UseWindowSizeOptions = {
  isDisabled?: boolean;
  delay?: number;
};

// Source: https://usehooks.com/useWindowSize
export const useWindowSize = ({ isDisabled = false, delay = 500 }: UseWindowSizeOptions = {}) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useDebounceCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, delay);

  useEffect(() => {
    if (isDisabled) return;

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      setWindowSize({
        width: undefined,
        height: undefined,
      });
      window.removeEventListener('resize', handleResize);
    };
  }, [delay, isDisabled, handleResize]);

  return windowSize;
};
