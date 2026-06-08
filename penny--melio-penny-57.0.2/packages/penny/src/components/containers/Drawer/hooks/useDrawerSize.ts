import { useBreakpointValue } from '@/theme/hooks/useBreakpointValue';

import { DrawerBreakpointSizesMap, type DrawerSize, type PresetDrawerSizes } from '../Drawer.types';
import { isResponsiveType } from '../Drawer.utils';

const checkSizeType = (size: DrawerSize): size is PresetDrawerSizes => size === 's' || size === 'm' || size === 'l';

/**
 * Custom hook to retrieve the width of a drawer based on the specified size and current viewport breakpoint.
 *
 * This hook accepts a drawer size value, which can be:
 * - A preset size ('s', 'm', 'l'): It retrieves the appropriate width based on the current viewport.
 * - A custom numeric size: It returns the size as a string with 'px' (e.g., "300px").
 * - A responsive object: If the size is a responsive object (e.g., { s: '2px', m: '3px' }), it retrieves the
 *   appropriate size based on the current viewport.
 *
 * The hook uses `useCustomSize` to determine the width of the drawer, defaulting to `100vw` for extra-small
 * screens if necessary.
 *
 * @param {DrawerSize} size - The size of the drawer, which can be a preset key ('s', 'm', 'l'), a custom numeric value,
 *                            or a responsive object.
 * @returns {string} - The calculated width of the drawer, formatted as a string (e.g., "300px" or "100%").
 *
 * @example
 * // Using a preset size
 * const width1 = useDrawerSize('s'); // Output could be "300px" based on the viewport
 *
 * @example
 * // Using a custom numeric size
 * const width2 = useDrawerSize(400); // Output: "400px"
 *
 * @example
 * // Using a responsive object
 * const width3 = useDrawerSize({ s: '2px', m: '3px' }); // Output could vary based on the viewport size
 */
export const useDrawerSize = (size: DrawerSize): string => {
  const responsiveSize = checkSizeType(size) ? DrawerBreakpointSizesMap[size] : size;
  const responsiveValue = isResponsiveType(responsiveSize) ? responsiveSize : { xs: responsiveSize };

  // Use the breakpoint value based on the size prop and breakpoints, default to '100vw' for xs screens
  const drawerWidth = useBreakpointValue<string | number>(responsiveValue);

  if (typeof drawerWidth === 'number') {
    return `${drawerWidth}px`;
  }

  return drawerWidth;
};
