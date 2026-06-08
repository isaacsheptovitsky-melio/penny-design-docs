import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import type { LottieProps } from './Lottie.types';

export const lottieTheme: ComponentSingleStyleConfig<Pick<LottieProps, 'width' | 'height'>> = {
  baseStyle: ({ height, width }) => ({
    height,
    width,
  }),
};
