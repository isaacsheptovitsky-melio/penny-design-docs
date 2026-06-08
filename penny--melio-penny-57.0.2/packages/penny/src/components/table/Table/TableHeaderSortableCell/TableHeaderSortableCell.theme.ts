import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type ColTextAlign } from '../Table.types';

export const tableHeaderSortableCellTheme: ComponentMultiStyleConfig<
  'icon',
  {
    textAlign?: ColTextAlign;
  }
> = {
  parts: ['icon'],
  baseStyle: ({ textAlign }) => ({
    icon: {
      display: 'inline-flex',
      alignItems: 'center',
      order: textAlign === 'end' ? -1 : 'initial',
    },
  }),
};
