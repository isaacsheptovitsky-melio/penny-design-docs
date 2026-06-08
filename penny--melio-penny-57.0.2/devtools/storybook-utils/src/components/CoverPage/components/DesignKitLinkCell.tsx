import { Box } from '@chakra-ui/react';

import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { colorPalettes } from '../../shared-styles';

type DesignKitLinkCellHeaderType = { headerTitle: string; link?: never; label?: never };
type DesignKitLinkCellType = { link: string; label?: string; headerTitle?: never };

export type DesignKitLinkCellProps = DesignKitLinkCellHeaderType | DesignKitLinkCellType;

const styles = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '8px',
};

export const DesignKitLinkCell = ({ headerTitle, link, label }: DesignKitLinkCellProps) => {
  const linkElement = link && (
    <Link href={link} color={colorPalettes.neutral['800']} isExternal>
      {label ?? 'Link'}
    </Link>
  );

  return (
    <Box data-component="DesignKitLinkCell" __css={styles}>
      {headerTitle ?? linkElement ?? <Icon type="remove" color="light" />}
    </Box>
  );
};

DesignKitLinkCell.displayName = 'DesignKitLinkCell';
