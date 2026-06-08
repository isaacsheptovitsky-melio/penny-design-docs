import { Box, forwardRef } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import type { ChipProps } from './Chip.types';

export const DEFAULT_CHIP_TEST_ID = 'chip';

/**
 * Use Chips to label, categorize, or organize items using keywords that describe them.
 */
export const Chip = forwardRef<ChipProps, 'button' | 'div'>(
  ({ as = 'button', label, selected = false, 'data-testid': dataTestId = DEFAULT_CHIP_TEST_ID, ...props }, ref) => {
    const styles = useStyleConfig('Chip');
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        {...getTestId()}
        as={as}
        aria-pressed={as === 'button' ? selected : undefined}
        data-component="Chip"
        data-selected={selected ? true : undefined}
        ref={ref}
        __css={styles}
        {...props}
      >
        {label}
      </Box>
    );
  }
);

Chip.displayName = 'Chip';
