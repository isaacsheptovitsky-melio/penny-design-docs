import type { TestIdProp } from '@melio/penny-utils';
import type { MouseEventHandler } from 'react';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { useBreakpoint } from '@/theme/providers';

import type { ButtonActionProps } from '../types';

type LargeFileUploadFooterProps = {
  deleteActionProps?: ButtonActionProps;
  replaceActionProps?: ButtonActionProps;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  onReplace?: MouseEventHandler<HTMLButtonElement>;
} & TestIdProp;

export const LargeFileUploadActions = ({
  deleteActionProps,
  replaceActionProps,
  onDelete,
  onReplace,
  ...props
}: LargeFileUploadFooterProps) => {
  const { isExtraSmallScreen } = useBreakpoint();
  const buttonSize = isExtraSmallScreen ? 'small' : 'medium';

  return (
    <Group spacing="m" alignItems="center" {...props}>
      <Button
        data-testid="replace-file"
        label="Replace"
        aria-label="Replace file"
        {...replaceActionProps}
        variant="tertiary"
        size={buttonSize}
        onClick={onReplace}
      />
      <Button
        data-testid="delete-file"
        label="Delete"
        aria-label="Delete file"
        {...deleteActionProps}
        variant="critical-secondary"
        size={buttonSize}
        onClick={onDelete}
      />
    </Group>
  );
};

LargeFileUploadActions.displayName = 'LargeFileUploadActions';
