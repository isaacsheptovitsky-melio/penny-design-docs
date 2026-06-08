import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';
import { iconSizeMapping } from '@/theme/icons/icon.types';

import type { BrandSymbolProps } from './BrandSymbol.types';

export const brandSymbolTheme: ComponentSingleStyleConfig<Pick<BrandSymbolProps, 'size'>> = {
  baseStyle: {
    display: 'inline-flex',

    _readOnly: {
      opacity: '0.65',
    },
    _disabled: {
      opacity: '0.35',
    },
  },
  sizes: {
    'extra-small': {
      width: iconSizeMapping['extra-small'],
      height: iconSizeMapping['extra-small'],
    },
    small: {
      width: iconSizeMapping['small'],
      height: iconSizeMapping['small'],
    },
    medium: {
      width: iconSizeMapping['medium'],
      height: iconSizeMapping['medium'],
    },
    'extra-large': {
      width: iconSizeMapping['extra-large'],
      height: iconSizeMapping['extra-large'],
    },
  },
};
