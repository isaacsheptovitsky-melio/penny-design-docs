import type { HeaderContext } from '@tanstack/react-table';

import { ConditionalWrapper, Group } from '@/components';
import { Checkbox } from '@/components/selectionAndInputs/Checkbox/Checkbox';
import type { ColumnMeta } from '@/components/table/Table/hooks/types';
import { useTableSelectableCellAriaLabel } from '@/components/table/Table/hooks/useTableSelectableCellAriaLabel';
import { getSelectRowId } from '@/components/table/Table/Table.utils';
import { TableHeaderCell } from '@/components/table/Table/TableHeaderCell/TableHeaderCell';

export function TableHeaderSelectableCell<T>({ table, column, header }: HeaderContext<T, unknown>) {
  const { selectableRowOptions } = column.columnDef.meta as ColumnMeta<T>;
  const ariaLabelProps = useTableSelectableCellAriaLabel({
    ariaLabel: selectableRowOptions?.allRowsSelectionAriaLabel,
  });
  const isChecked = table.getIsAllRowsSelected();
  const hasSelectedRows = table.getIsSomeRowsSelected();
  const isDisabled = selectableRowOptions?.disableAllRowsSelection;
  const isIndeterminate = hasSelectedRows && !isChecked;
  const tooltip = selectableRowOptions?.rowSelectionTooltips?.header;
  const shouldRenderRowSelectionHeaderRightElement = !!selectableRowOptions?.renderRowSelectionHeaderRightElement;

  const handleChange = (checked: boolean) => {
    selectableRowOptions?.onAllRowsSelectionChange?.(checked);

    table.toggleAllRowsSelected(checked);
  };

  return (
    <TableHeaderCell isDisabled={isDisabled} textAlign="center">
      <ConditionalWrapper
        condition={shouldRenderRowSelectionHeaderRightElement}
        wrapper={(children) => (
          <Group spacing="xs" alignItems="center" width="full">
            {children}
          </Group>
        )}
      >
        <Checkbox
          data-testid="table-selectable-header-cell"
          data-component="TableSelectableCell"
          value={isChecked}
          isChecked={isChecked}
          isDisabled={isDisabled}
          isIndeterminate={isIndeterminate}
          onChange={handleChange}
          tooltipProps={tooltip ? { ...tooltip, shouldAddTriggerFocus: false } : undefined}
          aria-controls={selectableRowOptions?.data.map((_, index) => getSelectRowId(index)).join(' ')}
          id="select-all-checkbox"
          {...ariaLabelProps}
        />

        {shouldRenderRowSelectionHeaderRightElement &&
          selectableRowOptions?.renderRowSelectionHeaderRightElement?.({
            table,
            column,
            header,
          })}
      </ConditionalWrapper>
    </TableHeaderCell>
  );
}

TableHeaderSelectableCell.displayName = 'TableHeaderSelectableCell';
