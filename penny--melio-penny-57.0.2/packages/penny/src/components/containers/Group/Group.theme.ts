import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type GroupProps } from './Group.types';
import { type GroupVariants } from './Group.utils';

export const groupTheme: ComponentSingleStyleConfig<Omit<GroupProps, 'variant'> & { variant: GroupVariants }> = {
  baseStyle: ({ spacing, width, height, allowOverflowX }) => ({
    display: 'flex',
    gap: spacing,
    width,
    height,
    // Both `minWidth` and `maxWidth` are necessary to support text-ellipsis in descendant elements
    minWidth: 0,
    maxWidth: '100%',
    overflowX: allowOverflowX ? 'auto' : 'initial',
    ...(allowOverflowX && {
      padding: 'xxs',
      margin: '-4px' as never,
    }),
  }),
  variants: {
    horizontal: {
      flexDirection: 'row',
    },
    vertical: {
      flexDirection: 'column',
    },
  },
};
