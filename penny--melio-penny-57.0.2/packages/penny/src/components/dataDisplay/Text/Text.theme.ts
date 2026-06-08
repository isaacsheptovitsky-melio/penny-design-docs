import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import type { TextProps } from './Text.types';

export const textTheme: ComponentSingleStyleConfig<Pick<TextProps, 'color' | 'textStyle' | 'shouldSupportEllipsis'>> = {
  baseStyle: ({ color, textStyle, shouldSupportEllipsis }) => ({
    color,
    textStyle,
    ...(shouldSupportEllipsis && {
      display: 'inline-block',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
  }),
};
