import type { TestIdProp } from '@melio/penny-utils';
import type {
  AriaAttributes,
  ChangeEventHandler,
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';

import type { NakedButtonProps } from '@/components/action/NakedButton';
import type { MenuContextProps } from '@/components/containers/menus/Context';
import type { TooltipProps } from '@/components/dataDisplay/Tooltip/tooltip.types';
import type { CommonInputProps } from '@/components/form/components/Form/inputs/types';
import type { FormFieldContext } from '@/components/form/components/FormField/FormField.types';
import type { FormSize } from '@/theme/utils/form.utils';

export type ComboboxOption<V> = {
  /**
   * The value of the option.
   */
  value: V;

  /**
   * The display label for the option.
   */
  label: string;

  /**
   * Whether the option is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Tooltip configuration for the option.
   */
  tooltipProps?: TooltipProps;

  /**
   * Test ID for the option.
   */
  testId?: string;
};

export type ComboboxSection<V, O extends ComboboxOption<V>> = {
  /**
   * The section label.
   */
  label: ReactNode;

  /**
   * The options within this section.
   */
  options: O[];

  /**
   * Test ID for the section.
   */
  testId?: string;
};

export type MobileViewProps = { closeButtonProps?: Partial<NakedButtonProps> } & HTMLAttributes<HTMLDivElement>;

export type SelectedOption<V, O extends ComboboxOption<V>> = O | null;

export type ComboboxProps<V, O extends ComboboxOption<V>> = {
  /**
   * The options in the dropdown menu.
   */
  options: O[] | ComboboxSection<V, O>[];

  /**
   * The value of the combobox. It must exist as one of its options' values.
   */
  value?: V;

  /**
   * The placeholder text for when there is no value.
   * @default 'Search'
   */
  placeholder?: string;

  /**
   * The placeholder text for when there is no value and the field is in view-mode.
   */
  viewModePlaceholder?: string;

  /**
   * The size of the field.
   * @default 'large'
   */
  size?: FormSize;

  /**
   * The combobox menu content when there are no options.
   * @default 'No options'
   */
  emptyState?: ReactNode;

  /**
   * The combobox menu content when `isLoadingOptions` is true.
   * @default 'Loading...'
   */
  loadingState?: ReactNode;

  /**
   * Sets the field as disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Sets the field as read-only.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Sets the field as required.
   * @default false
   */
  isRequired?: boolean;

  /**
   * Sets the field as view-mode.
   * @default false
   */
  isViewMode?: boolean;

  /**
   * Sets the field in invalid state.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Sets the field in loading state.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Sets the combobox **menu** to be in loading state.
   * @default false
   */
  isLoadingOptions?: boolean;

  /**
   * Sets the menu to be open.
   * @default false
   */
  isMenuOpen?: boolean;

  /**
   * The `aria-label` attribute for the clear button.
   * @default 'Clear selected option'
   */
  clearButtonAriaLabel?: string;

  /**
   * The footer of the combobox. You can use `ComboboxFooter` component to get the conventional paddings for the content.
   */
  footer?: ReactNode;

  /**
   * The header of the combobox. You can use `ComboboxHeader` component to get the conventional paddings for the content.
   */
  header?: ReactNode;

  /**
   * A function to render the options' content.
   */
  optionRenderer?: (option: O, isSelected: boolean) => ReactNode;

  /**
   * A function to render the trigger's content using the selected value.
   */
  valueRenderer?: (selectedOption: O) => ReactNode;

  /**
   * Callback fired when the selection changes.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * Callback fired when the field is focused.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;

  /**
   * Callback fired when the field is blurred.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /**
   * Callback fired when the field is clicked.
   */
  onClick?: MouseEventHandler<HTMLInputElement>;

  /**
   * Callback fired when a key is pressed.
   */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;

  /**
   * Callback fired when the clear button is clicked.
   */
  onClear?: VoidFunction;

  /**
   * Callback fired when the input value changes.
   */
  onInputChange?: (inputValue: string) => void;

  /**
   * Callback fired when the menu is closed.
   */
  onMenuClose?: VoidFunction;

  /**
   * The width of the menu. If 'match-trigger' is set (default), the width will be the trigger's width.
   * @default 'match-trigger'
   */
  menuWidth?: MenuContextProps['width'];

  /**
   * The max-width of the menu.
   */
  menuMaxWidth?: MenuContextProps['maxWidth'];

  /**
   * The `aria-label` attribute for the menu.
   */
  menuAriaLabel?: MenuContextProps['aria-label'];

  /**
   * The status messages for the menu when it is empty or loading that will be announced by screen readers.
   * @default { empty: "No options", loading: "Loading..." }
   */
  menuStatusMessages?: { empty?: string; loading?: string };

  /**
   * Props for the mobile view of the combobox.
   */
  mobileViewProps?: MobileViewProps;

  /**
   * Element displayed inside the input, aligned to the left.
   * Defaults to a search icon if not provided.
   */
  inputLeftElement?: ReactNode;

  /**
   * The default value of the combobox input (uncontrolled).
   */
  defaultInputValue?: string;

  /**
   * The value of the combobox input (controlled).
   */
  inputValue?: string;
} & TestIdProp &
  CommonInputProps &
  AriaAttributes &
  Partial<FormFieldContext>;
