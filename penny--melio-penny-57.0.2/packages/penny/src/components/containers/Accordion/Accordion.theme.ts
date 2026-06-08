import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const accordionTheme: ComponentMultiStyleConfig<'item' | 'itemTrigger' | 'itemPanel'> = {
  parts: ['item', 'itemTrigger', 'itemPanel'],
  baseStyle: {
    item: {
      borderTop: 'semantic.container.default',
      borderColor: 'semantic.border.static',

      ':last-of-type': {
        borderBottom: 'semantic.container.default',
        borderColor: 'semantic.border.static',
      },
    },
    itemTrigger: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: '56px',
      width: 'full',
      padding: 's',

      _hover: {
        backgroundColor: 'semantic.surface.primary.hover',
      },
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
      },
    },
    itemPanel: {
      textStyle: 'body3',
      padding: 's',
    },
  },
};
