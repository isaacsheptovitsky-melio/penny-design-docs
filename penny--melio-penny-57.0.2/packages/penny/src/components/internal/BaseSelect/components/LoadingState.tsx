import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '../../../../theme/hooks/use-style-config';

type LoadingStateProps = TestIdProp;

export const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ 'data-testid': dataTestId = 'base-select', ...props }, ref) => {
    const styles = useMultiStyleConfig('BaseSelect', {});
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        data-component="BaseSelect.LoadingState"
        __css={styles['loading']}
        ref={ref}
        {...getTestId('loading-state')}
        {...props}
      >
        Loading...
      </Box>
    );
  }
);

LoadingState.displayName = 'BaseSelect.LoadingState';
