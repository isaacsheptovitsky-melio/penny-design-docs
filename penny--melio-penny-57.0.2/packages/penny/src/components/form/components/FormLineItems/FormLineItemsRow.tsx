import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Blanket } from '@/components/internal/Blanket';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type RowProps } from './FormLineItems.types';

/**
 * Defines a row of cells in a FormLineItems table.
 */
export const FormLineItemsRow = forwardRef<HTMLDivElement, RowProps>(
  ({ isLoading, children, 'data-testid': dataTestId = 'form-line-items-row', ...props }, ref) => {
    const styles = useMultiStyleConfig('FormLineItems', {});
    const getTestId = useTestId(dataTestId);

    return (
      <Box __css={styles['row']} ref={ref} data-component="FormLineItemsRow" role="row" {...getTestId()} {...props}>
        {children}
        <Blanket isOpen={isLoading} variant="light" />
      </Box>
    );
  }
);

FormLineItemsRow.displayName = 'FormLineItemsRow';
