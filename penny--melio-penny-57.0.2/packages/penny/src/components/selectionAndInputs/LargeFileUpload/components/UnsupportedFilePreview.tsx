import { Box } from '@chakra-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { FileMetadata, FileValue } from '../../FileInput';
import { getFileSize } from '../../FileInput';
import type { LargeFileUploadProps } from '../types';

type UnsupportedFilePreviewProps = { previewFileMetadata: FileMetadata; selectedFile: FileValue | null } & Pick<
  LargeFileUploadProps,
  'isDisabled'
> &
  TestIdProp;

export const UnsupportedFilePreview = forwardRef<HTMLDivElement, UnsupportedFilePreviewProps>(
  ({ isDisabled, previewFileMetadata, selectedFile, 'data-testid': dataTestId = 'fallback-preview-file' }, ref) => {
    const getTestId = useTestId(dataTestId);
    const styles = useMultiStyleConfig('LargeFileUpload', { isPdfPreview: false, hasError: false });

    const fileSize = getFileSize(selectedFile);

    return (
      <Box
        __css={styles['fileFallbackContainer']}
        data-disabled={isDisabled || null}
        {...getTestId()}
        ref={ref}
        tabIndex={-1}
      >
        <Group variant="vertical" justifyContent="center" spacing="xs">
          <Group justifyContent="center" alignItems="flex-start" spacing="xs">
            <Icon type="document" size="small" aria-hidden />
            <Text textStyle="body3" color="inherit" {...getTestId('name')}>
              {previewFileMetadata.name}
            </Text>
          </Group>
          {fileSize && (
            <Text textStyle="body3" color="inherit" {...getTestId('size')}>
              {fileSize ? `${fileSize.size} ${fileSize.unit}` : ''}
            </Text>
          )}
        </Group>
      </Box>
    );
  }
);
UnsupportedFilePreview.displayName = 'UnsupportedFilePreview';
