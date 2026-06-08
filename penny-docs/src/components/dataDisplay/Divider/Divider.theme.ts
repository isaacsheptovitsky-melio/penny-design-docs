import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import type { DividerProps } from './Divider.types';

export const dividerTheme: ComponentMultiStyleConfig<'line' | 'text' | 'container', DividerProps> = {
  parts: ['line', 'text', 'container'],
  baseStyle: {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    line: {
      flex: 1,
      backgroundColor: 'semantic.border.static',

      '@media (forced-colors: active)': {
        backgroundColor: 'CanvasText',
      },
    },
    text: {
      paddingLeft: 's',
      paddingRight: 's',
      color: 'semantic.text.primary',
      textStyle: 'body3',
    },
  },
  variants: {
    vertical: {
      container: {
        flexDirection: 'column',
        height: '100%',
        width: 'auto',
      },
      line: {
        width: '1px',
      },
    },
    horizontal: {
      container: {
        flexDirection: 'row',
        width: '100%',
      },
      line: {
        height: '1px',
      },
    },
  },
};
