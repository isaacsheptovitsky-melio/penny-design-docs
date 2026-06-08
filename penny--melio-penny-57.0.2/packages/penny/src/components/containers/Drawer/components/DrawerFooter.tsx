import { Box, type BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useDrawerContext } from '../DrawerContext';

/**
 * @private For internal use only. Should be consumed only by `Drawer`.
 */
export const DrawerFooter = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const styles = useMultiStyleConfig('Drawer', {});
  const { getTestId } = useDrawerContext();

  return <Box data-component="DrawerFooter" __css={styles['footer']} ref={ref} {...getTestId('footer')} {...props} />;
});

DrawerFooter.displayName = 'DrawerFooter';
