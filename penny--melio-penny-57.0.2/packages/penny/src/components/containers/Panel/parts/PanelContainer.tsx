import { Box, forwardRef } from '@chakra-ui/react';

import { useMultiStyleConfig } from '@/theme/hooks';

import { type PanelProps } from '../Panel.types';

export const PanelContainer = forwardRef<PanelProps, 'div'>(
  ({ children, placement, position, transitionConfig, maxWidth, width, ...props }, ref) => {
    const styles = useMultiStyleConfig('Panel', { width, maxWidth });

    return (
      <Box
        __css={styles['container']}
        data-component="Panel"
        data-placement={placement}
        data-position={position}
        data-testid="panel"
        aria-hidden={transitionConfig ? !transitionConfig.in : undefined}
        {...props}
        ref={ref}
      >
        {children}
      </Box>
    );
  }
);

PanelContainer.displayName = 'PanelContainer';
