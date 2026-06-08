import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes } from 'react';

import { type CommonInputProps, type ControlProps } from '@/components/form/components/Form';

import { type FileMetadata, type UseFileUploadProps } from '../FileInput';

export type ButtonActionProps = {
  /**
   * Click handler for the button.
   */
  onClick?: VoidFunction;

  /**
   * Whether the button is disabled.
   */
  isDisabled?: boolean;

  /**
   * The button label text.
   */
  label?: string;
} & AriaAttributes;

export type FileUploadProps = {
  /**
   * Whether the field is in invalid state.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Whether the field is read-only.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Whether the field is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the field is in loading state.
   * @default false
   */
  isLoading?: boolean;

  /**
   * A callback to handle the preview of the file. It is invoked when clicking the file name.
   */
  onPreview?: (meta: FileMetadata) => void;

  /**
   * Configuration for action buttons.
   */
  actionProps?: {
    deleteActionProps?: ButtonActionProps;
    replaceActionProps?: ButtonActionProps;
  };
} & AriaAttributes &
  Partial<ControlProps> &
  TestIdProp &
  Omit<CommonInputProps, 'autoComplete'> &
  Partial<Omit<UseFileUploadProps, 'invalidFileTypeErrorMessage' | 'onDelete'>>;
