import { Box } from '@chakra-ui/react';
import { forwardRef, type ReactNode } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

export const BaseSheetBody = forwardRef<HTMLDivElement, { children: ReactNode }>((props, ref) => {
  const styles = useMultiStyleConfig('BaseSheet', {});

  return <Box data-component="BaseSheetBody" __css={styles['body']} {...props} ref={ref} />;
});

BaseSheetBody.displayName = 'BaseSheetBody';
