import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type AvatarImageControlProps } from './AvatarImageControl.types';

export const avatarImageControlTheme: ComponentMultiStyleConfig<
  'image' | 'container' | 'initials' | 'avatar' | 'icon',
  Pick<AvatarImageControlProps, 'isViewMode' | 'isLoading' | 'variant'>
> = {
  parts: ['image', 'container', 'initials', 'avatar', 'icon'],
  baseStyle: ({ isViewMode, isLoading }) => ({
    container: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'xs-s',
    },
    avatar: {
      w: '120px',
      h: '120px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'semantic.text.primary',
      backgroundColor: 'semantic.fill.secondary',
      border: 'semantic.input.default',
      borderColor: 'semantic.border.static',
      shadow: isViewMode || isLoading ? 0 : 500,
      transition: 'shadow 0.1s ease-in-out',

      _hover: {
        cursor: isViewMode || isLoading ? 'default' : 'pointer',
        shadow: isViewMode || isLoading ? 0 : 600,
        transition: 'shadow 0.1s ease-in-out',
      },

      _active: {
        backgroundColor: isViewMode || isLoading ? 'semantic.fill.secondary' : 'semantic.fill.tertiary',
      },
      _focusVisible: {
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s',
      },
    },
    image: {
      position: 'absolute',
      inset: 0,
      _after: {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundColor: 'semantic.surface.inverse',
        opacity: isViewMode ? 0 : 0.35,
        transition: 'opacity 0.1s ease-in-out',
        pointerEvents: 'none',
      },
    },
    icon: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 'dropdown',
    },
    initials: {
      textStyle: 'body1Semi',
    },
  }),
  variants: {
    circle: {
      avatar: {
        borderRadius: 'global.full',
      },
      image: {
        borderRadius: 'global.full',
      },
    },
    square: {
      avatar: {
        borderRadius: 'semantic.input.default',
      },
    },
  },
};
