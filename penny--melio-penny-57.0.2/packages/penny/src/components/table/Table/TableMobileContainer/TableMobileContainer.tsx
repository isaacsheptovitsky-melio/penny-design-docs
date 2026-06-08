import { Box } from '@chakra-ui/react';
import { type Table } from '@tanstack/react-table';
import { type KeyboardEvent, type ReactNode } from 'react';

import { Group } from '@/components/containers/Group/Group';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

// TODO: remove OnRowClickParam type definition & update TableMobileContainerProps type definition
// ticket - ME-36903 - https://meliorisk.atlassian.net/browse/ME-36903
type OnRowClickParam<T> = {
  rowId: string;
  rowData: T;
};

export type TableMobileContainerProps<T> = Pick<Table<T>, 'getRowModel'> & {
  onRowClick?: (param: OnRowClickParam<T>) => void;
  highlightedRowIds?: string[];
  isLoading?: boolean;
  mobileRowRenderer: (rowData: T) => ReactNode;
};

export const TableMobileContainer = <T,>({
  getRowModel,
  onRowClick,
  highlightedRowIds,
  isLoading,
  mobileRowRenderer,
}: TableMobileContainerProps<T>) => {
  const style = useMultiStyleConfig('TableMobileContainer', { isLoading });

  const handleKeyDown = (event: KeyboardEvent, rowId: string, rowData: T) => {
    if (!onRowClick) {
      return;
    }

    if ([' ', 'Enter'].includes(event.key)) {
      event.preventDefault();
      onRowClick({ rowId, rowData });
    }
  };

  return (
    <Box __css={style['container']}>
      <Group variant="vertical" spacing="none" hasDivider>
        {getRowModel().rows.map((row) => {
          const { id, original: rowData } = row;
          const isRowHighlighted = highlightedRowIds?.includes(id);

          return (
            <Box
              role={onRowClick && 'button'}
              data-highlighted={isRowHighlighted || null}
              data-testid={`table-row-${id}`}
              key={id}
              __css={style['row']}
              onClick={onRowClick ? () => onRowClick({ rowId: id, rowData }) : undefined}
              onKeyDown={(event) => handleKeyDown(event, id, rowData)}
              tabIndex={onRowClick ? 0 : -1}
            >
              {mobileRowRenderer(rowData)}
            </Box>
          );
        })}
      </Group>
    </Box>
  );
};

TableMobileContainer.displayName = 'TableMobileContainer';
