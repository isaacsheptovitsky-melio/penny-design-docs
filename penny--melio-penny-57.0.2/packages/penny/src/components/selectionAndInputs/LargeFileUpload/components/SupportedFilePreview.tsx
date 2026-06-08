import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef, type KeyboardEvent, useState } from 'react';

import { IFrame } from '@/components/internal/IFrame';
import { Image } from '@/components/media/Image';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type FileMetadata, previewDataURLFile } from '../../FileInput';
import { fileTypes } from '../../FileInput/helpers/get-input-file-accept';
import { type LargeFileUploadProps } from '../types';

type SupportedFilePreviewProps = { previewFileMetadata: FileMetadata } & Pick<
  LargeFileUploadProps,
  'onPreview' | 'previewFileAriaLabel' | 'isDisabled' | 'isReadOnly' | 'pdfPreviewProps'
> &
  TestIdProp;
export const SupportedFilePreview = forwardRef<HTMLDivElement, SupportedFilePreviewProps>(
  (
    {
      previewFileMetadata,
      onPreview,
      previewFileAriaLabel,
      isDisabled,
      isReadOnly,
      pdfPreviewProps,
      'data-testid': dataTestId = 'preview-file',
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);

    const handlePreviewFile = () => {
      if (previewFileMetadata) {
        previewDataURLFile(previewFileMetadata.url);
        onPreview?.(previewFileMetadata);
      }
    };

    const isPdfPreview = previewFileMetadata?.type === fileTypes.pdf;
    const styles = useMultiStyleConfig('LargeFileUpload', { isPdfPreview, hasError });
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        as="button"
        aria-readonly={isReadOnly}
        disabled={isDisabled}
        ref={ref}
        tabIndex={isDisabled || isReadOnly ? -1 : 0}
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handlePreviewFile();
          }
        }}
        onClick={!isDisabled ? handlePreviewFile : undefined}
        aria-label={`${previewFileAriaLabel} ${previewFileMetadata.name}`}
        __css={styles['previewFileContainer']}
        {...getTestId()}
      >
        {isPdfPreview ? (
          <IFrame
            title={previewFileMetadata.name}
            src={`${previewFileMetadata.url}#view=fit`}
            height="100%"
            width="100%"
            {...pdfPreviewProps}
          />
        ) : (
          <Image
            height="100%"
            objectFit="contain"
            alt={previewFileMetadata.name}
            title={previewFileMetadata.name}
            src={previewFileMetadata.url}
            aria-hidden
            onError={() => setHasError(true)}
            onLoad={() => {
              if (hasError) {
                setHasError(false);
              }
            }}
          />
        )}
      </Box>
    );
  }
);
SupportedFilePreview.displayName = 'SupportedFilePreview';
