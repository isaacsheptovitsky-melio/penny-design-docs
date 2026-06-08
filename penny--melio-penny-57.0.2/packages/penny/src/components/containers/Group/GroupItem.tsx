import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import type { GroupItemProps } from './GroupItem.types';

export const GroupItem = forwardRef<HTMLDivElement, GroupItemProps>(
  ({ children, order, grow, shrink, basis, alignSelf, ...otherProps }, ref) => {
    const style = useStyleConfig('GroupItem', { order, grow, shrink, basis, alignSelf });

    const props = {
      'data-component': 'GroupItem',
      ref,
      __css: style,
      ...otherProps,
    };

    return <Box {...props}>{children}</Box>;
  }
);

GroupItem.displayName = 'GroupItem';
