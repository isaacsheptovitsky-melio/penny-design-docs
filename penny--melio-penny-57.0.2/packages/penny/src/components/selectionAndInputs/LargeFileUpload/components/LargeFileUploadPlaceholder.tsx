import type { TestIdProp } from '@melio/penny-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { FILE_UPLOAD_DEFAULT_PLACEHOLDER } from '@/components/selectionAndInputs/FileUpload/constants';

import type { LargeFileUploadProps } from '../types';

type LargeFileUploadPlaceholderProps = Pick<
  LargeFileUploadProps,
  'placeholder' | 'isDisabled' | 'isLoading' | 'isReadOnly' | 'assetPlaceholder'
> & { id?: string } & TestIdProp;

export const LargeFileUploadPlaceholder = ({
  isDisabled,
  isReadOnly,
  placeholder,
  isLoading,
  assetPlaceholder,
  ...props
}: LargeFileUploadPlaceholderProps) => {
  if (isLoading) return null;

  return (
    <Group spacing="s" variant="vertical" alignItems="center" textAlign="center" {...props}>
      {assetPlaceholder || <Icon type="file-add" aria-hidden isDisabled={isDisabled} isReadOnly={isReadOnly} />}

      {placeholder || (
        <Text color={isDisabled ? 'semantic.text.disabled' : 'semantic.text.secondary'} textStyle="body3">
          {FILE_UPLOAD_DEFAULT_PLACEHOLDER}
        </Text>
      )}
    </Group>
  );
};
LargeFileUploadPlaceholder.displayName = 'LargeFileUploadPlaceholder';
