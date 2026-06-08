import { Box } from '@chakra-ui/react';
import { type Currency, useIntl } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Group } from '@/components/containers/Group';
import type { TooltipProps } from '@/components/dataDisplay/Tooltip/tooltip.types';
import { _IconIndicator } from '@/components/internal/_IconIndicator/_IconIndicator';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { TableCell, type TableCellProps } from '../TableCell/TableCell';

export type TableAmountCellProps = {
  value?: number;
  additionalAmount?: { amount: number; tooltip?: Pick<TooltipProps, 'content'> };
  currency?: Currency;
  isDisabled?: boolean;
  textAlign?: TableCellProps['textAlign'];
};

export const TableAmountCell = forwardRef<HTMLDivElement, TableAmountCellProps>(
  ({ value = 0, additionalAmount, currency = 'USD', textAlign = 'end', isDisabled, ...props }, ref) => {
    const { formatCurrency } = useIntl();
    const hasValue = !!value;
    const style = useMultiStyleConfig('TableAmountCell', { hasValue });

    const getAdditionalAmount = (amount: number) => `${amount > 0 ? '+' : ''}${formatCurrency(amount, currency)}`;

    return (
      <TableCell ref={ref} data-component="TableAmountCell" textAlign={textAlign} isDisabled={isDisabled} {...props}>
        <Group variant="vertical" spacing="xxxs">
          <Box __css={style['value']} aria-disabled={isDisabled}>
            {formatCurrency(hasValue ? value : 0, currency)}
          </Box>
          {hasValue && !!additionalAmount && (
            <Box __css={style['additionalAmount']} aria-disabled={isDisabled}>
              {getAdditionalAmount(additionalAmount.amount)}
              {additionalAmount.tooltip && !isDisabled && (
                <_IconIndicator variant="informative" tooltip={additionalAmount.tooltip} />
              )}
            </Box>
          )}
        </Group>
      </TableCell>
    );
  }
);

TableAmountCell.displayName = 'TableAmountCell';
