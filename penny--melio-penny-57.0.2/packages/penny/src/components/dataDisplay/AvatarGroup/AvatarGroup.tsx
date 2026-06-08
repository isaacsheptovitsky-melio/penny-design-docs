import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';

import { useMultiStyleConfig } from '../../../theme/hooks/use-style-config';
import { Tooltip } from '../Tooltip';
import { getRestItemsTooltip, MAX_ITEMS } from './avatar-group.utils';
import { type AvatarGroupProps } from './AvatarGroup.types';
import { AvatarItem } from './AvatarItem/AvatarItem';

/**
 * AvatarGroup component displays a collection of avatars in a stacked layout.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ items, 'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.AVATAR_GROUP, ...props }, ref) => {
    const styles = useMultiStyleConfig('AvatarGroup', {});
    const avatarItems = items.slice(0, MAX_ITEMS);
    const restItems = items.length > MAX_ITEMS ? items.slice(MAX_ITEMS, items.length) : undefined;
    const getTestId = useTestId(dataTestId);

    return (
      <Box data-component="AvatarGroup" {...props} __css={styles['container']} ref={ref} {...getTestId()}>
        {avatarItems.map((avatarProps, i) => (
          <AvatarItem
            key={`${avatarProps.name}-${i}`}
            {...getTestId(`item-${i}`)}
            {...avatarProps}
            isLast={i === avatarItems.length - 1}
          />
        ))}
        {restItems && (
          <Tooltip content={getRestItemsTooltip(restItems)}>
            <Box as="span" __css={styles['description']} tabIndex={0} {...getTestId('description')}>
              +{restItems.length}
            </Box>
          </Tooltip>
        )}
      </Box>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
