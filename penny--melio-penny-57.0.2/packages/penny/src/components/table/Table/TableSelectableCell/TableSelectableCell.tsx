import { Checkbox, TableCell } from '@/components';
import type { CellContext, ColumnMeta } from '@/components/table/Table/hooks/types';
import { useTableSelectableCellAriaLabel } from '@/components/table/Table/hooks/useTableSelectableCellAriaLabel';
import { getSelectRowId } from '@/components/table/Table/Table.utils';

export function TableSelectableCell<T>({ row, column }: CellContext<T>) {
  const { selectableRowOptions } = column.columnDef.meta as ColumnMeta<T>;
  const ariaLabelProps = useTableSelectableCellAriaLabel({
    ariaLabel: selectableRowOptions?.getRowSelectionAriaLabel?.(row.original),
  });
  const isChecked = row.getIsSelected();
  const isDisabled = !row.getCanSelect();
  const tooltip = selectableRowOptions?.rowSelectionTooltips?.row?.({
    rowData: row.original,
    isSelectionDisabled: !row.getCanSelect(),
  });
  const shouldRenderRowSelectionHeaderRightElement = !!selectableRowOptions?.renderRowSelectionHeaderRightElement;

  const handleChange = (checked: boolean) => {
    selectableRowOptions?.onRowSelectionChange?.({
      rowId: row.id,
      rowData: row.original,
      isSelected: !row.getIsSelected(),
    });

    row.getToggleSelectedHandler()(checked);
  };

  return (
    <TableCell
      isDisabled={isDisabled}
      textAlign={shouldRenderRowSelectionHeaderRightElement ? 'start' : 'center'}
      data-testid={`table-selectable-row-${row.id}`}
    >
      <Checkbox
        data-testid={`table-row-${row.id}-selectable-cell`}
        data-component="TableSelectableCell"
        value={isChecked}
        isChecked={isChecked}
        isDisabled={isDisabled}
        isIndeterminate={row.getIsSomeSelected()}
        tooltipProps={tooltip ? { ...tooltip, shouldAddTriggerFocus: false } : undefined}
        id={getSelectRowId(row.index)}
        onChange={handleChange}
        {...ariaLabelProps}
        aria-labelledby={selectableRowOptions?.getRowSelectionAriaLabelledBy?.({
          ...row.original,
          index: row.index,
          isSelectionDisabled: !row.getCanSelect(),
        })}
        aria-describedby={selectableRowOptions?.getRowSelectionAriaDescribedBy?.({
          ...row.original,
          index: row.index,
          isSelectionDisabled: !row.getCanSelect(),
        })}
      />
    </TableCell>
  );
}

TableSelectableCell.displayName = 'TableSelectableCell';
