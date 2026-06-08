import { Box, type BoxProps } from '@chakra-ui/react';
import { type AriaAttributes, forwardRef, type MouseEventHandler } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useCssAnimation } from '@/theme/hooks/useAnimations';

export type BeaconProps = Pick<BoxProps, 'cursor'> & {
  onClick?: MouseEventHandler<HTMLDivElement>;
  as?: BoxProps['as'];
} & AriaAttributes;

export const Beacon = forwardRef<HTMLDivElement, BeaconProps>((props, ref) => {
  const breathing = useCssAnimation('breathing');
  const styles = useMultiStyleConfig('Beacon', {});

  return (
    <Box data-component="Beacon" data-testid="beacon" ref={ref} {...props} __css={styles['beaconWrapper']}>
      <Box __css={styles['beacon']} animation={breathing}>
        <Box __css={styles['beaconDot']} />
      </Box>
    </Box>
  );
});

Beacon.displayName = 'Beacon';
