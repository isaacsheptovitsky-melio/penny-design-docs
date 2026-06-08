import { Box } from '@chakra-ui/react';
import { forwardRef, type ReactNode } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useBaseSheetContext } from '../BaseSheetContext';

export const BaseSheetFooter = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children, ...props }, ref) => {
  const { paddingX, paddingY, showFooterBorder } = useBaseSheetContext();
  const styles = useMultiStyleConfig('BaseSheet', { paddingX, paddingY, showFooterBorder });

  return (
    <Box data-component="BaseSheetFooter" {...props} __css={styles['footer']} ref={ref}>
      {children}
    </Box>
  );
});

BaseSheetFooter.displayName = 'BaseSheetFooter';
