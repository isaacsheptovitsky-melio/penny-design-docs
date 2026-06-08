import type { TestIdProp } from '@melio/penny-utils';

import { type FileType } from '../FileInput/helpers/get-input-file-accept';

export type AvatarImageControlVariant = 'circle' | 'square';

export type AvatarImageControlProps = {
  /**
   * The placeholder text for when there is no value and the field is in read-only mode. Used for initials.
   */
  viewModePlaceholder: string;

  /**
   * The text for the button to delete the image.
   */
  deleteButtonText: string;

  /**
   * Determines the shape of the avatar image control.
   * @default 'circle'
   */
  variant?: AvatarImageControlVariant;

  /**
   * Sets the field in view mode.
   * @default false
   */
  isViewMode?: boolean;

  /**
   * The src of the image file. To reset the image, set the value to `undefined`.
   */
  value?: string;

  /**
   * The callback invoked when the file is changed.
   */
  onChange?: (file: File | null) => void;

  /**
   * Is the component in loading mode.
   * @default false
   */
  isLoading?: boolean;

  /**
   * File types to accept.
   * @default ['jpg', 'png', 'pdf']
   */
  acceptTypes?: Extract<FileType, 'jpg' | 'png' | 'pdf'>[];
} & TestIdProp;
