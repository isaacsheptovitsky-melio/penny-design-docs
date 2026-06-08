import { createContext, type FC, type PropsWithChildren, useContext } from 'react';

import { type ThemeBreakpointsKey } from '../foundations/breakpoints';
import { usePennyBreakpoint } from '../hooks/usePennyBreakpoint';

export type BreakpointProviderProps = {
  breakpoint?: ThemeBreakpointsKey;
};

export const BreakpointContext = createContext<ThemeBreakpointsKey>('xs');

export const BreakpointProvider: FC<PropsWithChildren<BreakpointProviderProps>> = (props) => {
  const breakpoint = usePennyBreakpoint();
  return <BreakpointContext.Provider value={breakpoint} {...props} />;
};

export const useBreakpointContext = () => useContext<ThemeBreakpointsKey>(BreakpointContext);

export function useBreakpoint() {
  const breakpointKey = useBreakpointContext();

  return {
    breakpoint: breakpointKey,
    isExtraSmallScreen: breakpointKey === 'xs',
    isSmallScreen: breakpointKey === 's',
    isMediumScreen: breakpointKey === 'm',
    isLargeScreen: breakpointKey === 'l',
    isExtraLargeScreen: breakpointKey === 'xl',
  };
}
