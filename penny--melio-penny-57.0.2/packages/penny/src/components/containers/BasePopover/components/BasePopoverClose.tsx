import { Box, forwardRef } from '@chakra-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import type { MouseEventHandler } from 'react';

import { IconButton, type IconButtonProps } from '@/components/action/IconButton';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

export type BasePopoverCloseProps = {
  onClose: MouseEventHandler<HTMLButtonElement>;
  closeButtonSize?: IconButtonProps['size'];
  'data-component'?: string;
} & TestIdProp;

export const BasePopoverClose = forwardRef<BasePopoverCloseProps, 'button'>(
  (
    {
      onClose,
      closeButtonSize = 'extra-small',
      'data-testid': dataTestId = 'base-popover-close',
      'data-component': dataComponent,
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('BasePopover', {});

    return (
      <Box
        as={IconButton}
        __css={styles['close']}
        data-component={dataComponent}
        ref={ref}
        aria-label="Close popover"
        data-testid={dataTestId}
        {...props}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        variant="naked-inverse"
        icon="close"
        size={closeButtonSize}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onClick={onClose}
      />
    );
  }
);

BasePopoverClose.displayName = 'BasePopoverClose';
