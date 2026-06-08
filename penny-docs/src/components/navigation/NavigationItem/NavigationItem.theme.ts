import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

export const navigationItemTheme: ComponentSingleStyleConfig<{ isFullWidth?: boolean }> = {
  baseStyle: ({ isFullWidth }) => ({
    display: 'inline-block',
    // Reset native <button> chrome — the docs project has no global button reset
    // (production does), so without this the rest state shows the UA border/background.
    backgroundColor: 'transparent',
    border: 'global.none',
    cursor: 'pointer',
    borderRadius: 'component.navigationItem.default',
    textStyle: 'body3',
    color: 'semantic.text.primary',
    paddingX: 'xs-s',
    paddingY: 'xs',
    width: isFullWidth ? '100%' : 'fit-content',
    maxWidth: isFullWidth ? '100%' : '240px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'background-color 0.2s ease-in-out',
    _hover: {
      backgroundColor: 'semantic.action.tertiary.hover',
    },
    _active: {
      backgroundColor: 'semantic.action.tertiary.pressed',
    },
    _selected: {
      backgroundColor: 'semantic.fill.brand.secondary',
      color: 'semantic.text.brand.rest',
      textStyle: 'body3Semi',
      border: 'global.25',
      borderColor: 'global.neutral.A0',
    },
    _focusVisible: {
      outlineColor: 'semantic.focus.primary',
      outlineOffset: '2px',
      transition: 'outline-color 0.2s',
    },
  }),
};
