import type { ExpandedState, RowSelectionState, TableMeta } from '@tanstack/react-table';
import { getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

import type { TableProps } from '../Table.types';
import { toPennySortingState, toReactTableOnSortingChange, toReactTableSortingState } from '../Table.utils';
import type { ColumnMeta, DataEntity, UseTableOptions } from './types';
import { useColumnDefs } from './useColumnDefs';

export const useTable = <T extends DataEntity<T>, M = void>({
  data,
  columns,
  meta,
  captionId,
  onRowClick,
  isLoading,
  hideHeaderWhileLoading,
  loadingRowIds,
  disableAllRowsSelection,
  disableRowSelection,
  rowSelectionTooltips,
  defaultSelectedRows = {},
  mobileRowRenderer,
  isHeaderSticky,
  selectedRows: controlledSelectedRows,
  setSelectedRows: setControlledSelectedRows,
  onRowSelectionChange,
  onAllRowsSelectionChange,
  getRowSelectionAriaLabel,
  allRowsSelectionAriaLabel,
  defaultExpandedRows = {},
  onRowExpandChange,
  highlightedRowIds,
  headerVariant = 'light',
  sortingState,
  setSortState,
  getRowSelectionAriaLabelledBy,
  getRowSelectionAriaDescribedBy,
  rowsSelectionHeaderCellAriaLabel,
  renderRowSelectionHeaderRightElement,
  ...otherOptions
}: UseTableOptions<T, M>): TableProps<T> => {
  const [uncontrolledSelectedRows, setUncontrolledSelectedRows] = useState<RowSelectionState>(defaultSelectedRows);
  const selectedRows = controlledSelectedRows ?? uncontrolledSelectedRows;
  const setSelectedRows = setControlledSelectedRows ?? setUncontrolledSelectedRows;
  const [expanded, setExpanded] = useState<ExpandedState>(defaultExpandedRows);

  const columnDefs = useColumnDefs({
    columns,
    data,
    disableAllRowsSelection,
    rowSelectionTooltips,
    onRowSelectionChange,
    onAllRowsSelectionChange,
    getRowSelectionAriaLabel,
    allRowsSelectionAriaLabel,
    onRowExpandChange,
    getRowSelectionAriaLabelledBy,
    getRowSelectionAriaDescribedBy,
    rowsSelectionHeaderCellAriaLabel,
    renderRowSelectionHeaderRightElement,
  });

  const columnPinning = {
    left: columnDefs
      .filter((columnDef) => (columnDef.meta as ColumnMeta<T>).isPinnedToLeft)
      .map((columnDef) => columnDef.id as string),
    right: columnDefs
      .filter((columnDef) => (columnDef.meta as ColumnMeta<T>).isPinnedToRight)
      .map((columnDef) => columnDef.id as string),
  };

  // TODO: TanStack Table's useReactTable API returns functions that cannot be memoized with React Compiler
  // Track: https://github.com/TanStack/table/issues/5567
  // eslint-disable-next-line react-hooks/incompatible-library
  const { getHeaderGroups, getRowModel, getState, setColumnSizing } = useReactTable({
    data,
    columns: columnDefs,
    state: { expanded, rowSelection: selectedRows, sorting: toReactTableSortingState(sortingState), columnPinning },
    onSortingChange: toReactTableOnSortingChange(setSortState),
    // Suppress type error by casting to the expected type.
    meta: meta as TableMeta<T>,
    onRowSelectionChange: setSelectedRows,
    onExpandedChange: setExpanded,
    // Suppress type error by casting to the expected type.
    getSubRows: (row) => row.subRows as T[],
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow, index, parent) => originalRow.id || `${parent ? `${parent.index}.${index}` : index}`,
    ...otherOptions,
    enableRowSelection: (row) => {
      // Disable all rows if explicitly set.
      if (disableAllRowsSelection) return false;
      // Enable all rows by default.
      if (!disableRowSelection) return true;
      // Disable specific rows.
      return !disableRowSelection(row.original);
    },
  });

  return {
    getHeaderGroups,
    getRowModel,
    onRowClick,
    isLoading,
    hideHeaderWhileLoading,
    loadingRowIds,
    highlightedRowIds,
    headerVariant,
    mobileRowRenderer: mobileRowRenderer ? (rowData) => mobileRowRenderer(rowData, meta) : undefined,
    isHeaderSticky,
    captionId,
    sortingState: toPennySortingState(getState().sorting),
    getState,
    setColumnSizing,
  };
};
