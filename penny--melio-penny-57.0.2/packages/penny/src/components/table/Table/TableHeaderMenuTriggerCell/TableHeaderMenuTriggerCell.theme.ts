import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type TableContextData } from '../TableContext';

export const tableHeaderMenuTriggerCellTheme: ComponentSingleStyleConfig<{
  variant?: TableContextData['headerVariant'];
}> = {
  baseStyle: {
    display: 'flex',
    width: '100%',
  },
  variants: {
    light: {},
    dark: {
      color: 'global.neutral.900',
    },
  },
};
