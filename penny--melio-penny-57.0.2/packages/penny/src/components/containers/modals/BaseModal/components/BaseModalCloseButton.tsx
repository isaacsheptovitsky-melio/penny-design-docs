import { Box, useModalContext } from '@chakra-ui/react';

import { IconButton } from '@/components/action/IconButton';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { CLOSE_BUTTON_DATA_TEST_ID } from '../BaseModal.utils';

export type BaseModalCloseButtonProps = {
  closeButtonAriaLabel?: string;
};

export const BaseModalCloseButton = ({ closeButtonAriaLabel = 'Close modal', ...props }: BaseModalCloseButtonProps) => {
  const style = useMultiStyleConfig('BaseModal', {});
  const { onClose } = useModalContext();

  return (
    <Box __css={style['closeButton']}>
      <IconButton
        data-testid={CLOSE_BUTTON_DATA_TEST_ID}
        icon="close"
        onClick={onClose}
        aria-label={closeButtonAriaLabel}
        variant="tertiary"
        {...props}
      />
    </Box>
  );
};

BaseModalCloseButton.displayName = 'BaseModalCloseButton';
