import {
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { isAcceptedType } from './helpers/get-input-file-accept';
import type { FileValue, UseFileUploadProps } from './types';

export const useFileUpload = ({
  validator,
  onChange,
  value,
  acceptTypes,
  invalidFileTypeErrorMessage = 'Invalid file type',
}: UseFileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<FileValue | null>(value ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const customValidate = useCallback(async (file: File) => validator?.(file) ?? null, [validator]);

  const handleUnvalidFile = useCallback(
    (errorMsg: string) => {
      setError(errorMsg);
      setFile(null);
      onChange?.(null);
    },
    [onChange]
  );

  const handleFileValidation = useCallback(
    async (file: File) => {
      try {
        const isAccepted = await isAcceptedType(file, acceptTypes);
        if (!isAccepted) {
          handleUnvalidFile(invalidFileTypeErrorMessage);
          return;
        }

        const validationError = await customValidate(file);
        if (validationError) {
          handleUnvalidFile(validationError);
          return;
        }

        setFile(file);
        setError(null);
        onChange?.(file);
      } catch {
        handleUnvalidFile('Error reading file. Please try again.');
      }
    },
    [acceptTypes, customValidate, handleUnvalidFile, onChange, invalidFileTypeErrorMessage]
  );

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      const file = event.target.files?.[0];
      if (file) {
        void handleFileValidation(file);
      }
    },
    [handleFileValidation]
  );

  const onClick = useCallback((event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    inputRef.current?.click();
  }, []);

  const onDelete = useCallback(() => {
    setFile(null);
    setError(null);
    onChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onChange]);

  const isInvalid = Boolean(error);

  useEffect(() => {
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFile(value ?? null);
    setError(null);
  }, [value]);

  const inputProps = useMemo(
    () => ({
      ref: inputRef,
      type: 'file',
      onChange: handleFileChange,
    }),
    [handleFileChange, inputRef]
  );

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      void handleFileValidation(file);
    }
  };

  return {
    file,
    error,
    isInvalid,
    onClick,
    onDelete,
    inputProps,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
    isDragging,
  };
};
