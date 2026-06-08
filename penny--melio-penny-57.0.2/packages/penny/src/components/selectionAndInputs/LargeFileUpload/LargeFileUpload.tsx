import { Box } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import { forwardRef, useMemo } from 'react';

import { Container } from '@/components/containers/Container';
import { Loader } from '@/components/foundations/Loader';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps, mergeRefs } from '@/utils';

import { FileInput } from '../FileInput';
import { useFileUploadController, useFileUploadFocus } from '../FileUpload';
import { getFileUploadState } from '../FileUpload/utils/getFileUploadState';
import {
  LargeFileUploadActions,
  LargeFileUploadErrorMessage,
  LargeFileUploadPlaceholder,
  LargeFileUploadPreview,
} from './components';
import type { LargeFileUploadProps } from './types';

export const LargeFileUpload = forwardRef<HTMLDivElement, LargeFileUploadProps>(
  (
    {
      isLoading,
      placeholder,
      previewFileAriaLabel = 'File preview',
      isDisabled,
      value,
      isReadOnly,
      invalid,
      forceFallbackPreview,
      'data-testid': dataTestId = 'large-file-upload',
      'aria-required': ariaRequired,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledby,
      'aria-label': ariaLabel,
      autoFocus = false,
      onPreview,
      onChange,
      acceptTypes,
      actionProps,
      invalidFileTypeErrorMessage,
      validator,
      assetPlaceholder,
      inputRef: customInputRef,
      renderLoader,
      pdfPreviewProps,
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('LargeFileUpload', {});
    const { replaceActionProps, deleteActionProps } = actionProps ?? {};
    const { isInvalid, errorMessage } = invalid ?? {};

    const { isInputFocuseVisible, inputRef, filePreviewRef, ...inputEvents } = useFileUploadFocus({
      autoFocus,
    });

    const { inputProps, handleDelete, handleReplace, selectedFile, fileError, invalidElementId, dragingEvents } =
      useFileUploadController({
        validator,
        value,
        errorMessage,
        onReplace: replaceActionProps?.onClick,
        onChange: (file) => {
          onChange?.(file);
          if (file)
            requestAnimationFrame(() => {
              filePreviewRef.current?.focus();
            });
        },
        onDelete: deleteActionProps?.onClick,
        acceptTypes,
        invalidFileTypeErrorMessage,
      });

    const loaderId = useMemo(() => uniqueId('loader-'), []);

    const inputAriaDescribedby = getAriaProps('aria-describedby', [
      errorMessage || fileError ? invalidElementId : undefined,
      ariaDescribedBy,
    ]);
    const placeholderId = useMemo(() => uniqueId('placeholder-'), []);

    const largeFileUploadState = getFileUploadState(value, selectedFile, isLoading);
    const inputAriaLabelledBy = getAriaProps('aria-labelledby', [
      largeFileUploadState === 'loading' ? loaderId : undefined,
      largeFileUploadState === 'placeholder' ? placeholderId : undefined,
      ariaLabelledby,
    ]);

    const showLargeFileUploadFooter = (selectedFile && !isReadOnly && !isDisabled) || errorMessage || fileError;
    const enableUploading = !isDisabled && !isReadOnly && !(largeFileUploadState === 'loading');
    const getTestId = useTestId(dataTestId);

    return (
      <Box __css={styles['outerContainer']} data-component="LargeFileUpload" ref={ref} {...getTestId()} {...props}>
        <Box
          data-invalid={isInvalid || Boolean(fileError) || null}
          data-loading={largeFileUploadState === 'loading' || null}
          data-readonly={largeFileUploadState === 'loading' || isReadOnly || null}
          data-disabled={isDisabled || null}
          data-selected={!!selectedFile || null}
          data-focus-visible={(isInputFocuseVisible && !selectedFile) || null}
          {...(enableUploading && dragingEvents)}
          __css={styles['container']}
          {...getTestId('container')}
        >
          <FileInput
            acceptTypes={acceptTypes}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            onClick={(event) => {
              if (!enableUploading) event.preventDefault();
            }}
            aria-invalid={isInvalid || Boolean(fileError)}
            aria-required={ariaRequired}
            aria-label={ariaLabel}
            aria-hidden={Boolean(selectedFile)}
            tabIndex={isDisabled || selectedFile ? -1 : 0}
            {...inputEvents}
            {...inputAriaDescribedby}
            {...getTestId('input')}
            {...inputProps}
            {...inputAriaLabelledBy}
            ref={mergeRefs([inputProps.ref, inputRef, customInputRef])}
          />
          {largeFileUploadState === 'loading' && (
            <Container paddingY="xxs" width="fit-content">
              {renderLoader ? renderLoader({ id: loaderId }) : <Loader id={loaderId} {...getTestId('loader')} />}
            </Container>
          )}
          {largeFileUploadState === 'placeholder' && (
            <LargeFileUploadPlaceholder
              id={placeholderId}
              placeholder={placeholder}
              isDisabled={isDisabled}
              isLoading={false}
              isReadOnly={isReadOnly}
              assetPlaceholder={assetPlaceholder}
              {...getTestId('placeholder')}
            />
          )}
          {largeFileUploadState === 'preview' && (
            <LargeFileUploadPreview
              forceFallbackPreview={forceFallbackPreview}
              isLoading={false}
              previewFileAriaLabel={previewFileAriaLabel}
              selectedFile={selectedFile}
              isDisabled={isDisabled}
              onPreview={onPreview}
              ref={filePreviewRef}
              pdfPreviewProps={pdfPreviewProps}
              {...getTestId('preview')}
            />
          )}
        </Box>
        {showLargeFileUploadFooter && (
          <>
            {!!selectedFile && (
              <LargeFileUploadActions
                onDelete={handleDelete}
                onReplace={handleReplace}
                replaceActionProps={replaceActionProps}
                deleteActionProps={deleteActionProps}
                {...getTestId('actions')}
              />
            )}
            {(errorMessage || fileError) && (
              <LargeFileUploadErrorMessage
                invalidElementId={invalidElementId}
                errorMessage={errorMessage}
                fileError={fileError}
                {...getTestId('error-message')}
              />
            )}
          </>
        )}
      </Box>
    );
  }
);
LargeFileUpload.displayName = 'LargeFileUpload';
