// Ensure the css unit of your breakpoints are the same. Use all px or all em, don't mix them: https://chakra-ui.com/docs/styled-system/responsive-styles#customizing-breakpoints.
export const themeBreakpoints = {
  xs: '0px', // 0 - 599
  s: '600px', // 600 - 904
  m: '905px', // 905 - 1239
  l: '1240px', // 1240 - 1439
  xl: '1440px', // 1440
} as const;

export type ThemeBreakpointsKey = keyof typeof themeBreakpoints;

export type ThemeBreakpoints = Record<ThemeBreakpointsKey, string>;

export const themeBreakpointKeys = Object.keys(themeBreakpoints) as ThemeBreakpointsKey[];
