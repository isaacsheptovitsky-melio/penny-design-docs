import { Box, forwardRef } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { type ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { DataTestIdContext } from '@/utils/dataTestIdContext';

import { DropzoneContext, type DropzoneContextValue, StylesProvider } from './Dropzone.context';
import type { Accept, FileRejection, FileValidator } from './Dropzone.types';
import { useDropzoneFileHandler } from './useDropzoneFileHandler';

export type DropzoneRootProps = {
  /**
   * The accepted files in controlled mode.
   */
  acceptedFiles?: File[];

  /**
   * The initial accepted files in uncontrolled mode.
   */
  defaultAcceptedFiles?: File[];

  /**
   * The rejected files in controlled mode.
   */
  rejectedFiles?: FileRejection[];

  /**
   * The initial rejected files in uncontrolled mode.
   */
  defaultRejectedFiles?: FileRejection[];

  /**
   * Called when files pass all validation checks.
   */
  onFileAccept?: (files: File[]) => void;

  /**
   * Called when one or more files fail validation.
   */
  onFileReject?: (rejections: FileRejection[]) => void;

  /**
   * Called with both accepted and rejected buckets after every file selection.
   */
  onFileChange?: (details: { acceptedFiles: File[]; rejectedFiles: FileRejection[] }) => void;

  /**
   * Restricts accepted file types. Maps MIME types to allowed extensions.
   * @example { 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpg'] }
   */
  accept?: Accept;

  /**
   * Custom validation function used to validate the uploaded files and decide if accepted. Returns an array of error messages or empty array if valid.
   */
  validate?: FileValidator;

  /**
   * Maximum number of files allowed. Files exceeding this count are rejected with `too-many-files` error.
   */
  maxFiles?: number;

  /**
   * Maximum file size in bytes. Larger files are rejected with `file-too-large` error.
   */
  maxFileSize?: number;

  /**
   * Minimum file size in bytes. Smaller files are rejected with `file-too-small` error.
   */
  minFileSize?: number;

  /**
   * Allows selecting multiple files at once.
   * @default false
   */
  multiple?: boolean;

  /**
   * Prevents interaction and file selection.
   * @default false
   */
  disabled?: boolean;

  /**
   * Shows the field in a read-only state, focusable but not interactive.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Marks the field as invalid, applying error styling.
   * @default false
   */
  invalid?: boolean;

  /**
   * Prevents the browser from navigating away when files are dropped outside the dropzone.
   * @default true
   */
  preventDocumentDrop?: boolean;

  children: ReactNode | ((context: DropzoneContextValue) => ReactNode);
} & TestIdProp;

/**
 * For composition and customization options, see the <a href="?path=/docs/composition-customization--docs" target="_self">composition & customization documentation</a>.
 */
export const DropzoneRoot = forwardRef<DropzoneRootProps, 'div'>(
  (
    {
      acceptedFiles: acceptedFilesProp,
      defaultAcceptedFiles,
      rejectedFiles: rejectedFilesProp,
      defaultRejectedFiles,
      onFileAccept,
      onFileReject,
      onFileChange,
      accept,
      validate,
      maxFiles,
      maxFileSize,
      minFileSize,
      multiple = false,
      disabled = false,
      readOnly = false,
      invalid = false,
      preventDocumentDrop = true,
      'data-testid': dataTestId = 'dropzone',
      children,
      ...props
    }: DropzoneRootProps,
    ref
  ) => {
    const styles = useMultiStyleConfig('Dropzone', {});
    const inputRef = useRef<HTMLInputElement>(null);
    const getTestId = useTestId(dataTestId);

    const { processFiles, acceptedFiles, rejectedFiles } = useDropzoneFileHandler({
      acceptedFiles: acceptedFilesProp,
      defaultAcceptedFiles,
      rejectedFiles: rejectedFilesProp,
      defaultRejectedFiles,
      onFileAccept,
      onFileReject,
      onFileChange,
      accept,
      validate,
      maxFiles,
      maxFileSize,
      minFileSize,
      multiple,
    });

    useEffect(() => {
      if (!preventDocumentDrop) {
        return;
      }
      const prevent = (event: DragEvent) => event.preventDefault();
      document.addEventListener('dragover', prevent);
      document.addEventListener('drop', prevent);
      return () => {
        document.removeEventListener('dragover', prevent);
        document.removeEventListener('drop', prevent);
      };
    }, [preventDocumentDrop]);

    const openFilePicker = useCallback(() => {
      inputRef.current?.click();
    }, []);

    const contextValue = useMemo(
      () => ({
        disabled,
        readOnly,
        invalid,
        acceptedFiles,
        rejectedFiles,
        processFiles,
        openFilePicker,
        inputRef,
        accept,
        multiple,
      }),
      [disabled, readOnly, invalid, acceptedFiles, rejectedFiles, processFiles, openFilePicker, accept, multiple]
    );

    const dataTestIdContextValue = useMemo(() => ({ rootDataTestId: dataTestId }), [dataTestId]);

    return (
      <DropzoneContext.Provider value={contextValue}>
        <StylesProvider value={styles}>
          <DataTestIdContext.Provider value={dataTestIdContextValue}>
            <Box ref={ref} data-component="DropzoneRoot" __css={styles['root']} {...getTestId()} {...props}>
              {/* eslint-disable-next-line react-hooks/refs */}
              {typeof children === 'function' ? children(contextValue) : children}
            </Box>
          </DataTestIdContext.Provider>
        </StylesProvider>
      </DropzoneContext.Provider>
    );
  }
);

DropzoneRoot.displayName = 'DropzoneRoot';
