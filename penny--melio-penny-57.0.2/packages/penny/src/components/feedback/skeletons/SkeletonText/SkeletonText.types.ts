import type { TestIdProp } from '@melio/penny-utils';

import type { ThemeSpaceKey } from '@/theme/foundations/spaces';

export type SkeletonTextProps = {
  /**
   * Number of text lines to display as skeleton placeholders
   * @default 2
   */
  numberOfLines?: number;
  /**
   * Spacing between skeleton text lines
   * @default "xs"
   */
  spacing?: ThemeSpaceKey;
} & TestIdProp;
