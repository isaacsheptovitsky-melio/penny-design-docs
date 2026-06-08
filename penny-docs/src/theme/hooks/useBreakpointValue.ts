import { themeBreakpoints, type ThemeBreakpointsKey } from '../foundations/breakpoints';
import { useBreakpoint } from '../providers/BreakpointProvider';

const sortInitiatedValues = <T>(values: RequireAtLeastOne<Partial<Record<ThemeBreakpointsKey, T>>>) => {
  const sortedValues = {} as Record<string, unknown>;

  Object.keys(themeBreakpoints).forEach((breakpoint: string) => {
    sortedValues[breakpoint] = values[breakpoint as keyof Record<ThemeBreakpointsKey, T>];
  });

  return sortedValues as Record<string, T | undefined>;
};

/**
 * Sorts the values according to themeBreakpoints order and sets all keys' value with the matches smallest defined value.
 * for example: provided object values: { l: 'large', s: 'small' }, the return value is: { xs: 'small', s: 'small', m: 'small', l: 'large', xl: 'large' }.
 */
export const sortBreakpoints = <T>(values: RequireAtLeastOne<Partial<Record<ThemeBreakpointsKey, T>>>) => {
  const initiatedSortedBreakpoints = sortInitiatedValues(values);
  const sortedValues = {} as Record<string, unknown>;

  let smallestDefinedKey = Object.keys(initiatedSortedBreakpoints).filter(
    (k) => initiatedSortedBreakpoints[k] !== undefined
  )[0] as string;

  Object.keys(initiatedSortedBreakpoints).forEach((breakpoint: string) => {
    sortedValues[breakpoint] = values[breakpoint as keyof Record<ThemeBreakpointsKey, T>] || undefined;
    if (initiatedSortedBreakpoints[breakpoint] !== undefined) {
      sortedValues[breakpoint] = initiatedSortedBreakpoints[breakpoint];
      smallestDefinedKey = breakpoint; // Update the smallestDefinedKey
    } else {
      sortedValues[breakpoint] = initiatedSortedBreakpoints[smallestDefinedKey];
    }
  });

  return sortedValues as Record<ThemeBreakpointsKey, T>;
};

/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @param values
 * @example
 * const width = useBreakpointValue({ xs: '150px', s: '250px' })
 */
export function useBreakpointValue<T>(values: RequireAtLeastOne<Partial<Record<ThemeBreakpointsKey, T>>>): T {
  const { breakpoint } = useBreakpoint();
  const sortedBreakpointsValues = sortBreakpoints(values);

  return sortedBreakpointsValues[breakpoint];
}
