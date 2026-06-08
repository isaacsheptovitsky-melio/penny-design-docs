import { type BoxProps } from '@chakra-ui/react';
import { type HTMLProps, type RefObject } from 'react';

import { type FormSize } from '../../../theme/utils/form.utils';

type HTMLFormProps = Pick<HTMLProps<HTMLFormElement>, 'autoComplete'>;

type FormError = {
  title?: string;
  description: string;
};

/**
 * @private Please use `FormProps` from `@melio/penny`.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _FormProps = BoxProps & {
  /** Number of columns for the form layout */
  columns?: number;
  /** The size of the form fields */
  size?: FormSize;
  /** Reference to the form's input element */
  inputRef?: RefObject<HTMLInputElement>;
  /** Set all the fields in the form as disabled.
   * Can be overridden by explicitly defining this prop in a specific field.
   */
  isDisabled?: boolean;
  /** Set all the fields in the form as read-only.
   * Can be overridden by explicitly defining this prop in a specific field.
   */
  isReadOnly?: boolean;
  /** Set all the fields in the form to view-mode.
   * Can be overridden by explicitly defining this prop in a specific field.
   */
  isViewMode?: boolean;
  /** Set the form in loading state.
   * This is for cases where you need to reload the form's data due to a side-effect.
   * Don't use this when submitting the form. The `Form` will handle this case.
   */
  isLoading?: boolean;
  /** Force general error on form */
  error?: FormError;
  /** Force error state on all fields */
  errorState?: boolean;
} & HTMLFormProps;

export type FormContextData = {
  size?: FormSize;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isViewMode?: boolean;
  isLoading?: boolean;
  columns: number;
};
