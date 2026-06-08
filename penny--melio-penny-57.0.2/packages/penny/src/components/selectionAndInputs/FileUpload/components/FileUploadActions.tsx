import type { TestIdProp } from '@melio/penny-utils';
import type { MouseEventHandler } from 'react';

import { NakedButton } from '@/components/action/NakedButton';
import { Group } from '@/components/containers/Group';

import type { ButtonActionProps } from '../FileUpload.types';

export type FileUploadActionsProps = {
  fileName?: string;
  deleteActionProps?: Omit<ButtonActionProps, 'onClick' | 'variant'>;
  replaceActionProps?: Omit<ButtonActionProps, 'onClick' | 'variant'>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  onReplace?: MouseEventHandler<HTMLButtonElement>;
} & TestIdProp;

export const FileUploadActions = ({
  fileName = '',
  deleteActionProps,
  replaceActionProps,
  onDelete,
  onReplace,
  ...props
}: FileUploadActionsProps) => (
  <Group spacing="s" {...props}>
    <NakedButton
      data-testid="replace-file"
      label="Replace"
      {...replaceActionProps}
      aria-label={`${replaceActionProps?.['aria-label'] || 'Replace file'} ${fileName}`}
      onClick={onReplace}
      variant="primary"
    />
    <NakedButton
      data-testid="delete-file"
      label="Delete"
      {...deleteActionProps}
      aria-label={`${deleteActionProps?.['aria-label'] || 'Delete file'} ${fileName}`}
      onClick={onDelete}
      variant="critical"
    />
  </Group>
);

FileUploadActions.displayName = 'FileUploadActions';
