import { type IconKey } from '@/theme/icons/icon.types';

import { type TriggerRenderProp } from '../Context';
import { type MenuProps } from '../Menu/Menu.types';
import { type ActionItemWithoutIndexProps } from './ActionItem';

export type ActionsDropdownMenuItemProps = ActionItemWithoutIndexProps;

export type BaseActionsDropdownMenuProps = Pick<
  MenuProps,
  'isDisabled' | 'title' | 'isOpen' | 'onOpenChange' | 'data-testid' | 'placement'
> & {
  /** The trigger element or render prop that opens the dropdown - if not provided, a default trigger will be used. */
  trigger?: React.JSX.Element | TriggerRenderProp;
  /** The items in the dropdown menu. */
  items: ActionsDropdownMenuItemProps[];
  /** The trigger's label. */
  label?: string;
  /** Determines the variant of the trigger. @default 'default' */
  variant?: 'default' | 'inverse';
  /** Determines if the menu should close when an item is clicked. @default true */
  shouldCloseMenuOnItemClick?: boolean;
  /** Sets an aria-label to the default trigger. */
  triggerAriaLabel?: string;
  /** Determines if the trigger should fill its container. */
  isFullWidthTrigger?: boolean;
  /** Determines the size of the trigger. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** The type of the icon of the action trigger (supports on `medium` / `large` sizes only) */
  icon?: IconKey;
  /** Determines whether the menu is open. */
  isOpen?: boolean;
  /** A function that toggles the menu's `isOpen` state. */
  onOpenChange?: (isOpen: boolean) => void;
  /** The title on the dropdown. */
  title?: string;
  /** Determines if the menu is disabled. */
  isDisabled?: boolean;
};

type InvalidSmallActionsDropdownMenuWithIcon = { size: 'small'; icon: IconKey };

export type ActionsDropdownMenuValidateProps<T extends BaseActionsDropdownMenuProps> =
  T extends InvalidSmallActionsDropdownMenuWithIcon
    ? "ActionsDropdownMenu Error: The `icon` prop is not supported when the `size` prop is set to 'small'."
    : T;

export type ActionsDropdownMenuProps = ActionsDropdownMenuValidateProps<BaseActionsDropdownMenuProps>;
