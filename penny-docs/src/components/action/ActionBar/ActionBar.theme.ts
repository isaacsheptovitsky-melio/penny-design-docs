import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const actionBarTheme: ComponentMultiStyleConfig<'bar' | 'itemLabel' | 'itemValue'> = {
  parts: ['bar', 'itemLabel', 'itemValue'],
  baseStyle: {
    bar: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: { xs: 'column', s: 'row' },
      alignItems: { xs: 'flex-start', s: 'center' },
      gap: 'xs',
      color: 'semantic.text.inverse',
      minHeight: '40px',
    },
    itemLabel: {
      textStyle: 'body2',
    },
    itemValue: {
      textStyle: 'body2Semi',
    },
  },
};
