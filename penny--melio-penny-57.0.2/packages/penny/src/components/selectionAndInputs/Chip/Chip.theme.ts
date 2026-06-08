import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

export const chipTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    paddingY: 'xs',
    paddingX: 's',
    height: '40px',
    width: 'max-content',
    borderRadius: 'global.full',
    outlineColor: 'transparent',
    color: 'semantic.text.primary',
    border: 'semantic.input.default',
    borderColor: 'semantic.border.interactive.rest',
    textStyle: 'body3Semi',
    transitionProperty: 'color, background-color',
    transition: '0.2s ease-in-out',
    _hover: {
      backgroundColor: 'semantic.surface.primary.hover',
    },
    _active: {
      backgroundColor: 'semantic.surface.primary.pressed',
    },
    '&[data-selected="true"]': {
      backgroundColor: 'semantic.surface.inverse',
      color: 'semantic.text.inverse',
      border: 'semantic.input.default',
      borderColor: 'semantic.border.neutral',
    },
    _focusVisible: {
      outlineStyle: 'solid',
      outlineWidth: '2px',
      outlineOffset: '2px',
      outlineColor: 'semantic.focus.primary',
      transition: 'outline-color 0.2s',
      border: 'semantic.input.default',
      borderColor: 'global.neutral.A0',
    },
  },
};
