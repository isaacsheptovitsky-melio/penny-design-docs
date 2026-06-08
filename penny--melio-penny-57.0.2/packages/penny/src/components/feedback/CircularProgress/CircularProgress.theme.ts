import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const circularProgressTheme: ComponentMultiStyleConfig<
  'container' | 'circle' | 'track',
  { strokeDasharray: string; transition: string | null }
> = {
  parts: ['container', 'circle', 'track'],
  baseStyle: ({ strokeDasharray, transition }) => ({
    container: {
      width: '24px',
      height: '24px',
      display: 'inline-flex',
    },
    circle: {
      stroke: 'semantic.border.static',
      fill: 'transparent',
      strokeWidth: '10px',
    },
    track: {
      stroke: 'semantic.fill.brand.primary',
      strokeWidth: '10px',
      fill: 'transparent',
      opacity: 1,
      strokeDashoffset: 66,
      strokeDasharray,
      transition: transition !== null ? `stroke-dasharray ${transition}, stroke ${transition}` : 'unset',

      '&[data-progress="0"]': {
        opacity: 0,
      },
    },
  }),
};
