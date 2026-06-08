import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type HeaderRowProps } from './FormLineItems.types';

/**
 * Defines a row of header cells in a FormLineItems table.
 */
export const FormLineItemsHeaderRow = forwardRef<HTMLDivElement, HeaderRowProps>(
  ({ 'data-testid': dataTestId = 'form-line-items-header-row', children, ...props }, ref) => {
    const styles = useMultiStyleConfig('FormLineItems', {});
    const getTestId = useTestId(dataTestId);

    return (
      <Box data-component="FormLineItemsHeaderRow" role="rowgroup" ref={ref} {...getTestId()} {...props}>
        <Box __css={styles['headerRow']} role="row">
          {children}
        </Box>
      </Box>
    );
  }
);

FormLineItemsHeaderRow.displayName = 'FormLineItemsHeaderRow';
