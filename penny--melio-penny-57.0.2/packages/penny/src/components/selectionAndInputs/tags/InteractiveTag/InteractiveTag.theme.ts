import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const interactiveTagTheme: ComponentMultiStyleConfig<'container' | 'innerContent'> = {
  parts: ['container', 'innerContent'],
  baseStyle: {
    container: {
      transition: 'background-color 0.2s',
      '&[data-is-interactive="true"]:not([disabled])': {
        _hover: {
          backgroundColor: 'semantic.surface.tertiary.hover',
          transition: 'background-color 0.2s',
        },
        _pressed: {
          backgroundColor: 'semantic.surface.tertiary.pressed',
          transition: 'background-color 0.2s',
        },
      },
    },
    innerContent: {
      outline: '2px solid transparent',
      display: 'inherit',
      gap: 'inherit' as never,
      alignItems: 'inherit',
      borderRadius: 'global.100',

      '&[data-focus-visible="true"]': {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s',
      },
    },
  },
};
