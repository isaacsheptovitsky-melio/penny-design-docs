import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type DropdownListProps } from './DropdownList.types';

export const dropdownListTheme: ComponentSingleStyleConfig<Pick<DropdownListProps, 'paddingY' | 'gap'>> = {
  baseStyle: ({ paddingY, gap }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    paddingY,
    gap,
  }),
};
