import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

export const tagTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    position: 'relative',
    height: '32px',
    paddingX: 'xs',
    paddingY: 'xxxs',
    display: 'inline-flex',
    flexShrink: 0,
    minWidth: '40px',
    textStyle: 'body3',
    borderRadius: 'global.100',
    whiteSpace: 'nowrap',
    backgroundColor: 'semantic.surface.tertiary.rest',
    color: 'semantic.text.primary',
    width: 'fit-content',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'xs',
    outline: '2px solid transparent',
    _focusVisible: {
      outlineColor: 'semantic.focus.primary',
      outlineOffset: '2px',
      transition: 'outline-color 0.2s',
    },
    '&[data-is-interactive="true"]': {
      cursor: 'pointer',
      _disabled: {
        backgroundColor: 'semantic.surface.tertiary.disabled',
        cursor: 'not-allowed',
        color: 'semantic.text.disabled',
      },
    },
  },
};
