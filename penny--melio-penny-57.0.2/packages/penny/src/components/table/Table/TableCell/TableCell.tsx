import { Box, type BoxProps } from '@chakra-ui/react';
import { type AllHTMLAttributes, Children, forwardRef, type KeyboardEvent, type MouseEvent } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { type ColTextAlign } from '../Table.types';

export type TableCellProps = AllHTMLAttributes<HTMLDivElement> &
  Pick<BoxProps, 'as'> & {
    textAlign?: ColTextAlign;
    isLoading?: boolean;
    isDisabled?: boolean;
  };

export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
  ({ children, placeholder, onClick, textAlign = 'start', isLoading, isDisabled, onKeyDown, ...props }, ref) => {
    const hasChildren = Children.toArray(children).length > 0;
    const isClickable = !!onClick && !isDisabled;
    const style = useStyleConfig('TableCell', {
      hasChildren,
      isClickable,
      textAlign,
    });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      if (!isClickable) return;

      event.stopPropagation();

      onClick?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (!onKeyDown) {
        return;
      }

      event.stopPropagation();

      onKeyDown?.(event);
    };

    return (
      <Box
        ref={ref}
        data-component="TableCell"
        __css={style}
        onClick={onClick ? handleClick : undefined}
        onKeyDown={handleKeyDown}
        aria-disabled={isDisabled}
        {...props}
      >
        {hasChildren ? children : placeholder}
      </Box>
    );
  }
);

TableCell.displayName = 'TableCell';
