import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type HTMLAttributes, type ReactElement, type ReactNode, type RefObject } from 'react';

import { type FileMetadata, type UseFileUploadProps } from '../FileInput';

export type LargeFileUploadProps = {
  placeholder?: ReactNode;
  renderLoader?: (props: { id: string }) => ReactElement;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  autoFocus?: boolean;
  onPreview?: (meta: FileMetadata) => void;
  invalid?: { isInvalid: boolean; errorMessage?: string };
  previewFileAriaLabel?: AriaAttributes['aria-label'];
  forceFallbackPreview?: boolean;
  actionProps?: {
    deleteActionProps?: ButtonActionProps;
    replaceActionProps?: ButtonActionProps;
  };
  assetPlaceholder?: ReactNode;
  inputRef?: RefObject<HTMLInputElement | null>;
  pdfPreviewProps?: HTMLAttributes<HTMLIFrameElement> & { inert?: boolean };
} & Partial<Omit<UseFileUploadProps, 'onDelete'>> &
  AriaAttributes &
  TestIdProp;

export type ButtonActionProps = {
  onClick?: VoidFunction;
  isDisabled?: boolean;
  label?: string;
} & AriaAttributes;
