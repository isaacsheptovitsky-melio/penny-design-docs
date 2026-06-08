import { Box } from '@chakra-ui/react';
import { useHasOverflow, useTestId } from '@melio/penny-utils';
import { type ForwardedRef, forwardRef, useRef } from 'react';

import { Group, GroupItem } from '@/components/containers/Group';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { getButtonLinkProps } from '../utils/getButtonLinkProps';
import type { NakedButtonProps } from './NakedButton.types';

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
      'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.NAKED_BUTTON,
      ...otherProps
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('NakedButton', { variant, shouldSupportEllipsis, size });

    const buttonAsLinkProps = getButtonLinkProps({ link, isDisabled });
    const getTestId = useTestId(dataTestId);

    const textRef = useRef<HTMLDivElement>(null);

    const { hasOverflowX } = useHasOverflow(textRef);
    const showTooltip = shouldSupportEllipsis && hasOverflowX;
    const sideElementProps = {
      shrink: 0,
      display: 'inline-flex',
      alignSelf: 'center',
    };

    return (
      <Tooltip content={label} isEnabled={showTooltip} dontDescribeChild>
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
            <Box ref={textRef} __css={styles['label']}>
              {label}
            </Box>
            {rightElement && <GroupItem {...sideElementProps}>{rightElement}</GroupItem>}
          </Group>
        </Box>
      </Tooltip>
    );
  }
);

NakedButton.displayName = 'NakedButton';
