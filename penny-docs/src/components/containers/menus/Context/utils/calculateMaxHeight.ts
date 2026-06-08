import { type CSSProperties } from 'react';

/**
 * Calculates the final max height based on the available height and max height constraint
 * @param availableHeight - The available height in the viewport
 * @param maxHeight - The maximum height constraint (can be a number or string with 'px')
 * @returns The calculated max height in pixels
 */
export const calculateMaxHeight = (availableHeight: number, maxHeight?: CSSProperties['maxHeight']): number => {
  if (!maxHeight) {
    return availableHeight;
  }

  const parsedMaxHeight = typeof maxHeight === 'number' ? maxHeight : parseInt(maxHeight.replace('px', ''), 10);

  if (typeof parsedMaxHeight !== 'number' || isNaN(parsedMaxHeight)) {
    return availableHeight;
  }

  return Math.min(availableHeight, parsedMaxHeight);
};
