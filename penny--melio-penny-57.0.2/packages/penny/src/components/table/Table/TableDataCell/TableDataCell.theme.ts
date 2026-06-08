import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { getCellSizes, getFixedCellSize, getPinnedCellStyle } from '../Table.utils';
import { type TableDataCellProps } from './TableDataCell';

export const tableDataCellTheme: ComponentSingleStyleConfig<TableDataCellProps> = {
  baseStyle: ({ size, textAlign, pinOptions }) => ({
    position: 'relative',
    ...getPinnedCellStyle(pinOptions),
    ...getFixedCellSize(size),
    textAlign,
    borderBottom: 'global.25',
    borderColor: 'semantic.border.static',
    overflow: 'hidden',
  }),
  sizes: getCellSizes(),
};
