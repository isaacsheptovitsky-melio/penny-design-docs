import { type TestIdProp } from '@melio/penny-utils';
import { forwardRef } from 'react';

import type { FileValue } from '../../FileInput';
import { isNotPreviewableFileType } from '../../FileInput/helpers/get-input-file-accept';
import { useFilePreview } from '../../FileUpload';
import { type LargeFileUploadProps } from '../types';
import { SupportedFilePreview } from './SupportedFilePreview';
import { UnsupportedFilePreview } from './UnsupportedFilePreview';

type LargeFileUploadPreviewProps = Pick<
  LargeFileUploadProps,
  | 'onPreview'
  | 'previewFileAriaLabel'
  | 'isDisabled'
  | 'isLoading'
  | 'forceFallbackPreview'
  | 'isReadOnly'
  | 'pdfPreviewProps'
> & {
  selectedFile: FileValue | null;
} & TestIdProp;

export const LargeFileUploadPreview = forwardRef<HTMLDivElement, LargeFileUploadPreviewProps>(
  (
    {
      selectedFile,
      isDisabled,
      isReadOnly,
      forceFallbackPreview,
      previewFileAriaLabel,
      onPreview,
      isLoading,
      pdfPreviewProps,
      ...props
    },
    ref
  ) => {
    const previewFileMetadata = useFilePreview({ selectedFile });

    if (isLoading || !previewFileMetadata) return null;

    return (
      <>
        {forceFallbackPreview || isNotPreviewableFileType(previewFileMetadata?.type) ? (
          <UnsupportedFilePreview
            selectedFile={selectedFile}
            previewFileMetadata={previewFileMetadata}
            isDisabled={isDisabled}
            ref={ref}
            {...props}
          />
        ) : (
          <SupportedFilePreview
            previewFileMetadata={previewFileMetadata}
            onPreview={onPreview}
            previewFileAriaLabel={previewFileAriaLabel}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            ref={ref}
            pdfPreviewProps={pdfPreviewProps}
            {...props}
          />
        )}
      </>
    );
  }
);

LargeFileUploadPreview.displayName = 'LargeFileUploadPreview';
