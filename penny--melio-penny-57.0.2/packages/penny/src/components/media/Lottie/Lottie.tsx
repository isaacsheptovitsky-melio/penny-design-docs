import { Box } from '@chakra-ui/react';
import { get, useTestId } from '@melio/penny-utils';
import ReactLottie, { type LottieRefCurrentProps } from 'lottie-react';
import { forwardRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { useTheme } from '@/theme/hooks/useTheme';

import { hexToLottieColor } from './hex-to-lottie-color.util';
import type { LottieProps } from './Lottie.types';

/**
 * This component helps you display Lottie animations.
 */
export const Lottie = forwardRef<LottieRefCurrentProps, LottieProps>(
  (
    {
      animation,
      colors: lottieColors = [],
      loop = true,
      height = '340px',
      width = '450px',
      'data-testid': dataTestId = 'lottie',
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();
    const animationData: unknown =
      typeof animation === 'function'
        ? (animation as (...rest: number[][]) => unknown)(
            ...lottieColors.map((color) => hexToLottieColor(get(colors, color)))
          )
        : animation;
    const styles = useStyleConfig('Lottie', { width, height });
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        as={ReactLottie}
        __css={styles}
        data-component="Lottie"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lottieRef={ref}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        loop={loop}
        animationData={animationData}
        {...getTestId()}
        {...props}
      />
    );
  }
);

Lottie.displayName = 'Lottie';
