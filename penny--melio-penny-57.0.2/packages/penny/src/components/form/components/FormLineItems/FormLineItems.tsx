import { Box } from '@chakra-ui/react';
import { useHasOverflow, useTestId } from '@melio/penny-utils';
import { forwardRef, useRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { mergeRefs } from '@/utils/merge-refs';

import { FormLineItemsContext } from './components/Context';
import { type FormLineItemsProps } from './FormLineItems.types';

/**
 * A `FormLineItems` is a structured set of rows and columns.
 */
export const FormLineItems = forwardRef<HTMLDivElement, FormLineItemsProps>(
  ({ 'data-testid': dataTestId = 'form-line-items', ...props }, propRef) => {
    const innerRef = useRef(null);
    const ref = mergeRefs([innerRef, propRef]);
    const { hasOverflowX } = useHasOverflow(innerRef);
    const styles = useMultiStyleConfig('FormLineItems', { hasOverflowX });
    const getTestId = useTestId(dataTestId);

    return (
      <FormLineItemsContext.Provider value={{}}>
        <Box
          __css={styles['container']}
          ref={ref}
          data-component="FormLineItems"
          role="table"
          {...getTestId()}
          {...props}
        />
      </FormLineItemsContext.Provider>
    );
  }
);

FormLineItems.displayName = 'FormLineItems';
