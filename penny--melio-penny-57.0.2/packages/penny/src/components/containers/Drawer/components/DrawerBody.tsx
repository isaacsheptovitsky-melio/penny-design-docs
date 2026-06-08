import { Box, type BoxProps } from '@chakra-ui/react';
import { useId } from '@floating-ui/react';
import { forwardRef, useLayoutEffect } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useDrawerContext } from '../DrawerContext';

/**
 * @private For internal use only. Should be consumed only by `Drawer`.
 */
export const DrawerBody = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const styles = useMultiStyleConfig('Drawer', {});
  const { setDescriptionId, getTestId } = useDrawerContext();
  const id = useId();

  // Only sets `aria-describedby` on the `Drawer` root element if this component is mounted inside it.
  useLayoutEffect(() => {
    setDescriptionId(id);

    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <Box
      as="section"
      data-component="DrawerBody"
      __css={styles['body']}
      ref={ref}
      {...getTestId('body')}
      {...props}
      id={`floating-${id}`}
    />
  );
});

DrawerBody.displayName = 'DrawerBody';
