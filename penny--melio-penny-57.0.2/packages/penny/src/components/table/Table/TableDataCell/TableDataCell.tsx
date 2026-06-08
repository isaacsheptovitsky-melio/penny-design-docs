import { Box, type BoxProps } from '@chakra-ui/react';
import { type AriaRole, forwardRef, type KeyboardEvent, useImperativeHandle, useRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { useCellSize } from '../hooks/useCellSize';
import { type ColSize, type ColTextAlign, type PinnedCellOptions } from '../Table.types';

type TableBaseCellProps = BoxProps & {
  size?: ColSize;
  textAlign?: ColTextAlign;
  pinOptions?: PinnedCellOptions;
  omitRole?: boolean;
};

export type TableDataCellProps = TableBaseCellProps & { isRowHeader?: boolean };

export const TableDataCell = forwardRef<HTMLDivElement, TableDataCellProps>(
  ({ size, textAlign = 'start', pinOptions, isRowHeader, onKeyDown, omitRole, ...props }, propRef) => {
    const ref = useRef<HTMLDivElement>(null);
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(propRef, () => ref.current);

    const style = useStyleConfig('TableDataCell', {
      size: useCellSize(size),
      textAlign,
      pinOptions,
    });

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      // We need to stop propagation even if the event didn't occur from the cell.
      // This is required in key down as opposed to click event for the following example:
      // The whole row is clickable, so the mouse click can occur on specific cells and need to propagate to hit the row.
      // When talking about keyboard navigation - there's a tab on the whole row in case it's clickable, and only then the key down should be done on the row.
      // Otherwise, the event should be done on the focused element (say it is a button in a cell in the row).
      event.stopPropagation();

      onKeyDown?.(event);
    };

    const getRole = (): AriaRole | undefined => {
      if (omitRole) {
        return undefined;
      }

      if (isRowHeader) {
        return 'rowheader';
      }

      return 'cell';
    };

    return (
      <Box
        role={getRole()}
        __css={style}
        data-component="TableDataCell"
        {...props}
        ref={ref}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

TableDataCell.displayName = 'TableDataCell';
