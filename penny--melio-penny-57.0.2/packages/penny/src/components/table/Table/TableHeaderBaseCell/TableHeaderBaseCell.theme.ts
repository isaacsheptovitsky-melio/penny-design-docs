import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { getCellSizes, getFixedCellSize, getPinnedCellStyle } from '../Table.utils';
import { type TableHeaderBaseCellProps } from './TableHeaderBaseCell';

export const tableHeaderBaseCellTheme: ComponentSingleStyleConfig<TableHeaderBaseCellProps> = {
  baseStyle: ({ size, textAlign, pinOptions }) => ({
    ...getPinnedCellStyle(pinOptions),
    minHeight: '49px',
    ...getFixedCellSize(size),
    textAlign,
    borderBottom: 'global.25',
    borderColor: 'semantic.border.static',
    ':first-of-type': {
      borderTopLeftRadius: 'l',
      overflow: 'hidden',
    },

    ':last-of-type': {
      borderTopRightRadius: 'l',
      overflow: 'hidden',
    },
  }),
  variants: {
    light: {
      backgroundColor: 'semantic.surface.primary.rest',
    },
    dark: {
      backgroundColor: 'semantic.surface.secondary.rest',
      color: 'global.neutral.900',
    },
  },
  sizes: getCellSizes(),
};
