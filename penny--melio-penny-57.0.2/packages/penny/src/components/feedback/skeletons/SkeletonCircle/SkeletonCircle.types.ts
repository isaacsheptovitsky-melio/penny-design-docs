import type { TestIdProp } from '@melio/penny-utils';
import type { CSSProperties } from 'react';

export type SkeletonCircleProps = {
  /**
   * Diameter of the circular skeleton placeholder
   * @default "20px"
   */
  diameter?: CSSProperties['width'];
} & TestIdProp;
