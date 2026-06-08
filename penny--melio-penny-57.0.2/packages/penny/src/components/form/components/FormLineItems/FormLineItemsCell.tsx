import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type CellProps } from './FormLineItems.types';

/**
 * Defines a data cell in a FormLineItems table.
 */
export const FormLineItemsCell = forwardRef<HTMLDivElement, CellProps>(
  ({ children, size, isSticky, 'data-testid': dataTestId = 'form-line-items-cell', ...props }, ref) => {
    const styles = useMultiStyleConfig('FormLineItems', { size });
    const getTestId = useTestId(dataTestId);

    // We need a cell content layer cause flex doesn't play well with padding
    return (
      <Box
        __css={styles['cell']}
        ref={ref}
        data-is-sticky={isSticky}
        data-component="FormLineItemsCell"
        role="cell"
        {...getTestId()}
        {...props}
      >
        <Box __css={styles['cellContent']} data-is-sticky={isSticky}>
          {children}
        </Box>
      </Box>
    );
  }
);

FormLineItemsCell.displayName = 'FormLineItemsCell';
