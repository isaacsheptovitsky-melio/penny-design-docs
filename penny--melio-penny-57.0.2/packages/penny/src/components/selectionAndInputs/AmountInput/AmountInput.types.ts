import { type Currency } from '@melio/penny-utils';
import { type ChangeEventHandler, type FocusEventHandler } from 'react';

import { type CommonInputProps } from '@/components/form/components/Form';

export type AmountInputProps = {
  /**
   * Sets the currency type of the input.
   * @default 'USD'
   */
  currency?: Currency;

  /**
   * Sets the currency sign. Use this prop together with the `currency` prop to override the default currency sign.
   * @default '$'
   */
  currencySign?: string;

  /**
   * The value of amount input.
   */
  value: number;

  /**
   * Callback fired when the value is changed.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * Callback fired when the input is blurred.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /**
   * Callback fired when the input is focused.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;

  /**
   * The helper text to let the user know what they should fill in this input.
   */
  helperText?: string;

  /**
   * An error message to display (this puts the component in edit-mode).
   */
  errorMessage?: string;

  /**
   * Set text for the edit button tooltip.
   */
  editButtonTooltip?: string;

  /**
   * Sets the limit of the integer value's length.
   * If it's not defined then the default limit will be equal to the `value`'s integer length.
   */
  integerLimitMask?: number;

  /**
   * Allow the user to enter negative values.
   * @default true
   */
  allowNegativeValue?: boolean;

  /**
   * Sets the text alignment of the helper text and error message.
   * @default 'start'
   */
  descriptionAlignment?: 'center' | 'start';
} & Pick<CommonInputProps, 'autoComplete'>;
