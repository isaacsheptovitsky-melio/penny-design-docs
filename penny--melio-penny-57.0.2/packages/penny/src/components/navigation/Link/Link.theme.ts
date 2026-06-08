import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { getColorSemanticToken } from './Link.theme.utils';
import type { LinkProps } from './Link.types';

export const linkTheme: ComponentSingleStyleConfig<
  Pick<LinkProps, 'variant' | 'size' | 'shouldSupportEllipsis' | 'color' | 'isBold'>
> = {
  baseStyle: ({ shouldSupportEllipsis, color = 'default' }) => ({
    // `display: 'inline-grid'` is needed in order to support ellipsis: https://stackoverflow.com/a/71540221
    display: shouldSupportEllipsis ? 'inline-grid' : 'inline',
    textDecoration: 'underline',
    transitionProperty: 'color',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'ease-out',
    cursor: 'pointer',
    outline: 'none',
    color: getColorSemanticToken(color, 'rest'),
    ...(shouldSupportEllipsis && {
      display: 'inline-block',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),

    _hover: {
      color: getColorSemanticToken(color, 'hover'),
      textDecoration: 'none',
    },
    _active: {
      color: getColorSemanticToken(color, 'pressed'),
      textDecoration: 'none',
    },
    _disabled: {
      color: getColorSemanticToken(color, 'disabled'),
      cursor: 'not-allowed',
      _hover: {
        textDecoration: 'underline',
      },
    },
    _focusVisible: {
      outlineColor: color === 'inverse' ? 'semantic.focus.inverse' : 'semantic.focus.primary',
      borderRadius: 'global.100',
      transition: 'outline-color 0.2s',
    },
  }),
  sizes: {
    large: ({ isBold }) => ({
      textStyle: isBold ? 'body2Semi' : 'body2',
    }),
    medium: ({ isBold }) => ({
      textStyle: isBold ? 'body3Semi' : 'body3',
      // This is the match the a11y criteria of a sufficient click area.
      lineHeight: '24px' as never,
    }),
  },
  variants: {
    standalone: {},
    inline: {
      width: 'fit-content',
      textStyle: 'inline',
    },
  },
};
