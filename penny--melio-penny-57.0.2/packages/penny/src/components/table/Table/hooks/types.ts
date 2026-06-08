import type {
  CellContext as _CellContext,
  ExpandedState,
  HeaderContext,
  Row,
  RowSelectionState,
  TableMeta,
  TableOptions,
} from '@tanstack/react-table';
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';

import type { TooltipProps } from '@/components/dataDisplay/Tooltip/tooltip.types';

import type { ColSize, ColTextAlign, TableProps } from '../Table.types';

export type HeaderProps<M> = { meta?: M };

export type CellProps = { isLoading?: boolean };

export type CellContext<T> = _CellContext<T, unknown> & CellProps;

export type SelectableRowOptions<T> = {
  disableAllRowsSelection?: boolean;
  disableRowSelection?: (rowData: T) => boolean;
  rowSelectionTooltips?: RowSelectionTooltips<T>;
  onRowSelectionChange?: (rowSelectionState: TableRowSelectionState<T>) => void;
  onAllRowsSelectionChange?: (areAllSelected: boolean) => void;
  getRowSelectionAriaLabel?: (rowData: T) => string;
  getRowSelectionAriaLabelledBy?: (rowData: T & { index: number; isSelectionDisabled: boolean }) => string | undefined;
  getRowSelectionAriaDescribedBy?: (rowData: T & { index: number; isSelectionDisabled: boolean }) => string | undefined;
  allRowsSelectionAriaLabel?: string;
  rowsSelectionHeaderCellAriaLabel?: string;
  renderRowSelectionHeaderRightElement?: (headerContext: HeaderContext<T, unknown>) => ReactNode;
};

export type ColumnMeta<T> = {
  size?: ColSize;
  textAlign?: ColTextAlign;
  isPinnedToLeft?: boolean;
  isPinnedToRight?: boolean;
  // Sets all column cells with `role=rowheader`
  // Usually for a column describing the row like name
  isRowHeader?: boolean;
  selectableRowOptions?: SelectableRowOptions<T> & { data: T[] };
  cellRenderer?: CellRenderer<T, TableMeta<T>>;
  subRowCellRenderer?: SubRowCellRenderer<SubRow<T>, TableMeta<T>>;
  headerAriaLabel?: string;
};

type CellRenderer<T, M> = (props: {
  row: T;
  rowIndex: number;
  columnId: string;
  meta?: M;
  getToggleExpandedHandler: () => () => void;
  getIsExpanded: () => boolean;
  subRows: Row<T>[];
}) => ReactNode;

type SubRowCellRenderer<T, M> = (props: {
  row: T;
  parentId?: string;
  rowIndex: number;
  columnId: string;
  meta?: M;
}) => ReactNode;

export type SubRow<T> = T extends { subRows?: Array<infer S> } ? S : never;

export type TableColumnDef<T, M = void> = {
  id: string;
  header?: string | ReactElement;
  cell: CellRenderer<T, M>;
  subRowCell?: SubRowCellRenderer<SubRow<T>, M>;
} & ColumnMeta<T>;

type DataType<D> = { [P in keyof D]: D[P] };

export type TableDataEntity<R, S = void> = DataType<R> & { id?: string; subRows?: S[] };

export type DataEntity<T> = TableDataEntity<T, SubRow<T>>;

type RowSelectionTooltipProps = Pick<TooltipProps, 'content'>;

type RowSelectionTooltips<T> = {
  header?: RowSelectionTooltipProps;
  row?: ({
    rowData,
    isSelectionDisabled,
  }: {
    rowData: T;
    isSelectionDisabled: boolean;
  }) => RowSelectionTooltipProps | undefined;
};

export type TableRowSelectionState<T> = {
  rowId: string;
  rowData: T;
  isSelected: boolean;
};

export type TableRowExpandedState = {
  rowId: string;
  isExpanded: boolean;
};

export type UseTableOptions<T, M = void> = {
  columns: TableColumnDef<T, M>[];
  meta?: M;
  defaultSelectedRows?: RowSelectionState;
  selectedRows?: RowSelectionState;
  mobileRowRenderer?: (rowData: T, meta?: M) => ReactElement;
  setSelectedRows?: Dispatch<SetStateAction<RowSelectionState>>;
  defaultExpandedRows?: ExpandedState;
  onRowExpandChange?: (rowExpandedState: TableRowExpandedState) => void;
} & SelectableRowOptions<T> &
  Pick<
    TableProps<T>,
    | 'captionId'
    | 'onRowClick'
    | 'isLoading'
    | 'hideHeaderWhileLoading'
    | 'loadingRowIds'
    | 'headerVariant'
    | 'highlightedRowIds'
    | 'isHeaderSticky'
    | 'sortingState'
    | 'setSortState'
  > &
  Pick<TableOptions<T>, 'data' | 'getRowId'>;

export type UseColumnDefsOptions<T, M = void> = Pick<
  UseTableOptions<T, M>,
  | 'columns'
  | 'data'
  | 'disableAllRowsSelection'
  | 'rowSelectionTooltips'
  | 'onRowSelectionChange'
  | 'onAllRowsSelectionChange'
  | 'getRowSelectionAriaLabel'
  | 'allRowsSelectionAriaLabel'
  | 'onRowExpandChange'
  | 'getRowSelectionAriaDescribedBy'
  | 'getRowSelectionAriaLabelledBy'
  | 'rowsSelectionHeaderCellAriaLabel'
  | 'renderRowSelectionHeaderRightElement'
>;
