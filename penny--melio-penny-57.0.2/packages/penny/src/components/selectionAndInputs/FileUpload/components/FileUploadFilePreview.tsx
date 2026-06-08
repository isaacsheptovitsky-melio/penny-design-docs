import { Box } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type ElementType, forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { FileMetadata } from '../../FileInput';
import type { FileUploadProps } from '../FileUpload.types';

type FileUploadPreviewProps = Pick<FileUploadProps, 'isDisabled' | 'isReadOnly' | 'onPreview' | 'id'> & {
  previewFileMetadata: FileMetadata;
} & TestIdProp;

export const FileUploadFilePreview = forwardRef<HTMLDivElement, FileUploadPreviewProps>(
  ({ isDisabled, isReadOnly, previewFileMetadata, onPreview, ...props }, ref) => {
    const hasPreviewHandler = !!onPreview;
    const styles = useMultiStyleConfig('FileUpload', {});

    const clickableProps = {
      as: 'button' as ElementType,
      onClick: !isDisabled ? () => onPreview?.(previewFileMetadata) : undefined,
      disabled: isDisabled || isReadOnly,
      tabIndex: isDisabled ? -1 : 0,
      __css: styles['linkLabel'],
      'aria-disabled': isDisabled || undefined,
      'aria-readonly': isReadOnly || undefined,
      role: 'button',
      type: 'button',
    };

    return (
      <Box
        __css={styles['label']}
        ref={ref}
        data-disabled={isDisabled || null}
        data-readonly={isReadOnly || null}
        {...(hasPreviewHandler ? clickableProps : undefined)}
        {...props}
      >
        {previewFileMetadata.name}
      </Box>
    );
  }
);

FileUploadFilePreview.displayName = 'FileUploadFilePreview';
