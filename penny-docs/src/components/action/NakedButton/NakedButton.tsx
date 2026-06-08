import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { type ForwardedRef, forwardRef } from 'react';

import { Group, GroupItem } from '@/components/containers/Group';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { getButtonLinkProps } from '../utils/getButtonLinkProps';
import type { NakedButtonProps } from './NakedButton.types';

const DEFAULT_TEST_ID = 'naked-button';

/**
 * The NakedButton is a low-emphasis button used for secondary or tertiary actions.
 */
export const NakedButton = forwardRef<HTMLButtonElement, NakedButtonProps>(
  (
    {
      size = 'medium',
      variant = 'primary',
      isDisabled,
      label,
      link,
      shouldSupportEllipsis = false,
      leftElement,
      rightElement,
      'data-testid': dataTestId = DEFAULT_TEST_ID,
      ...otherProps
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('NakedButton', { variant, shouldSupportEllipsis, size });
    const buttonAsLinkProps = getButtonLinkProps({ link, isDisabled });
    const getTestId = useTestId(dataTestId);

    const sideElementProps = {
      shrink: 0,
      display: 'inline-flex',
      alignSelf: 'center',
    };

    return (
      <Box
        data-component="NakedButton"
        as="button"
        type="button"
        __css={styles['container']}
        {...otherProps}
        {...buttonAsLinkProps}
        {...(!link && { disabled: isDisabled })}
        ref={ref as ForwardedRef<HTMLDivElement>}
        {...getTestId()}
      >
        <Group spacing="xxs">
          {leftElement && <GroupItem {...sideElementProps}>{leftElement}</GroupItem>}
          <Box __css={styles['label']}>
            {label}
          </Box>
          {rightElement && <GroupItem {...sideElementProps}>{rightElement}</GroupItem>}
        </Group>
      </Box>
    );
  }
);

NakedButton.displayName = 'NakedButton';
