import { Box } from '@chakra-ui/react';
import { createElement, forwardRef } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useCssAnimation } from '@/theme/hooks/useAnimations';
import { useLoader } from '@/theme/hooks/useLoader';

import type { LoaderProps } from './Loader.types';

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ color = 'semantic.icon.brand', loadingText, hideLoadingText, ...props }, ref) => {
    const styles = useMultiStyleConfig('Loader', { color });
    const appear = useCssAnimation('appear');
    const shiftRight = useCssAnimation('shiftRight');
    const disappear = useCssAnimation('disappear');
    const loaderOverride = useLoader();

    return (
      <Box data-component="Loader" {...props} ref={ref} __css={styles['container']}>
        {loaderOverride ? (
          createElement(loaderOverride, {
            color,
          })
        ) : (
          <Box __css={styles['dots']}>
            {!hideLoadingText && <VisuallyHidden>{loadingText ?? 'Loading...'}</VisuallyHidden>}
            <Box animation={appear} __css={styles['first']} aria-hidden />
            <Box animation={shiftRight} __css={styles['second']} aria-hidden />
            <Box animation={shiftRight} __css={styles['third']} aria-hidden />
            <Box animation={disappear} __css={styles['forth']} aria-hidden />
          </Box>
        )}
      </Box>
    );
  }
);

Loader.displayName = 'Loader';
