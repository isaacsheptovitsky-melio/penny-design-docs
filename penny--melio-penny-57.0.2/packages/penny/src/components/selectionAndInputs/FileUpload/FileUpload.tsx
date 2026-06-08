import { Box } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import { forwardRef, useMemo } from 'react';

import { Container } from '@/components/containers/Container';
import { Loader } from '@/components/foundations/Loader';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps, mergeRefs } from '@/utils';

import { FileInput } from '../FileInput';
import { FileUploadPlaceholder, FileUploadPreview } from './components';
import type { FileUploadProps } from './FileUpload.types';
import { useFileUploadController, useFileUploadFocus } from './hooks';
import { getFileUploadState } from './utils/getFileUploadState';

/**
 * A file uploader is a form element used to upload one file.
 */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      value,
      isDisabled,
      isLoading,
      isReadOnly,
      isInvalid,
      autoFocus = false,
      placeholder,
      'data-testid': dataTestId = 'file-upload',
      'aria-required': ariaRequired,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledby,
      'aria-label': ariaLabel,
      id,
      onPreview,
      onChange,
      acceptTypes,
      actionProps,
      validator,
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('FileUpload', {});
    const getTestId = useTestId(dataTestId);

    const { isInputFocuseVisible, inputRef, filePreviewRef, ...inputEvents } = useFileUploadFocus({
      autoFocus,
    });

    const { replaceActionProps, deleteActionProps } = actionProps ?? {};
    const { handleDelete, handleReplace, selectedFile, inputProps, dragingEvents } = useFileUploadController({
      validator,
      value,
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
    });

    const fileUploadState = getFileUploadState(value, selectedFile, isLoading);

    const loaderId = useMemo(() => uniqueId('loader-'), []);
    const placeholderId = useMemo(() => uniqueId('placeholder-'), []);
    const previewId = useMemo(() => uniqueId('preview-'), []);
    const inputAriaLabelledBy = getAriaProps('aria-labelledby', [
      fileUploadState === 'loading' ? loaderId : undefined,
      fileUploadState === 'placeholder' ? placeholderId : undefined,
      fileUploadState === 'preview' ? previewId : undefined,
      ariaLabelledby,
    ]);

    const enableUploading = !isDisabled && !isReadOnly && !(fileUploadState === 'loading');
    return (
      <Box
        data-component="FileUpload"
        ref={ref}
        data-invalid={isInvalid || null}
        data-loading={fileUploadState === 'loading'}
        data-readonly={fileUploadState === 'loading' || isReadOnly || null}
        data-disabled={isDisabled || null}
        data-selected={!!selectedFile || null}
        data-focus-visible={(isInputFocuseVisible && !selectedFile) || null}
        __css={styles['container']}
        {...(enableUploading && dragingEvents)}
        {...getTestId()}
        {...props}
      >
        <FileInput
          acceptTypes={acceptTypes}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          onClick={(event) => {
            if (!enableUploading) event.preventDefault();
          }}
          // Is used to link between the label to the field, when clicking the label it focuses the field
          id={id}
          name={props.name}
          aria-required={ariaRequired}
          aria-describedby={ariaDescribedBy}
          aria-label={ariaLabel}
          aria-invalid={isInvalid}
          tabIndex={isDisabled || selectedFile ? -1 : 0}
          aria-hidden={Boolean(selectedFile) || undefined}
          {...inputEvents}
          {...getTestId('input')}
          {...inputProps}
          {...inputAriaLabelledBy}
          ref={mergeRefs([inputProps.ref, inputRef])}
        />
        {fileUploadState === 'loading' && (
          <Container paddingY="xxs" width="fit-content">
            <Loader id={loaderId} {...getTestId('loader')} />
          </Container>
        )}
        {fileUploadState === 'placeholder' && (
          <FileUploadPlaceholder
            id={placeholderId}
            placeholder={placeholder}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isLoading={false}
            {...getTestId('placeholder')}
          />
        )}
        {fileUploadState === 'preview' && (
          <FileUploadPreview
            id={previewId}
            selectedFile={selectedFile}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            onPreview={onPreview}
            ref={filePreviewRef}
            onDelete={handleDelete}
            onReplace={handleReplace}
            deleteActionProps={deleteActionProps}
            replaceActionProps={replaceActionProps}
            {...getTestId('preview')}
          />
        )}
      </Box>
    );
  }
);

FileUpload.displayName = 'FileUpload';
