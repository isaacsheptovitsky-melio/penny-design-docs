import { Box, type BoxProps } from '@chakra-ui/react';
import { useId } from '@floating-ui/react';
import { forwardRef, useLayoutEffect } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useDrawerContext } from '../DrawerContext';

/**
 * @private For internal use only. Should be consumed only by `Drawer`.
 */
export const DrawerHeader = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const styles = useMultiStyleConfig('Drawer', {});
  const { setLabelId, getTestId } = useDrawerContext();
  const id = useId();

  // Only sets `aria-labelledby` on the `Drawer` root element if this component is mounted inside it.
  useLayoutEffect(() => {
    setLabelId(id);

    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <Box
      data-component="DrawerHeader"
      __css={styles['header']}
      ref={ref}
      {...getTestId('header')}
      {...props}
      id={`floating-${id}`}
    />
  );
});

DrawerHeader.displayName = 'DrawerHeader';
