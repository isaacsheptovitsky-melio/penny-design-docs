import { Box, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type HTMLAttributes } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

export type BasePopoverContainerProps = HTMLAttributes<HTMLDivElement> & TestIdProp;

export const BasePopoverContainer = forwardRef<BasePopoverContainerProps, 'div'>(
  ({ 'data-testid': dataTestId = 'base-popover-container', ...props }, ref) => {
    const styles = useMultiStyleConfig('BasePopover', {});

    return <Box data-testid={dataTestId} {...props} __css={styles['container']} ref={ref} />;
  }
);

BasePopoverContainer.displayName = 'BasePopoverContainer';
