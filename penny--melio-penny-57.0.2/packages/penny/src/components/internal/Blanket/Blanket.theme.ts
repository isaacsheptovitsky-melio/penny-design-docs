import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import type { BlanketProps as BlanketProps } from './Blanket';

export const blanketTheme: ComponentMultiStyleConfig<'icon' | 'container', BlanketProps> = {
  parts: ['icon', 'container'],
  baseStyle: {
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      _before: {
        content: "''",
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        opacity: 0,
        transition: 'opacity 0.25s',
      },
    },
    icon: {
      display: 'inline-flex',
      position: 'relative',
      zIndex: 1,
    },
  },
  variants: {
    light: {
      container: {
        _before: {
          backgroundColor: 'semantic.surface.primary.rest',
          opacity: 0.6,
        },
      },
    },
    dark: ({ isLoading, isFullScreen }) => ({
      container: {
        cursor: isLoading || isFullScreen ? 'default' : 'pointer',
        _before: {
          backgroundColor: 'semantic.surface.inverse',
          opacity: 0.35,
        },

        _active: {
          _before: {
            opacity: isLoading || isFullScreen ? 0.35 : 0.6,
          },
        },
      },
    }),
    darker: {
      container: {
        _before: {
          backgroundColor: 'semantic.surface.inverse',
          opacity: 0.6,
        },
      },
    },
  },
};
