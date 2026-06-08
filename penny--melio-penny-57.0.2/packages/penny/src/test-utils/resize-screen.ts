import { themeBreakpoints, type ThemeBreakpointsKey } from '../theme/foundations/breakpoints';

export const DEFAULT_WINDOW_HEIGHT = 800;

export const breakpointsWidth = Object.fromEntries(
  Object.entries(themeBreakpoints).map(([key, value]) => [key, parseInt(value, 10)])
) as Record<ThemeBreakpointsKey, number>;

// Mock window resizeTo method
export const windowResizeTo = (window.resizeTo = (width, height) => {
  // Modify window.innerWidth to simulate screen resize
  window.innerWidth = width || window.innerWidth;
  window.innerHeight = height || window.innerHeight;
  window.dispatchEvent(new Event('resize'));
});

export const resizeScreenByBreakpointKey = (key: ThemeBreakpointsKey) => {
  const breakpoints = {
    xs: 375,
    s: 775,
    m: 1075,
    l: 1375,
    xl: 1575,
  };

  return windowResizeTo(breakpoints[key], DEFAULT_WINDOW_HEIGHT);
};
