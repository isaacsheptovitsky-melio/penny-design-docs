import type { TestIdProp } from '@melio/penny-utils';

import type { BrandKey } from '@/theme/icons/brand.generated.types';

/**
 * Brand variant options for different visual presentations
 */
export type BrandVariant = 'default' | 'neutral' | 'inverse';

export type BrandProps = {
  /**
   * The type of the icon.
   */
  type: BrandKey;

  /**
   * Determines the icon variant.
   * @default 'default'
   */
  variant?: BrandVariant;
} & TestIdProp;
