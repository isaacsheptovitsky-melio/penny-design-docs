import type {
  Column,
  ColumnSort,
  OnChangeFn,
  RowData,
  SortingState as ReactTableSortingState,
} from '@tanstack/react-table';
import { cloneElement, type Dispatch, isValidElement, type SetStateAction } from 'react';

import type { ThemeBreakpointsKey } from '@/theme/foundations/breakpoints';
import type { InternalCSSObject } from '@/theme/types';

import type { CellContext, CellProps, ColumnMeta, SubRow } from './hooks/types';
import type { ColSize, PinnedCellOptions, SortingState as PennyTableSortingState, TableProps } from './Table.types';
import { TableCell } from './TableCell/TableCell';
export const expandColumnId = 'expand';

export const getSelectRowId = (index: number) => `selectable-row-checkbox-${index}`;

const BREAKPOINT_ORDER: Record<ThemeBreakpointsKey, number> = {
  xs: 0,
  s: 1,
  m: 2,
  l: 3,
  xl: 4,
} as const;

export const shouldUseMobileView = (
  currentBreakpoint: ThemeBreakpointsKey,
  mobileBreakpoint: ThemeBreakpointsKey
): boolean => BREAKPOINT_ORDER[currentBreakpoint] <= BREAKPOINT_ORDER[mobileBreakpoint];

export const toPennySortingState = (sorting: ReactTableSortingState): PennyTableSortingState | undefined => {
  const singleColumnSorting = sorting && sorting.length > 0 ? sorting[0] : undefined;

  if (!singleColumnSorting) {
    return undefined;
  }

  return {
    id: singleColumnSorting.id,
    sortDirection: singleColumnSorting.desc ? 'desc' : 'asc',
  };
};

export const toReactTableSortingState = (sorting: PennyTableSortingState | undefined): ColumnSort[] => {
  if (!sorting) {
    return [];
  }

  return [
    {
      id: sorting.id,
      desc: sorting.sortDirection === 'desc',
    },
  ] as ColumnSort[];
};

export const toReactTableOnSortingChange =
  (
    onSortingChange?: Dispatch<SetStateAction<PennyTableSortingState | undefined>>
  ): OnChangeFn<ReactTableSortingState> | undefined =>
  (nextSortingState) => {
    if (!onSortingChange) {
      return;
    }

    if (typeof nextSortingState === 'function') {
      onSortingChange((prevState: PennyTableSortingState | undefined) => {
        const reactTablePrevState = toReactTableSortingState(prevState);
        const reactTableNextState = nextSortingState(reactTablePrevState);
        return toPennySortingState(reactTableNextState);
      });

      return;
    }

    onSortingChange(toPennySortingState(nextSortingState));
  };

const baseColSizeMap = {
  xs: '48px',
  s: '128px',
  m: '247px',
  l: '350px',
} as const;

export const getCellSizes = (): Record<ColSize, InternalCSSObject> => ({
  xs: {
    minWidth: baseColSizeMap.xs,
    maxWidth: baseColSizeMap.xs,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 0,
  },
  s: {
    minWidth: baseColSizeMap.s,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  m: {
    minWidth: baseColSizeMap.m,
    flexGrow: 1.5,
    flexShrink: 0,
    flexBasis: 0,
  },
  l: {
    minWidth: baseColSizeMap.l,
    flexGrow: 2.5,
    flexShrink: 0,
    flexBasis: 0,
  },
});

export const getFixedCellSize = (size?: ColSize): InternalCSSObject =>
  typeof size === 'number'
    ? {
        minWidth: `${size}px`,
        width: `${size}px`,
        maxWidth: `${size}px`,
      }
    : {};

export const getPinnedCellStyle = (options: PinnedCellOptions | undefined): InternalCSSObject => {
  if (!options || (options.left === undefined && options.right === undefined)) {
    return {};
  }

  return {
    position: 'sticky',
    zIndex: 'docked',
    backgroundColor: 'inherit',
    ...(options.left !== undefined && {
      left: `${options.left}px`,
      borderRight: options.showBorder ? 'global.25' : undefined,
    }),
    ...(options.right !== undefined && {
      right: `${options.right}px`,
      borderLeft: options.showBorder ? 'global.25' : undefined,
    }),
  };
};

// from https://github.com/TanStack/table/discussions/3947#discussioncomment-9564867
export const columnSizingHandler = <T extends RowData>(
  thElem: HTMLDivElement | null,
  getState: TableProps<T>['getState'],
  setColumnSizing: TableProps<T>['setColumnSizing'],
  column: Column<T>
) => {
  if (!thElem) return;

  // If you don't do that, there will be an infinite loop. We update the value in state only if the value has actually changed.
  if (getState().columnSizing[column.id] === thElem.getBoundingClientRect().width) return;

  setColumnSizing((prevSizes) => ({
    ...prevSizes,
    // 100% accurate float-point width, even if table content is loaded async
    [column.id]: thElem.getBoundingClientRect().width,
  }));
};

export const getPinOptions = <T extends RowData>(
  column: Column<T>,
  isOverflowX: boolean | undefined,
  scrollAtLeft: boolean | undefined,
  scrollAtRight: boolean | undefined
): PinnedCellOptions => {
  const isPinned = column.getIsPinned();
  const isPinnedLeft = isPinned === 'left';
  const isPinnedRight = isPinned === 'right';

  const showPinnedToLeftBorder = isOverflowX && !scrollAtLeft;
  const showPinnedToRightBorder = isOverflowX && !scrollAtRight;

  return {
    left: isPinnedLeft ? column.getStart('left') : undefined,
    right: isPinnedRight ? column.getAfter('right') : undefined,
    showBorder:
      (isPinnedLeft && showPinnedToLeftBorder && column.getIsLastColumn('left')) ||
      (isPinnedRight && showPinnedToRightBorder && column.getIsFirstColumn('right')),
  };
};

export function renderCell<T>({ row, cell, column, table, isLoading }: CellContext<T>) {
  const meta = cell.column.columnDef.meta as ColumnMeta<T>;
  const isSubRow = row.depth > 0;

  const cellElement = isSubRow
    ? meta.subRowCellRenderer?.({
        row: row.original as SubRow<T>,
        rowIndex: row.index,
        columnId: column.id,
        meta: table.options.meta,
        parentId: row.parentId,
      })
    : meta.cellRenderer?.({
        row: row.original,
        subRows: row.subRows,
        rowIndex: row.index,
        columnId: column.id,
        meta: table.options.meta,
        getToggleExpandedHandler: row?.getToggleExpandedHandler,
        getIsExpanded: row?.getIsExpanded,
      });

  if (isValidElement(cellElement))
    return cloneElement(cellElement, {
      isLoading,
      id: `${column.id}${isSubRow ? `-${row.getParentRow()?.index}` : ''}-${row.index}-${isSubRow ? 'sub-row-cell' : 'cell'}`,
    } as CellProps);

  return <TableCell>{cellElement}</TableCell>;
}
