import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { DividerProps } from './Divider.types';

/**
 * `Divider` component creates visual separation between content sections.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(({ label, variant = 'horizontal', ...props }, ref) => {
  const styles = useMultiStyleConfig('Divider', { variant });

  const shouldRenderLabel = Boolean(label && variant === 'horizontal');

  return (
    <Box __css={styles['container']} data-component="Divider" {...props} ref={ref}>
      <Box __css={styles['line']} />
      {shouldRenderLabel && (
        <>
          <Box __css={styles['text']}>{label}</Box>
          <Box __css={styles['line']} />
        </>
      )}
    </Box>
  );
});

Divider.displayName = 'Divider';
