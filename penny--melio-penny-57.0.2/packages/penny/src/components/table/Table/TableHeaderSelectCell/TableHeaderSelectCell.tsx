import { noop } from '@melio/penny-utils';
import { forwardRef, useState } from 'react';

import {
  SelectableDropdownMenu,
  type SelectableDropdownMenuItem,
  type SelectableDropdownMenuProps,
} from '@/components/containers/menus/SelectableDropdownMenu';

import {
  TableHeaderMenuTriggerCell,
  type TableHeaderMenuTriggerCellProps,
} from '../TableHeaderMenuTriggerCell/TableHeaderMenuTriggerCell';

export type TableHeaderSelectCellProps = {
  label: string;
  options: SelectableDropdownMenuItem[];
  onSelect: (option: SelectableDropdownMenuItem['value']) => void;
  footerAction?: SelectableDropdownMenuProps['footer'];
  value?: SelectableDropdownMenuItem['value'];
  'data-testid'?: string;
  description?: string;
} & Pick<TableHeaderMenuTriggerCellProps, 'tooltipLabel'>;

export const TableHeaderSelectCell = forwardRef<HTMLDivElement, TableHeaderSelectCellProps>(
  ({ label, options, onSelect, footerAction, value, description, ...restProps }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSelect = (item: SelectableDropdownMenuItem) => {
      if (!value || item.value !== value) {
        onSelect(item.value);
      }

      setIsMenuOpen(false);
    };

    const selectedOption = options?.find((option) => option.value === value);

    const trigger = (
      <TableHeaderMenuTriggerCell
        data-component="TableHeaderSelectCell"
        label={label}
        data-testid="table-select-cell"
        // TODO: remove empty `onClick`. It must be passed in order for the hover background color to show.
        // ticket - ME-452 - https://meliorisk.atlassian.net/browse/ME-452
        onClick={noop}
        isMenuOpen={isMenuOpen}
        description={description}
        {...restProps}
        ref={ref}
      />
    );

    const dropdownSelectableTestId = `${restProps['data-testid'] ?? 'table-select-header-cell'}-dropdown-selectable`;

    const optionsWithIndex = options.map((option, index) => ({
      ...option,
      index,
    }));

    return (
      <SelectableDropdownMenu
        trigger={trigger}
        items={optionsWithIndex}
        onOpenChange={setIsMenuOpen}
        isOpen={isMenuOpen}
        data-testid={dropdownSelectableTestId}
        onSelect={handleSelect}
        footer={footerAction && { ...footerAction, type: 'naked', variant: 'secondary' }}
        selectedItemValue={selectedOption?.value}
        size="large"
      />
    );
  }
);

TableHeaderSelectCell.displayName = 'TableHeaderSelectCell';
