import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const virtualCardTheme: ComponentMultiStyleConfig<'brand'> = {
  parts: ['brand'],
  baseStyle: {
    brand: {
      display: 'inline-flex',
      width: '80px',
      justifyContent: 'flex-end',
      // Override internal styles to avoid making adjustments to global components, which could potentially lead to UI changes.
      '> *': {
        maxWidth: '100%',
      },
      '[role="img"]': {
        maxWidth: '100%',
      },
    },
  },
};
