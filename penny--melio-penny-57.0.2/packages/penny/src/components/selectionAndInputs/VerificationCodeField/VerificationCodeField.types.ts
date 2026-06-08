import { type TestIdProp } from '@melio/penny-utils';

export type VerificationCodeFieldLength = 4 | 5 | 6;

export type VerificationCodeFieldProps = {
  /**
   * An event fire after the final digit is inserted, returns a flag of valid/invalid.
   */
  onComplete: (code: string) => Promise<boolean>;

  /**
   * Set the verification code length.
   * @default 4
   */
  length?: VerificationCodeFieldLength;

  /**
   * Set error message to show for invalid code.
   */
  invalidErrorMessages?: string;

  /**
   * Set error message to show for required fields.
   */
  requiredFieldsErrorMessages?: string;

  /**
   * Aria label for the input fields.
   */
  fieldAriaLabel?: string;

  /**
   * Whether to auto-focus the first input field.
   * @default false
   */
  autoFocus?: boolean;

  /**
   * The controlled value of the field (array of characters).
   */
  value?: string[];

  /**
   * Callback fired when the value is changed.
   */
  onChange?: (value: string[]) => void;

  /**
   * The default value of the field (array of characters) for uncontrolled usage.
   */
  defaultValue?: string[];

  /**
   * Whether the field is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the field is read-only.
   * @default false
   */
  readOnly?: boolean;
} & TestIdProp;
