import { uniqueId } from '@melio/penny-utils';
import { type MouseEventHandler, useCallback, useMemo } from 'react';

import type { FileMetadata, UseFileUploadProps } from '../../FileInput';
import { useFileUpload } from '../../FileInput/useFileUpload';

export type UseFileUploadControllerProps = {
  onPreview?: (meta: FileMetadata) => void;
  onReplace?: VoidFunction;
  errorMessage?: string;
  isLoading?: boolean;
} & Partial<UseFileUploadProps>;

export const useFileUploadController = ({
  value = null,
  errorMessage,
  onReplace,
  onChange,
  onDelete: customOnDelete,
  invalidFileTypeErrorMessage,
  acceptTypes,
  validator,
}: UseFileUploadControllerProps) => {
  const { onDelete, error, file, inputProps, onClick, onDragEnter, onDragLeave, onDragOver, onDrop, isDragging } =
    useFileUpload({
      onChange,
      invalidFileTypeErrorMessage,
      value,
      acceptTypes,
      validator,
    });

  const invalidElementId = useMemo(
    () => (errorMessage || error ? uniqueId('invalid-') : undefined),
    [errorMessage, error]
  );

  const handleDelete = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation();
      if (customOnDelete) {
        customOnDelete();
      } else {
        onDelete();
        requestAnimationFrame(() => {
          inputProps.ref.current?.focus();
        });
      }
    },
    [customOnDelete, onDelete, inputProps]
  );

  const handleReplace = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      onClick(event);
      onReplace?.();
    },
    [onReplace, onClick]
  );

  const dragingEvents = {
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    'data-is-draging': isDragging || null,
  };

  return {
    inputProps,
    handleDelete,
    handleReplace,
    selectedFile: file,
    fileError: error,
    invalidElementId,
    dragingEvents,
  };
};
