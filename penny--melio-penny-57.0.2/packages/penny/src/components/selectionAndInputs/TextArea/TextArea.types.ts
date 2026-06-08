import { type TestIdProp } from '@melio/penny-utils';
import { type InputHTMLAttributes } from 'react';

import { type CheckboxProps } from '../Checkbox';

export type BaseTextAreaProps = {
  /**
   * Sets the field as editable.
   * @default true
   */
  isEditable?: boolean;

  /**
   * Sets the field as read-only.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Sets the field in invalid state.
   */
  isInvalid?: boolean;

  /**
   * Sets the field as disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Sets the field in loading state.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Sets the field as view-mode.
   */
  isViewMode?: boolean;

  /**
   * An object of the text-area footer checkbox.
   */
  footer?: Pick<CheckboxProps, 'isDisabled' | 'isIndeterminate' | 'isInvalid' | 'isReadOnly' | 'label'>;

  /**
   * Number of rows in the text area.
   * @default 4
   */
  numberOfRows?: number;

  /**
   * The maximum length (in characters) of the text area.
   */
  maxChars?: number;

  /**
   * The display value of the text area.
   */
  value?: string;
} & TestIdProp &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'disabled' | 'readOnly'>;

export type TextAreaValidateProps<T extends BaseTextAreaProps> = T;

export type TextAreaProps = TextAreaValidateProps<BaseTextAreaProps>;
