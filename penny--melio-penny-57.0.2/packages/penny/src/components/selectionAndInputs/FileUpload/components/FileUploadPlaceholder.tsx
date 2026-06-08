import type { TestIdProp } from '@melio/penny-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { FILE_UPLOAD_DEFAULT_PLACEHOLDER } from '@/components/selectionAndInputs/FileUpload/constants';

import type { FileUploadProps } from '../FileUpload.types';

type FileUploadPlaceholderProps = Pick<
  FileUploadProps,
  'placeholder' | 'isDisabled' | 'isLoading' | 'isReadOnly' | 'id'
> &
  TestIdProp;

export const FileUploadPlaceholder = ({
  isDisabled,
  isReadOnly,
  placeholder = FILE_UPLOAD_DEFAULT_PLACEHOLDER,
  isLoading,
  ...props
}: FileUploadPlaceholderProps) => {
  if (isLoading) return null;
  return (
    <Group spacing="s" variant="horizontal" alignItems="center" textAlign="start" {...props}>
      <Icon type="file-add" aria-hidden isDisabled={isDisabled} isReadOnly={isReadOnly} />
      <Text color={isDisabled ? 'semantic.text.disabled' : 'semantic.text.secondary'} textStyle="body2">
        {placeholder}
      </Text>
    </Group>
  );
};
FileUploadPlaceholder.displayName = 'FileUploadPlaceholder';
