import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { BackgroundStyle } from './Avatar.theme.utils';
import type { AvatarProps } from './Avatar.types';

export const avatarTheme: ComponentMultiStyleConfig<
  'container' | 'image' | 'avatar' | 'initials',
  Pick<AvatarProps, 'size' | 'onClick' | 'bgColor' | 'variant' | 'isDisabled'>
> = {
  parts: ['container', 'image', 'avatar', 'initials'],
  baseStyle: ({ onClick, isDisabled, bgColor }) => ({
    container: {
      display: 'inline-flex',
      position: 'relative',
      width: 'fit-content',
      height: 'fit-content',
    },
    avatar: {
      overflow: 'hidden',
      display: 'inline-flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      border: 'semantic.input.default',
      borderColor: 'semantic.border.static',
      width: '100%',
      height: 'auto',
      backgroundColor: BackgroundStyle[bgColor ?? 'default'],
      color: bgColor === 'avatar6' ? 'semantic.text.inverse' : 'semantic.text.primary',
      userSelect: 'none',

      _after: {
        content: "''",
        width: '100%',
        height: '100%',
        backgroundColor: 'semantic.fill.inverse',
        opacity: '0',
        position: 'absolute',
        top: '0px',
        left: '0px',
        transition: 'opacity 0.3s ease',
      },
      _hover: {
        _after: {
          opacity: onClick && !isDisabled ? '0.35' : '0',
        },
      },

      _disabled: {
        backgroundColor: 'semantic.fill.disabled',
        border: 'global.none',
        color: 'semantic.text.disabled',
        cursor: 'not-allowed',
      },
      _selected: {
        outline: '2px solid',
        outlineColor: 'semantic.border.interactive.selected',
        outlineOffset: '2px',
      },
    },
    image: {
      // So the image and the initials won't co-exist side-by-side for the flicker of time
      position: 'absolute',
    },
    initials: {},
  }),
  variants: {
    circle: {
      avatar: {
        borderRadius: 'global.full',
        _after: {
          borderRadius: 'global.full',
        },
      },
    },
    square: {
      avatar: {
        borderRadius: 'global.100',
        _after: {
          borderRadius: 'global.100',
        },
      },
    },
  },
  sizes: {
    'extra-small': {
      avatar: {
        width: '16px',
        height: '16px',
      },
      initials: {
        textStyle: 'caption1Semi',
      },
    },
    small: {
      avatar: {
        width: '24px',
        height: '24px',
      },
      initials: {
        textStyle: 'caption1Semi',
      },
    },
    medium: {
      avatar: {
        width: '40px',
        height: '40px',
      },
      initials: {
        textStyle: 'body4Semi',
      },
    },
    large: {
      avatar: {
        width: '56px',
        height: '56px',
      },
      initials: {
        textStyle: 'body2Semi',
      },
    },
    'extra-large': {
      avatar: {
        width: '120px',
        height: '120px',
      },
      initials: {
        textStyle: 'body1Semi',
      },
    },
  },
};
