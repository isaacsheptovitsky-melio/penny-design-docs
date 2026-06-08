import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type ColTextAlign } from '../Table.types';
import { getSharedCellStyles } from '../TableCell/TableCell.theme';
import { type TableContextData } from '../TableContext';

export const tableHeaderCellTheme: ComponentSingleStyleConfig<{
  isClickable: boolean;
  textAlign?: ColTextAlign;
  variant?: TableContextData['headerVariant'];
}> = {
  baseStyle: ({ isClickable, textAlign }) => ({
    ...getSharedCellStyles(isClickable, textAlign),
    color: 'semantic.text.primary',
    textStyle: 'body3Semi',
    alignItems: 'flex-start',

    '&[data-component="TableSelectableCell"]': {
      padding: 'xs',
      alignItems: 'center',
    },
  }),
  variants: {
    light: {},
    dark: ({ isClickable }) => ({
      color: 'global.neutral.900',
      _hover: {
        backgroundColor: isClickable ? 'semantic.surface.primary.hover' : 'initial',
      },
      '&[data-selected="true"]': {
        color: 'semantic.text.primary',
      },
      _active: {
        backgroundColor: isClickable ? 'semantic.surface.primary.pressed' : 'initial',
      },
    }),
  },
};
