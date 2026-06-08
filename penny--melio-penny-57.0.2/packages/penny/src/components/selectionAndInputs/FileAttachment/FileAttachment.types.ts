import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes } from 'react';

import { type FileType } from '@/components/selectionAndInputs/FileInput/helpers/get-input-file-accept';
import { type IconKey } from '@/theme/icons';

export type FileAttachmentProps = {
  isReadOnly?: boolean;
  isViewMode?: boolean;
  value?: string | null;
  isLoading?: boolean;
  isEmpty?: boolean;
  onChange?: (fileUrl?: string | null, fileBlob?: File | null) => void;
  onViewModeClick?: (fileUrl: string) => void;
  acceptTypes?: Extract<FileType, 'jpg' | 'png' | 'pdf'>[];
  deleteButtonText?: string;
  fileAltText?: string;
  overrideFileName?: string;
  width?: number;
  fileInputAriaLabel?: string;
  deleteButtonAriaLabel?: string;
  viewModeIcon?: IconKey;
} & AriaAttributes &
  TestIdProp;
