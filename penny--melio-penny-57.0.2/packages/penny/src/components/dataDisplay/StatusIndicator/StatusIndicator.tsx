import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { StatusIndicatorProps } from './StatusIndicator.types';

/**
 * The `StatusIndicator` component provides visual status feedback through colored indicators.
 */
export const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(
  (
    {
      children,
      isDisabled,
      isReadOnly,
      status = 'brand',
      'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.STATUS_INDICATOR,
      ...props
    },
    ref
  ) => {
    const hasChildren = Boolean(children);
    const styles = useMultiStyleConfig('StatusIndicator', { status, hasChildren });
    const getTestId = useTestId(dataTestId);

    return (
      <Box as="span" __css={styles['container']}>
        <Box
          as="span"
          __css={styles['indicator']}
          data-component="StatusIndicator"
          data-disabled={isDisabled || null}
          data-readonly={isReadOnly || null}
          {...getTestId()}
          {...props}
          ref={ref}
        />
        {children}
      </Box>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';
