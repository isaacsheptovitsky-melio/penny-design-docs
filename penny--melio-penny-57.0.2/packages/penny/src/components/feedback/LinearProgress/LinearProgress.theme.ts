import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const linearProgressTheme: ComponentMultiStyleConfig<
  'container' | 'track' | 'indicator',
  { percentage: number }
> = {
  parts: ['container', 'track', 'indicator'],
  baseStyle: ({ percentage }) => ({
    container: {
      width: '100%',
    },
    track: {
      backgroundColor: 'semantic.fill.tertiary',
      overflow: 'hidden',
      width: '100%',
      height: '8px',
      borderRadius: 'global.full',

      '@media (forced-colors: active)': {
        border: 'global.25',
        borderColor: 'global.neutral.A0',
      },
    },
    indicator: {
      backgroundColor: 'semantic.fill.brand.primary',
      width: `${percentage}%`,
      height: '100%',
      transition: 'width 0.6s ease',

      '@media (forced-colors: active)': {
        backgroundColor: 'CanvasText',
      },
    },
  }),
};
