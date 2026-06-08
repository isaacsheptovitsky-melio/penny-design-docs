import type { ColumnDef, ColumnDefTemplate, HeaderContext } from '@tanstack/react-table';
import { useMemo } from 'react';

import { TableHeaderSelectableCell } from '@/components/table/Table/TableHeaderSelectableCell/TableHeaderSelectableCell';
import { TableSelectableCell } from '@/components/table/Table/TableSelectableCell/TableSelectableCell';

import { expandColumnId, renderCell } from '../Table.utils';
import { TableCell } from '../TableCell/TableCell';
import { TableExpandCell } from '../TableExpandCell/TableExpandCell';
import type { ColumnMeta, DataEntity, UseColumnDefsOptions } from './types';

export const useColumnDefs = <T, M = void>({
  columns,
  data,
  disableAllRowsSelection,
  rowSelectionTooltips,
  onRowSelectionChange,
  allRowsSelectionAriaLabel,
  onAllRowsSelectionChange,
  getRowSelectionAriaLabel,
  onRowExpandChange,
  getRowSelectionAriaLabelledBy,
  getRowSelectionAriaDescribedBy,
  rowsSelectionHeaderCellAriaLabel,
  renderRowSelectionHeaderRightElement,
}: UseColumnDefsOptions<T, M>): ColumnDef<T>[] => {
  const expandColumnDef: ColumnDef<T> = useMemo(
    () => ({
      id: expandColumnId,
      cell: ({ row }) =>
        row.getCanExpand() ? (
          <TableExpandCell
            toggleExpanded={() => {
              onRowExpandChange?.({
                rowId: row.id,
                isExpanded: !row.getIsExpanded(),
              });

              // Invoking the wrapper function in addition to the handler.
              return row.getToggleExpandedHandler()();
            }}
            isExpanded={row.getIsExpanded()}
            data-testid={`table-row-${row.id}-expand-cell`}
          />
        ) : (
          <TableCell />
        ),
      meta: {
        textAlign: 'start',
        size: 'xs',
        isPinnedToLeft: columns.some((col) => col.isPinnedToLeft),
      },
    }),
    [columns, onRowExpandChange]
  );

  const columnDefs: ColumnDef<T>[] = useMemo(
    () =>
      columns.map(
        ({
          size,
          cell,
          subRowCell,
          header,
          headerAriaLabel,
          textAlign,
          isPinnedToLeft,
          isPinnedToRight,
          isRowHeader,
          ...restCol
        }) => ({
          ...restCol,
          header: !header ? undefined : (header as ColumnDefTemplate<HeaderContext<T, unknown>>),
          cell: renderCell,
          meta: {
            size: size ? size : 'm',
            textAlign,
            isPinnedToLeft: Boolean(isPinnedToLeft),
            isPinnedToRight: Boolean(isPinnedToRight),
            isRowHeader: Boolean(isRowHeader),
            cellRenderer: cell,
            subRowCellRenderer: subRowCell,
            headerAriaLabel,
          },
        })
      ),
    [columns]
  );

  const selectableColumnDef: ColumnDef<T> = useMemo(
    () => ({
      id: 'selectable',
      header: TableHeaderSelectableCell,
      cell: TableSelectableCell,
      meta: {
        textAlign: 'start',
        size: renderRowSelectionHeaderRightElement ? 88 : 'xs',
        isPinnedToLeft: columns.some((col) => col.isPinnedToLeft),
        selectableRowOptions: {
          disableAllRowsSelection,
          onRowSelectionChange,
          rowSelectionTooltips,
          getRowSelectionAriaLabel,
          allRowsSelectionAriaLabel,
          data,
          onAllRowsSelectionChange,
          getRowSelectionAriaLabelledBy,
          getRowSelectionAriaDescribedBy,
          rowsSelectionHeaderCellAriaLabel,
          renderRowSelectionHeaderRightElement,
        },
      },
    }),
    [
      columns,
      disableAllRowsSelection,
      onRowSelectionChange,
      rowSelectionTooltips,
      getRowSelectionAriaLabel,
      allRowsSelectionAriaLabel,
      data,
      onAllRowsSelectionChange,
      getRowSelectionAriaLabelledBy,
      getRowSelectionAriaDescribedBy,
      rowsSelectionHeaderCellAriaLabel,
      renderRowSelectionHeaderRightElement,
    ]
  );

  const sortedColumnDefs = useMemo(
    () =>
      [...columnDefs].sort((a, b) => {
        const colAMeta = a.meta as ColumnMeta<T>;
        const colBMeta = b.meta as ColumnMeta<T>;

        // Determine if columns are pinned to the left or pinned to the right
        const isAPinnedToLeft = Boolean(colAMeta.isPinnedToLeft);
        const isBPinnedToLeft = Boolean(colBMeta.isPinnedToLeft);
        const isAPinnedToRight = Boolean(colAMeta.isPinnedToRight);
        const isBPinnedToRight = Boolean(colBMeta.isPinnedToRight);

        // Perform the comparison
        if (isAPinnedToLeft && !isBPinnedToLeft) {
          return -1; // colA comes before colB
        }
        if (!isAPinnedToLeft && isBPinnedToLeft) {
          return 1; // colB comes before colA
        }
        if (isAPinnedToRight && !isBPinnedToRight) {
          return 1; // colB comes before colA
        }
        if (!isAPinnedToRight && isBPinnedToRight) {
          return -1; // colA comes before colB
        }

        // If both columns are either pinned to the left, pinned to the right, or neither, maintain original order
        return 0;
      }),
    [columnDefs]
  );

  return useMemo(() => {
    const actionColumnDefs: ColumnDef<T>[] = [];

    if (onRowSelectionChange || onAllRowsSelectionChange) actionColumnDefs.push(selectableColumnDef);

    const isExpandable = (data as DataEntity<T>[]).some((d) => Boolean(d.subRows?.length));
    if (isExpandable) actionColumnDefs.push(expandColumnDef);

    return [...actionColumnDefs, ...sortedColumnDefs];
  }, [onRowSelectionChange, onAllRowsSelectionChange, selectableColumnDef, data, expandColumnDef, sortedColumnDefs]);
};
