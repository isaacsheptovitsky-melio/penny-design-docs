import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

const focusVisibleStyles: InternalCSSObject = {
  backgroundColor: 'semantic.surface.primary.hover',
  outlineColor: 'semantic.focus.primary',
  outlineOffset: '-2px',
  transition: 'outline-color 0.2s',
};

export const menuItemTheme: ComponentSingleStyleConfig<{ isMulti: boolean }> = {
  baseStyle: ({ isMulti }) => ({
    width: '100%',
    transition: 'background-color 0.1s ease-in-out',
    textStyle: 'body3',
    paddingX: 's',
    paddingY: 'xs-s',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    outline: 'none',
    borderLeft: 'global.50',
    borderColor: 'global.neutral.A0',

    _highlighted: {
      backgroundColor: 'semantic.surface.primary.hover',
    },
    _hover: {
      backgroundColor: 'semantic.surface.primary.hover',
      borderLeft: 'global.50',
      borderColor: 'semantic.border.interactive.hover',
    },
    _focus: {
      backgroundColor: 'semantic.surface.primary.hover',
    },
    _focusVisible: focusVisibleStyles,
    '&[data-focus-visible="true"]': focusVisibleStyles,
    _active: {
      backgroundColor: 'semantic.surface.primary.pressed',
      borderLeft: 'global.50',
      borderColor: 'semantic.border.interactive.hover',
    },
    '&[data-selected="true"]': {
      backgroundColor: 'semantic.surface.primary.selected',
      borderLeft: !isMulti ? 'global.50' : undefined,
      borderColor: !isMulti ? 'semantic.border.brand' : undefined,
      _hover: {
        borderLeft: 'global.50',
        borderColor: isMulti ? 'global.neutral.A0' : 'semantic.border.brand',
      },
      _active: {
        borderLeft: 'global.50',
        borderColor: isMulti ? 'global.neutral.A0' : 'semantic.border.brand',
      },
    },
    _disabled: {
      backgroundColor: 'unset',
      cursor: 'not-allowed',
      color: 'semantic.text.disabled',
      borderLeft: 'global.50',
      borderColor: 'global.neutral.A0',
    },
  }),
};
