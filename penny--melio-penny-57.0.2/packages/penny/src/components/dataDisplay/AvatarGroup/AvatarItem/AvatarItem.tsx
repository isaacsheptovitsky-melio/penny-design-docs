import { Box } from '@chakra-ui/react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Avatar } from '../../Avatar';
import { Tooltip } from '../../Tooltip';
import type { AvatarItemProps } from '../AvatarGroup.types';

export const AvatarItem = ({ isLast, ...props }: AvatarItemProps & { isLast?: boolean }) => {
  const styles = useMultiStyleConfig('AvatarGroup', { isLast });

  return (
    <Tooltip content={props.name} placement="top">
      <Box as="span" __css={styles['avatar']} aria-label={props.name} tabIndex={0}>
        <Avatar {...props} size="extra-small" />
      </Box>
    </Tooltip>
  );
};

AvatarItem.displayName = 'AvatarItem';
