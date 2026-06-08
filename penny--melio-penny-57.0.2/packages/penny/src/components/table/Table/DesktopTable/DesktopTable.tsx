import { useMergeRefs } from '@floating-ui/react';
import { flexRender } from '@tanstack/react-table';
import {
  cloneElement,
  type ForwardedRef,
  forwardRef,
  isValidElement,
  type NamedExoticComponent,
  useEffect,
  useRef,
} from 'react';

import { Blanket } from '@/components/internal/Blanket/Blanket';
import { useTableFocus } from '@/components/table/Table/hooks/useTableFocus';
import { useScrollBorders } from '@/theme/hooks/useScrollBorders';

import type { ColumnMeta, HeaderProps } from '../hooks/types';
import type { TableProps } from '../Table.types';
import { columnSizingHandler, expandColumnId, getPinOptions } from '../Table.utils';
import { TableBody } from '../TableBody/TableBody';
import { TableContext } from '../TableContext';
import { TableDataCell } from '../TableDataCell/TableDataCell';
import { TableHead } from '../TableHead/TableHead';
import { TableHeaderBaseCell } from '../TableHeaderBaseCell/TableHeaderBaseCell';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';
import { TableHeaderRow } from '../TableHeaderRow/TableHeaderRow';
import { TableRoot } from '../TableRoot/TableRoot';
import { TableRow } from '../TableRow/TableRow';

