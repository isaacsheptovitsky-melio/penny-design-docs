import type { TooltipProps } from '@/components/dataDisplay/Tooltip/tooltip.types';

import { type MenuProps } from '../Menu/Menu.types';
import { type SortItemProps } from './SortItem/SortItem.types';

export type SortDropdownMenuItemProps = Omit<SortItemProps, 'index' | 'onClick'> & {
  /** Callback fired when the sort item is clicked. */
  onClick?: (index: number) => void;
  /** Tooltip configuration for the item. */
  tooltipProps?: TooltipProps;
  /** The label of the sort item. */
  label: string;
  /** Whether the sort item is disabled. */
  disabled?: boolean;
  /** Test ID for the sort item. */
  dataTestId?: string;
};

export type SortDropdownMenuProps = Pick<
  MenuProps,
  'trigger' | 'isDisabled' | 'title' | 'isOpen' | 'onOpenChange' | 'data-testid' | 'placement'
> & {
  /** The list of sortable items to display in the menu. */
  items: SortDropdownMenuItemProps[];
  /** The size of the menu. */
  size?: 'small' | 'large';
  /** The index of the currently selected sort item. */
  selectedItemIndex: number;
  /** The current sort direction for the selected item. */
  sortDirection?: SortItemProps['sortDirection'];
  /** The trigger element that opens the dropdown. */
  trigger: MenuProps['trigger'];
  /** Determines if the menu is disabled. */
  isDisabled?: boolean;
  /** The title displayed in the menu. */
  title?: string;
  /** Determines if the menu is open. */
  isOpen?: boolean;
  /** Callback fired when the menu open state changes. */
  onOpenChange?: (isOpen: boolean) => void;
};
