import { Box } from '@chakra-ui/react';

import { Badge, BadgeProps } from '../../Badge';
import { Link } from '../../Link';
import { colorPalettes } from '../../shared-styles';

type ComponentNameHeaderType = { headerTitle: string; badgeType?: never; name?: never; link?: never };
export type ComponentNameCellType = {
  name: string;
  link?: string;
  badgeType?: BadgeProps['type'];
  headerTitle?: never;
};

export type ComponentNameCellProps = ComponentNameHeaderType | ComponentNameCellType;

const styles = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '8px',
  color: colorPalettes.neutral['1000'],
};

export const ComponentNameCell = ({ headerTitle, name, link, badgeType }: ComponentNameCellProps) => (
  <Box data-component="ComponentNameCell" __css={styles}>
    {headerTitle ?? (
      <>
        {link ? <Link href={link}>{name}</Link> : name}
        {badgeType && <Badge type={badgeType} />}
      </>
    )}
  </Box>
);

ComponentNameCell.displayName = 'ComponentNameCell';
