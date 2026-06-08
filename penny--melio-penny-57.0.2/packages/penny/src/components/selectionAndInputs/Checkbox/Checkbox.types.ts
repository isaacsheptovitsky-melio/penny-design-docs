import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type HTMLAttributes, type ReactNode } from 'react';

import { type TooltipProps } from '@/components/dataDisplay/Tooltip';
import { type CommonInputProps } from '@/components/form/components/Form/inputs/types';

export type CheckboxSize = 'small' | 'large';

type BaseCheckboxProps = CommonInputProps & {
  /**
   * The size of the field.
   */
  size?: CheckboxSize;

  /**
   * Determines if the checkbox is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Sets the checkbox in indeterminate state.
   * @default false
   */
  isIndeterminate?: boolean;

  /**
   * The value of the checkbox.
   */
  value?: boolean;

  /**
   * Handles the click event from the checkbox.
   */
  onChange?: (checked: boolean) => void;

  /**
   * Determines if the checkbox is invalid.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Determines if the checkbox is read only.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Determines if the checkbox is checked.
   * @default false
   */
  isChecked?: boolean;

  /**
   * The id of the element that labels the checkbox.
   */
  'aria-labelledby'?: string;

  /**
   * The id of the element that describes the checkbox.
   */
  'aria-describedby'?: string;

  /**
   * Sets the field to be focused on mount.
   * @default false
   */
  autoFocus?: boolean;

  /**
   * The `data-testid` attribute for testing purposes.
   * @default 'checkbox'
   */
  'data-testid'?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  TestIdProp &
  AriaAttributes;

export type CheckboxInputProps = BaseCheckboxProps & {
  hasLabel?: boolean;
  tooltipProps?: TooltipProps;
} & Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex'>;

export type CheckboxProps = BaseCheckboxProps & {
  /**
   * The label of the field.
   */
  label?: string;

  /**
   * used to render the checkbox label as ReactNode. to allow rendering of custom content.
   */
  children?: ReactNode;

  /**
   * The tooltip to display.
   */
  tooltipProps?: Omit<TooltipProps, 'isEnabled' | 'isOpen' | 'onOpenChange'>;
};
