import { Box } from '@chakra-ui/react';
import { useIntl, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { CurrencyProps } from './Currency.types';

/**
 * `Currency` component displays monetary values with proper formatting and localization.
 */
export const Currency = forwardRef<HTMLDivElement, CurrencyProps>(
  (
    { value, size = 'small', variant = 'default', currency = 'USD', 'data-testid': dataTestId = 'currency', ...props },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);
    const styles = useMultiStyleConfig('Currency', { size, variant });
    const { formatNumberToParts } = useIntl();

    const currencyParts = formatNumberToParts(Number(value.toFixed(2)), {
      style: 'currency',
      currencyDisplay: 'narrowSymbol',
      currency,
    });

    return (
      <Box __css={styles['container']} data-component="Currency" {...getTestId()} {...props} ref={ref}>
        {currencyParts.map((part, index) => {
          if (part.type === 'currency') {
            return (
              <Box __css={styles['currency']} as="span" key={index}>
                {part.value}
              </Box>
            );
          }

          if (part.type === 'fraction') {
            return (
              <Box __css={styles['fraction']} {...getTestId('fraction')} as="span" key={index}>
                {part.value}
              </Box>
            );
          }

          if (part.type === 'decimal') {
            return;
          }

          return (
            <Box __css={styles['integer']} as="span" key={index}>
              {part.value}
            </Box>
          );
        })}
      </Box>
    );
  }
);

Currency.displayName = 'Currency';
