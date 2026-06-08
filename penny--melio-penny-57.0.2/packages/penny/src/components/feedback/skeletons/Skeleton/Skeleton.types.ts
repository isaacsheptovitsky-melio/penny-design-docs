import type { TestIdProp } from '@melio/penny-utils';
import type { CSSProperties } from 'react';

export type SkeletonProps = {
  /**
   * Height of the skeleton placeholder
   * @default "20px"
   */
  height?: CSSProperties['height'];
} & TestIdProp;

export const skeletonColors = {
  startColor: 'global.neutral.300',
  endColor: 'global.neutral.400',
};
