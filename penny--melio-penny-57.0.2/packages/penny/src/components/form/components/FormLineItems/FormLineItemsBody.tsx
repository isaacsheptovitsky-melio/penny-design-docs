import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { LoadingContainer } from '@/components/containers/LoadingContainer';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type BodyProps } from './FormLineItems.types';

/**
 * Defines the body section of a FormLineItems table containing the data rows.
 */
export const FormLineItemsBody = forwardRef<HTMLDivElement, BodyProps>(
  ({ isLoading, children, 'data-testid': dataTestId = 'form-line-items-body', ...props }, ref) => {
    const styles = useMultiStyleConfig('FormLineItems', {});
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        __css={styles['body']}
        ref={ref}
        data-loading={isLoading}
        data-component="FormLineItemsBody"
        role="rowgroup"
        {...getTestId()}
        {...props}
      >
        <LoadingContainer isLoading={isLoading}>{children}</LoadingContainer>
      </Box>
    );
  }
);

FormLineItemsBody.displayName = 'FormLineItemsBody';
