import { useBreakpointValue } from '@/theme/hooks/useBreakpointValue';

import { type ColSize } from '../Table.types';

// The default size for the table cell is 'm' according to DS
export const useCellSize = (size: ColSize = 'm'): ColSize => {
  const smallerScreenCellSize = (): ColSize => {
    switch (size) {
      case 'm':
        return 's';
      case 'l':
        return 'm';
      default:
        return size;
    }
  };

  return useBreakpointValue({ xs: smallerScreenCellSize(), s: size });
};