// Helper function to find the nearest scrollable ancestor
const getScrollableParent = (node: HTMLElement | null): HTMLElement | null => {
  while (node) {
    const { overflow, overflowX, overflowY } = getComputedStyle(node);
    if (
      overflow === 'auto' ||
      overflow === 'scroll' ||
      overflowX === 'auto' ||
      overflowX === 'scroll' ||
      overflowY === 'auto' ||
      overflowY === 'scroll'
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

export const DesktopTableComponent = <T,>(
  {
    captionId,
    getHeaderGroups,
    getState,
    setColumnSizing,
    getRowModel,
    onRowClick,
    isLoading,
    hideHeaderWhileLoading,
    loadingRowIds = [],
    highlightedRowIds = [],
    isHeaderSticky,
    sortingState,
    headerVariant,
    ...restProps
  }: Omit<TableProps<T>, 'mobileRowRenderer'>,
  propsRef: ForwardedRef<HTMLDivElement>
) => {
  const lastSubRowIds: string[] = [];
  const shouldShowTableHeaderWhileLoading = !isLoading || !hideHeaderWhileLoading;
  const tableContainerRef = useRef(null);
  const ref = useMergeRefs([propsRef, tableContainerRef]);

  const focusedCellId = useTableFocus({ ref: tableContainerRef });
  const scrollableParentRef = useRef<HTMLElement | null>(null);

  /**
   * Handles the case where the table has a sticky header and pinned columns.
   * Since the table container has no overflow to detect the scroll event,
   * this identifies the closest scrollable container to handle scrolling.
   */
  useEffect(() => {
    if (!tableContainerRef.current || !isHeaderSticky) return;

    const scrollableParent = getScrollableParent(tableContainerRef.current);

    if (scrollableParent) {
      scrollableParentRef.current = scrollableParent;
    }
  }, [isHeaderSticky]);

  const { scrollAtLeft, scrollAtRight, isOverflowX } = useScrollBorders({
    ref: isHeaderSticky ? scrollableParentRef : tableContainerRef,
  });

  return (
    <TableContext.Provider value={{ headerVariant, focusedCellId }}>
      <TableRoot
        {...restProps}
        ref={ref}
        isLoading={isLoading}
        isHeaderSticky={isHeaderSticky}
        data-component="Table"
        aria-labelledby={captionId}
        aria-busy={isLoading}
      >
        {shouldShowTableHeaderWhileLoading && (
          <TableHead isHeaderSticky={isHeaderSticky}>
            {getHeaderGroups().map((headerGroup) => (
              <TableHeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isExpandControlColumn = header.id.includes(expandColumnId);
                  const { size, textAlign, headerAriaLabel } = header.column.columnDef.meta as ColumnMeta<T>;
                  const headerContext = header.getContext();
                  const headerComp = flexRender(header.column.columnDef.header, headerContext);

                  const headerEle = !headerComp ? null : typeof header.column.columnDef.header === 'string' ? (
                    <TableHeaderCell textAlign={textAlign}>{header.column.columnDef.header}</TableHeaderCell>
                  ) : (
                    isValidElement(headerComp) &&
                    cloneElement(headerComp, {
                      id: `${header.id}-header`,
                      meta: headerContext.table.options.meta,
                    } as HeaderProps<T>)
                  );

                  const headerCellAriaLabel =
                    (header.column.columnDef.meta as ColumnMeta<T>).selectableRowOptions
                      ?.rowsSelectionHeaderCellAriaLabel ?? headerAriaLabel;

                  return (
                    <TableHeaderBaseCell
                      key={header.id}
                      size={size}
                      textAlign={textAlign}
                      variant={headerVariant}
                      pinOptions={getPinOptions(header.column, isOverflowX, scrollAtLeft, scrollAtRight)}
                      data-testid={`table-header-cell-${header.column.columnDef.id as string}`}
                      sortDirection={sortingState?.id === header.id ? sortingState.sortDirection : undefined}
                      ref={(element) => columnSizingHandler(element, getState, setColumnSizing, header.column)}
                      aria-label={headerCellAriaLabel}
                      omitRole={isExpandControlColumn}
                    >
                      {headerEle}
                    </TableHeaderBaseCell>
                  );
                })}
              </TableHeaderRow>
            ))}
          </TableHead>
        )}
        <TableBody isLoading={isLoading}>
          {getRowModel().rows.map((row) => {
            if (row.subRows.length > 0) {
              // This is needed in order to know `isLastSubRow` so we can remove the border from its 'expand' cell.
              const lastSubRowId = row.subRows[row.subRows.length - 1]?.id as string;
              lastSubRowIds.push(lastSubRowId);
            }
            const rowIsLoading = loadingRowIds.includes(row.id);
            const isRowHighlighted = highlightedRowIds.includes(row.id);
            const isSubRow = row.depth > 0;

            return (
              <TableRow
                key={row.id}
                onClick={onRowClick ? () => onRowClick({ rowId: row.id, rowData: row.original }) : undefined}
                isSubRow={isSubRow}
                isLastSubRow={lastSubRowIds.includes(row.id)}
                data-testid={isSubRow ? `table-sub-row-${row.id}` : `table-row-${row.id}`}
                isRowHighlighted={isRowHighlighted}
                // https://meliorisk.atlassian.net/browse/ME-109904
                id={row.id}
              >
                {row.getVisibleCells().map((cell) => {
                  const { size, textAlign, isRowHeader } = cell.column.columnDef.meta as ColumnMeta<T>;
                  const isExpandControlColumn = cell.id.includes(expandColumnId);
                  const isNotExpandCellOnParentRow = !(row.depth === 0 && isExpandControlColumn);

                  return (
                    <TableDataCell
                      key={cell.id}
                      size={size}
                      textAlign={textAlign}
                      pinOptions={getPinOptions(cell.column, isOverflowX, scrollAtLeft, scrollAtRight)}
                      omitRole={isExpandControlColumn}
                      isRowHeader={isRowHeader}
                    >
                      <Blanket variant="light" isOpen={rowIsLoading && isNotExpandCellOnParentRow} />
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        isLoading: rowIsLoading,
                      })}
                    </TableDataCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableRoot>
    </TableContext.Provider>
  );
};

export const DesktopTable = forwardRef(DesktopTableComponent) as <T>(
  props: TableProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof DesktopTableComponent>;

(DesktopTable as NamedExoticComponent).displayName = 'Table';
