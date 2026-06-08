import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type GroupItemProps } from './GroupItem.types';

export const groupItemTheme: ComponentSingleStyleConfig<GroupItemProps> = {
  baseStyle: ({ order, grow: flexGrow, shrink: flexShrink, basis: flexBasis, alignSelf }) => ({
    order,
    flexGrow,
    flexShrink,
    flexBasis,
    alignSelf,
    // `minWidth` is necessary for text-ellipsis to work
    minWidth: 0,
  }),
};
