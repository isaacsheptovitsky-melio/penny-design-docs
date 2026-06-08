import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Group, GroupItem } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';

import { useStyleConfig } from '../../../theme/hooks/use-style-config';
import { type _BaseBadgeProps } from './_BaseBadge.types';

/**
 * @private For internal use only.
 */
export const _BaseBadge = forwardRef<HTMLDivElement, _BaseBadgeProps>(
  (
    {
      isDisabled,
      isReadOnly,
      status,
      label,
      type = 'primary',
      leftElement,
      rightElement,
      'data-testid': dataTestId = `base-badge-${status}`,
      ...rest
    },
    ref
  ) => {
    const styles = useStyleConfig('_BaseBadge', { status, type });
    const sideElementProps = {
      shrink: 0,
      display: 'inline-flex',
      alignSelf: 'center',
    };
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        as="span"
        __css={styles}
        data-component="_BaseBadge"
        aria-disabled={isDisabled || undefined}
        data-readonly={isReadOnly || null}
        {...getTestId()}
        {...rest}
        ref={ref}
      >
        <Group spacing="xxs" justifyContent="center">
          {leftElement && (
            <GroupItem {...sideElementProps} {...getTestId('left-element')}>
              {leftElement}
            </GroupItem>
          )}
          <Text textStyle="inline" color="inherit">
            {label}
          </Text>
          {rightElement && (
            <GroupItem {...sideElementProps} {...getTestId('right-element')}>
              {rightElement}
            </GroupItem>
          )}
        </Group>
      </Box>
    );
  }
);

_BaseBadge.displayName = '_BaseBadge';
