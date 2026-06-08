import { Box, type BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

export const FloatingContainer = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const styles = useStyleConfig('FloatingContainer');

  return <Box data-component="FloatingContainer" __css={styles} ref={ref} {...props} />;
});

FloatingContainer.displayName = 'FloatingContainer';
