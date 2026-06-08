import { type TestIdProp } from '@melio/penny-utils';
import {
  type AriaAttributes,
  type ChangeEventHandler,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactNode,
} from 'react';

import { type MenuContextProps } from '@/components/containers/menus/Context';
import type { TooltipProps } from '@/components/dataDisplay/Tooltip/tooltip.types';
import { type CommonInputProps } from '@/components/form/components/Form/inputs/types';
import { type FormSize } from '@/theme/utils/form.utils';

export type MultiSelectOption<V> = {
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

export type MultiSelectSection<V, O extends MultiSelectOption<V>> = {
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

export type MultiSelectProps<V, O extends MultiSelectOption<V>> = {
  /**
   * The options in the dropdown menu.
   */
  options: O[] | MultiSelectSection<V, O>[];

  /**
   * The selected values of the multi-select.
   * They must exist in its options' values.
   */
  value?: V[];

  /**
   * The placeholder text for when there is no value.
   * @default 'Select'
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
   * The multi-select menu content when there are no options.
   * @default 'No options'
   */
  emptyState?: ReactNode;

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
   * Whether the field is required.
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
   * Set the trigger to be focused on mount.
   * @default false
   */
  autoFocus?: boolean;

  /**
   * The footer of the multi-select.
   * You can use `MultiSelectFooter` component to get the conventional paddings for the content.
   */
  footer?: ReactNode;

  /**
   * A function to render the options' content.
   */
  optionRenderer?: (option: O, isSelected: boolean) => ReactNode;

  /**
   * A function to render the trigger's content using the selected values.
   */
  valueRenderer?: (selectedOptions: O[]) => ReactNode;

  /**
   * An event called when the multi-select's value changes.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * An event called when the multi-select is focused.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;

  /**
   * An event called when the multi-select is blurred.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /**
   * An event called when the multi-select is clicked.
   */
  onClick?: MouseEventHandler<HTMLInputElement>;

  /**
   * The width of the menu.
   * If 'match-trigger' is set (default), the width will be the trigger's width.
   * @default 'match-trigger'
   */
  menuWidth?: MenuContextProps['width'];

  /**
   * The max-width of the menu.
   * If the width of the menu takes the trigger's width then you shouldn't define a max-width.
   */
  menuMaxWidth?: MenuContextProps['maxWidth'];

  /**
   * The `aria-label` attribute for the menu.
   */
  menuAriaLabel?: MenuContextProps['aria-label'];

  /**
   * The status message that will be announced by screen readers when the menu is empty.
   * If no empty state is provided, this message will be shown inside the menu.
   * Note that the `emptyState` content should always correspond to its parallel status message to meet a11y requirements.
   * @default 'No options'
   */
  menuEmptyStateMessage?: string;
} & TestIdProp &
  CommonInputProps &
  AriaAttributes;
