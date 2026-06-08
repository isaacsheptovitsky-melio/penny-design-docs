import type { TestIdProp } from '@melio/penny-utils';
import type { ImgHTMLAttributes } from 'react';

import type { _BaseIconProps } from '@/components/internal/_BaseIcon';
import type { BrandSymbolKey } from '@/theme/icons/brandSymbol.generated.types';

/**
 * Available sizes for brand symbols
 */
export type BrandSymbolSize = Extract<_BaseIconProps['size'], 'extra-small' | 'small' | 'medium' | 'extra-large'>;

/**
 * Brand symbol variant options
 */
export type BrandSymbolVariant = 'default' | 'inverse';

export type BrandSymbolProps = Pick<_BaseIconProps, 'isDisabled' | 'isReadOnly' | 'aria-label'> & {
  /**
   * The type of the brand symbol.
   */
  type: BrandSymbolKey;

  /**
   * The size of the brand symbol.
   * @default 'medium'
   */
  size?: BrandSymbolSize;

  /**
   * Determines the brand symbol variant.
   * @default 'default'
   */
  variant?: BrandSymbolVariant;
} & ImgHTMLAttributes<HTMLImageElement> &
  TestIdProp;
