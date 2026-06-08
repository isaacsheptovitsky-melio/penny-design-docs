import type { BoxProps } from '@chakra-ui/react';
import type { SortDirection, Table } from '@tanstack/react-table';
import type { Dispatch, ReactElement, SetStateAction } from 'react';

import type { ThemeBreakpointsKey } from '@/theme/foundations/breakpoints';

import { type TableContextData } from './TableContext';

type RowFnParam<T> = {
  rowId: string;
  rowData: T;
};

export { type SortDirection };

export type SortingState = {
  id: string;
  sortDirection: SortDirection;
};

export type TableRootProps = BoxProps & {
  isLoading?: boolean;
  hideHeaderWhileLoading?: boolean;
  isHeaderSticky?: boolean;
} & TableContextData;

export type PinnedCellOptions = {
  left?: number;
  right?: number;
  showBorder?: boolean;
};

export type TableBaseCellProps = BoxProps & {
  size?: ColSize;
  textAlign?: ColTextAlign;
  pinOptions?: PinnedCellOptions;
  omitRole?: boolean;
};

export type TableProps<T> = TableRootProps &
  Pick<Table<T>, 'getHeaderGroups' | 'getRowModel' | 'getState' | 'setColumnSizing'> & {
    captionId?: string;
    onRowClick?: (param: RowFnParam<T>) => void;
    loadingRowIds?: string[];
    highlightedRowIds?: string[];
    mobileRowRenderer?: (rowData: T) => ReactElement;
    sortingState?: SortingState;
    setSortState?: Dispatch<SetStateAction<SortingState | undefined>>;
    /**
     * Specifies the breakpoint at which the table should switch to mobile view.
     * When the screen size is at or below this breakpoint, the mobile renderer will be used.
     * @default 'xs' - Mobile view is enabled only for extra small screens (0-599px)
     * @example
     * // Enable mobile view for small screens and below (0-904px)
     * mobileViewBreakpoint="s"
     *
     * // Enable mobile view for medium screens and below (0-1239px)
     * mobileViewBreakpoint="m"
     */
    mobileViewBreakpoint?: ThemeBreakpointsKey;
  };

export type ColSize = 'xs' | 's' | 'm' | 'l' | number;

export type ColTextAlign = 'start' | 'center' | 'end';
