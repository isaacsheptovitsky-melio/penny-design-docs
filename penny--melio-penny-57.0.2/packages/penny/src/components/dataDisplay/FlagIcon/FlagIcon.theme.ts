import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

export const flagIconTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    display: 'inline-flex',
    // This makes sure the icon is vertically aligned to the text next to it.
    verticalAlign: 'text-bottom',
    _disabled: {
      opacity: '0.35',
    },
  },
};
