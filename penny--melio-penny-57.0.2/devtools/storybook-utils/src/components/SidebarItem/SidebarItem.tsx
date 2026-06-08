import { Box } from '@chakra-ui/react';
import React from 'react';

import { Badge, BadgeProps } from '../Badge';

export type SidebarProps = {
  name: string;
  badgeType?: BadgeProps['type'];
};

export const SidebarItem = ({ name, badgeType }: SidebarProps) => {
  const styles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: '15px',
  };

  return (
    <Box data-component="SidebarItem" __css={styles}>
      {name}
      {badgeType && <Badge type={badgeType} />}
    </Box>
  );
};

SidebarItem.displayName = 'Storybook.SidebarItem';
