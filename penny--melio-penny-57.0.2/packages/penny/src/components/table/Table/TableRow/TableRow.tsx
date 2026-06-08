import { Box, type BoxProps } from '@chakra-ui/react';
import { forwardRef, type KeyboardEventHandler, useRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { mergeRefs } from '@/utils/merge-refs';

type TableRowProps = BoxProps & { isSubRow: boolean; isLastSubRow: boolean; isRowHighlighted: boolean };

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  ({ onClick, isSubRow, isLastSubRow, isRowHighlighted, ...restProps }, ref) => {
    const style = useMultiStyleConfig('Table', { isSubRow, isLastSubRow, isRowHighlighted });

    const internalRowRef = useRef<HTMLDivElement | null>(null);

    const rowRef = mergeRefs([ref, internalRowRef]);

    const handleKeyDown: KeyboardEventHandler = (event) => {
      if (!onClick) {
        return;
      }

      if (event.key === ' ') {
        event.preventDefault();
        internalRowRef.current?.click();
      }

      if (event.key === 'Enter') {
        internalRowRef.current?.click();
      }
    };

    return (
      <Box
        role="row"
        __css={onClick ? style['clickableRow'] : style['row']}
        data-component="TableRow"
        data-highlighted={isRowHighlighted || undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...restProps}
        ref={rowRef}
      />
    );
  }
);

TableRow.displayName = 'TableRow';
