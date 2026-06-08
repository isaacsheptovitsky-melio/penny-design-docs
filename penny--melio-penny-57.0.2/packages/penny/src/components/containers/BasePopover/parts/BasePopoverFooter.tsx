import { Box, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type HTMLAttributes } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

export type BasePopoverFooterProps = HTMLAttributes<HTMLDivElement> & TestIdProp;

export const BasePopoverFooter = forwardRef<BasePopoverFooterProps, 'div'>(
  ({ 'data-testid': dataTestId = 'base-popover-footer', ...props }, ref) => {
    const styles = useMultiStyleConfig('BasePopover', {});

    return <Box data-testid={dataTestId} {...props} __css={styles['footer']} ref={ref} />;
  }
);

BasePopoverFooter.displayName = 'BasePopoverFooter';
