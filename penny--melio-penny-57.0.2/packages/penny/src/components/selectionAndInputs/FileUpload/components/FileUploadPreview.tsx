import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { FileValue } from '../../FileInput';
import type { FileUploadProps } from '../FileUpload.types';
import { useFilePreview } from '../hooks';
import { FileUploadActions, type FileUploadActionsProps } from './FileUploadActions';
import { FileUploadFilePreview } from './FileUploadFilePreview';

type FileUploadPreviewProps = Pick<FileUploadProps, 'isDisabled' | 'isReadOnly' | 'isLoading' | 'onPreview'> &
  FileUploadActionsProps & {
    selectedFile: FileValue | null;
    id: string;
  } & TestIdProp;

export const FileUploadPreview = forwardRef<HTMLDivElement, FileUploadPreviewProps>(
  (
    {
      id,
      selectedFile,
      isLoading = false,
      isDisabled,
      isReadOnly,
      onPreview,
      onDelete,
      onReplace,
      deleteActionProps,
      replaceActionProps,
      'data-testid': dataTestId = 'file-upload-preview',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('FileUpload', {});
    const getTestId = useTestId(dataTestId);

    const previewFileMetadata = useFilePreview({ selectedFile });
    if (isLoading) return null;

    return (
      <Box __css={styles['previewContainer']} id={id} data-disabled={isDisabled || undefined}>
        {previewFileMetadata && (
          <Box flexBasis="100%" minWidth={0}>
            <FileUploadFilePreview
              previewFileMetadata={previewFileMetadata}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              onPreview={onPreview}
              ref={ref}
              {...getTestId()}
              {...props}
            />
          </Box>
        )}
        {!isDisabled && !isReadOnly && (
          <Box flexShrink={0} minWidth={0}>
            <FileUploadActions
              fileName={previewFileMetadata?.name}
              onDelete={onDelete}
              onReplace={onReplace}
              replaceActionProps={replaceActionProps}
              deleteActionProps={deleteActionProps}
              {...getTestId('actions')}
            />
          </Box>
        )}
      </Box>
    );
  }
);

FileUploadPreview.displayName = 'FileUploadPreview';
