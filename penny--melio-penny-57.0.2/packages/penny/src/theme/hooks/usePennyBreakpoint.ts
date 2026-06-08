import { useWindowSize } from '@melio/penny-utils';
import { useMemo } from 'react';

import { themeBreakpoints, type ThemeBreakpointsKey } from '../foundations/breakpoints';

export type UseBreakpointOptions = {
  defaultBreakpoint?: ThemeBreakpointsKey;
  debounce?: number;
};

export const usePennyBreakpoint = (options: UseBreakpointOptions = {}): ThemeBreakpointsKey => {
  const { defaultBreakpoint = 'xs', debounce = 500 }: UseBreakpointOptions = options;
  const { width: screenWidth } = useWindowSize({ delay: debounce });

  const getScreenCurrentBreakpoint = (screenSize: number) => {
    let matchBreakpoint: ThemeBreakpointsKey | undefined;
    const keys = Object.keys(themeBreakpoints);
    const values = Object.values(themeBreakpoints);
    let index = 0;

    // Iterate through breakpoints to find the matching size
    for (const value of values) {
      const currentBreakpointValue = parseInt(value, 10);
      const nextBreakpointValue = parseInt(values[index + 1] ?? themeBreakpoints.xl, 10);

      // check if the screen size is between the current breakpoint value and the next breakpoint value
      if (currentBreakpointValue <= screenSize && screenSize < nextBreakpointValue) {
        matchBreakpoint = keys[index] as ThemeBreakpointsKey;
        break;
      }

      index = index + 1;
    }

    // Set size to the largest matching breakpoint or 'xl' if no match found
    if (!matchBreakpoint) {
      matchBreakpoint = 'xl';
    }

    return matchBreakpoint;
  };

  const breakpointKey = useMemo(
    () =>
      screenWidth
        ? getScreenCurrentBreakpoint(screenWidth)
        : getScreenCurrentBreakpoint(window.innerWidth ?? parseInt(themeBreakpoints[defaultBreakpoint], 10)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.innerWidth, screenWidth]
  );

  return breakpointKey;
};
