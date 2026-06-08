import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import type { TabsProps } from './Tabs.types';

export const tabsTheme: ComponentMultiStyleConfig<
  'container' | 'tabs' | 'tab' | 'counters' | 'pills',
  Pick<TabsProps, 'variant' | 'isFullWidth'>
> = {
  parts: ['container', 'tabs', 'tab', 'counters', 'pills'],
  baseStyle: ({ isFullWidth }) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'auto',
    },
    tabs: {
      display: 'flex',
      overflowX: { xs: 'auto', s: 'unset' },
    },
    tab: {
      display: 'flex',
      cursor: 'pointer',
      textStyle: { xs: 'body3Semi', s: 'body2Semi' },
      whiteSpace: 'nowrap',
      borderBottom: 'global.50',
      borderColor: 'global.neutral.A0',
      transition: '0.1s ease-in-out',
      transitionProperty: 'border, color, background-color',
      width: isFullWidth ? '100%' : 'fit-content',
      justifyContent: isFullWidth ? 'center' : 'flex-end',
      padding: 's',
      paddingTop: { xs: 'xs', s: 's' },
      alignItems: 'center',
      outlineColor: 'semantic.focus.primary',
      outlineOffset: '-1px',
      '@media (forced-colors: active)': {
        borderBottom: 'global.50',
        borderColor: 'Canvas',
        _selected: {
          borderColor: 'CanvasText',
        },
      },
    },
    counters: {
      display: 'flex',
      gap: 'xxs',
      marginLeft: 'xxs',
    },
    pills: {
      display: 'flex',
      gap: 'xxs',
      marginLeft: 'xxs',
    },
  }),
  variants: {
    default: {
      tab: {
        color: 'component.tab.default.rest.label',
        backgroundColor: 'component.tab.default.rest.background',
        _hover: {
          color: 'component.tab.default.hover.label',
          backgroundColor: 'component.tab.default.hover.background',
        },
        _selected: {
          color: 'component.tab.default.selected.label',
          borderBottomColor: 'component.tab.default.selected.border',
          outlineColor: 'semantic.focus.primary',
          backgroundColor: 'component.tab.default.selected.background',
        },
        _active: {
          color: 'component.tab.default.pressed.label',
          backgroundColor: 'component.tab.default.pressed.background',
        },
      },
    },
    neutral: {
      tab: {
        color: 'component.tab.neutral.rest.label',
        backgroundColor: 'component.tab.neutral.rest.background',
        _hover: {
          color: 'component.tab.neutral.hover.label',
          backgroundColor: 'component.tab.neutral.hover.background',
        },
        _selected: {
          color: 'component.tab.neutral.selected.label',
          borderBottomColor: 'component.tab.neutral.selected.border',
          outlineColor: 'semantic.focus.primary',
          backgroundColor: 'component.tab.neutral.selected.background',
        },
        _active: {
          color: 'component.tab.neutral.pressed.label',
          backgroundColor: 'component.tab.neutral.pressed.background',
        },
      },
    },
  },
};
