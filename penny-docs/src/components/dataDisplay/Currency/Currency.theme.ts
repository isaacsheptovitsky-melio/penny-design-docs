import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import type { CurrencyProps } from './Currency.types';

export const currencyTheme: ComponentMultiStyleConfig<
  'container' | 'integer' | 'fraction' | 'currency',
  Pick<CurrencyProps, 'size' | 'variant'>
> = {
  parts: ['container', 'integer', 'fraction', 'currency'],
  baseStyle: {
    container: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    integer: {
      display: 'inline-flex',
    },
    currency: {
      display: 'inline-flex',
    },
    fraction: {
      display: 'inline-flex',
      marginLeft: 'xxxs',
    },
  },
  sizes: {
    small: {
      integer: {
        textStyle: 'metric2Semi',
      },
      currency: {
        textStyle: 'metric2Semi',
        display: 'inline-flex',
      },
      fraction: {
        textStyle: 'body4Semi',
        marginLeft: 'xxxs',
        lineHeight: '22px' as never,
      },
    },
    large: {
      integer: {
        textStyle: 'metric1Semi',
      },
      currency: {
        textStyle: 'metric1Semi',
      },
      fraction: {
        textStyle: 'body2Semi',
        marginLeft: 'xxxs',
        lineHeight: '30px' as never,
      },
    },
  },
  variants: {
    default: {
      container: {
        color: 'semantic.text.primary',
      },
    },
    inverse: {
      container: {
        color: 'semantic.text.inverse',
      },
    },
  },
};
