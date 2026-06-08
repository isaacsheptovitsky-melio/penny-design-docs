import { Box, forwardRef } from '@chakra-ui/react';
import { type MouseEventHandler, type ReactNode } from 'react';

import { Text } from '@/components/dataDisplay/Text/Text';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { useTableContext } from '../hooks/useTableContext';
import { type ColTextAlign } from '../Table.types';
import { type TableCellProps } from '../TableCell/TableCell';

export type TableHeaderCellProps = {
  children?: ReactNode;
  onClick?: TableCellProps['onClick'];
  textAlign?: ColTextAlign;
  onMouseOver?: MouseEventHandler<HTMLDivElement>;
  onMouseOut?: MouseEventHandler<HTMLDivElement>;
  isDisabled?: boolean;
};

export const TableHeaderCell = forwardRef<TableHeaderCellProps, 'div'>(
  ({ textAlign = 'start', onClick, children, isDisabled, ...restProps }, ref) => {
    const { headerVariant } = useTableContext();
    const style = useStyleConfig('TableHeaderCell', {
      textAlign,
      isClickable: !!onClick && !isDisabled,
      variant: headerVariant,
    });

    return (
      <Box
        __css={style}
        data-component="TableHeaderCell"
        onClick={onClick}
        aria-disabled={isDisabled}
        {...restProps}
        ref={ref}
      >
        {typeof children === 'string' ? (
          <Text color="inherit" textStyle="inline">
            {children}
          </Text>
        ) : (
          (children ?? 'Empty Cell')
        )}
      </Box>
    );
  }
);

TableHeaderCell.displayName = 'TableHeaderCell';
