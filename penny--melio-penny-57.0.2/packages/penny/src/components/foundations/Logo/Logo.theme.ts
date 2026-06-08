import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import type { LogoProps } from './Logo.types';

export const logoTheme: ComponentSingleStyleConfig<Pick<LogoProps, 'size'>> = {
  baseStyle: {
    display: 'flex',
  },
  sizes: {
    small: {
      height: '24px',
    },
    large: {
      height: '32px',
    },
  },
};
