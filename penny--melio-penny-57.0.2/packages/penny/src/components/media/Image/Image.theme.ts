import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

import type { ImageThemeProps } from './Image.types';

export const imageTheme: ComponentMultiStyleConfig<'image' | 'fallbackImage' | 'fallbackIcon', ImageThemeProps> = {
  parts: ['image', 'fallbackImage', 'fallbackIcon'],
  baseStyle: ({
    objectFit,
    objectPosition,
    aspectRatio,
    borderRadius,
    width,
    height,
    fallbackImageBackgroundColor,
  }) => ({
    image: {
      width,
      height,
      objectFit,
      objectPosition,
      aspectRatio,
      borderRadius,

      _disabled: {
        opacity: 0.35,
        cursor: 'not-allowed',
      },
    } as InternalCSSObject,
    fallbackImage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: fallbackImageBackgroundColor ?? 'semantic.surface.secondary.rest',
      height,
      width,
      objectFit,
      objectPosition,
      aspectRatio,
      borderRadius,
    } as InternalCSSObject,
    fallbackIcon: {
      width: '100%',
      height: '100%',
      maxWidth: '40px',
      maxHeight: '40px',
    },
  }),
  variants: {
    circle: {
      image: {
        borderRadius: 'global.full',
        aspectRatio: '1 / 1',
      },
    },
    square: {},
  },
};
