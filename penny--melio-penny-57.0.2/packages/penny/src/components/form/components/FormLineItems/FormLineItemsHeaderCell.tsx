import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type HeaderCellProps } from './FormLineItems.types';

/**
 * Defines a cell as the header of a group of table cells in a FormLineItems table.
 */
export const FormLineItemsHeaderCell = forwardRef<HTMLDivElement, HeaderCellProps>(
  ({ children, size, isSticky, 'data-testid': dataTestId = 'form-line-items-header-cell', ...props }, ref) => {
    const styles = useMultiStyleConfig('FormLineItems', { size });
    const getTestId = useTestId(dataTestId);

    const content =
      typeof children === 'string' ? (
        <Text color="semantic.text.secondary" textStyle="body4Semi" shouldSupportEllipsis>
          {children}
        </Text>
      ) : (
        children
      );

    // For a11y - table header can't be empty
    // The closest reference is table with two headers
    // https://www.w3.org/WAI/tutorials/tables/two-headers/
    const role = content ? 'columnheader' : 'cell';

    // We need a cell content layer cause flex doesn't play well with padding
    return (
      <Box
        __css={styles['headerCell']}
        ref={ref}
        data-is-sticky={isSticky}
        data-component="FormLineItemsHeaderCell"
        role={role}
        {...getTestId()}
        {...props}
      >
        <Box __css={styles['headerCellContent']}>{content}</Box>
      </Box>
    );
  }
);

FormLineItemsHeaderCell.displayName = 'FormLineItemsHeaderCell';
