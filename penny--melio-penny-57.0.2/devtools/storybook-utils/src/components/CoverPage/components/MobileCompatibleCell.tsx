import { Box } from '@chakra-ui/react';

import { Icon, IconProps } from '../../Icon/Icon';

export type MobileCompatibleType = 'yes' | 'no' | 'n/a';

type MobileCompatibleHeaderType = { headerTitle: string; type?: never };
type MobileCompatibleCellType = { type: MobileCompatibleType; headerTitle?: never };

export type MobileCompatibleCellProps = MobileCompatibleHeaderType | MobileCompatibleCellType;

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
};

export const MobileCompatibleCell = ({ headerTitle, type = 'n/a' }: MobileCompatibleCellProps) => {
  const compatibleMap = {
    yes: 'checked',
    no: 'close',
    'n/a': 'remove',
  };

  return (
    <Box data-component="MobileCompatibleCell" style={styles}>
      {headerTitle ?? (
        <>
          {type && compatibleMap[type] && (
            <Icon type={compatibleMap[type] as IconProps['type']} color={type === 'n/a' ? 'light' : undefined} />
          )}
        </>
      )}
    </Box>
  );
};

MobileCompatibleCell.displayName = 'MobileCompatibleCell';
