import { Box } from '@chakra-ui/react';
import type { FC } from 'react';

import { Divider, type DividerProps } from '@/components/dataDisplay/Divider';

export type GroupDividerProps = {
  isVertical: boolean;
  dividerProps?: Omit<DividerProps, 'variant'>;
};

export const GroupDivider: FC<GroupDividerProps> = ({ isVertical, dividerProps }) => (
  <Box
    as={(props: DividerProps) => (
      <Divider {...props} variant={isVertical ? 'vertical' : 'horizontal'} {...dividerProps} />
    )}
    alignSelf="stretch"
    height={isVertical ? 'auto' : void 0}
    flexGrow={0}
    data-component="GroupDivider"
  />
);

GroupDivider.displayName = 'GroupDivider';
