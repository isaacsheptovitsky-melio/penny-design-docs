import { type _MenuFooterProps } from '../Menu/components';
import { type MenuProps } from '../Menu/Menu.types';
import { type SelectableItemProps } from './SelectableItem';

export type SelectableDropdownMenuProps = Pick<
  MenuProps,
  'trigger' | 'isDisabled' | 'isReadOnly' | 'title' | 'isOpen' | 'onOpenChange' | 'data-testid' | 'placement'
> & {
  /** The list of selectable items to display in the menu. */
  items?: SelectableDropdownMenuItem[];
  /** The size of the menu. */
  size?: 'small' | 'large';
  /** The value of the currently selected item. */
  selectedItemValue?: SelectableDropdownMenuItem['value'];
  /** Callback fired when an item is selected. */
  onSelect?: (item: SelectableDropdownMenuItem) => void;
  /** Configuration for the footer button. */
  footer?: Pick<_MenuFooterProps, 'label' | 'dataTestId' | 'isDisabled' | 'onClick'> &
    (ButtonFooterProps | NakedButtonFooterProps);
  /** The trigger element that opens the dropdown. */
  trigger: MenuProps['trigger'];
  /** Determines if the menu is disabled. */
  isDisabled?: boolean;
  /** Determines if the menu is read-only. */
  isReadOnly?: boolean;
  /** The title displayed in the menu. */
  title?: string;
  /** Determines if the menu is open. */
  isOpen?: boolean;
  /** Callback fired when the menu open state changes. */
  onOpenChange?: (isOpen: boolean) => void;
};

export type SelectableDropdownMenuItem = SelectableItemProps;

type ButtonFooterProps = {
  type?: 'button';
  variant?: never;
};

type NakedButtonFooterProps = {
  type?: 'naked';
  variant?: 'primary' | 'secondary';
};
