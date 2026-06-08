import { keyframes } from '@emotion/react';

import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

import { type SpinnerSize, type SpinnerVariant } from './Spinner.types';

const spin = keyframes`
    0% {
        stroke-dasharray: 20 545;
        stroke-dashoffset: 0;
        transform: rotate(0deg);
    }
    50% {
        stroke-dasharray: 450 115;
        stroke-dashoffset: -140;
        transform: rotate(450deg);
    }
    100% {
        stroke-dasharray: 20 545;
        stroke-dashoffset: -565;
        transform: rotate(1080deg);
    }
`;

export const spinnerTheme: ComponentMultiStyleConfig<
  'container' | 'track' | 'indicator',
  { variant: SpinnerVariant; size: SpinnerSize }
> = {
  parts: ['container', 'track', 'indicator'],
  baseStyle: {
    container: {},
    track: {
      fill: 'none',
      strokeWidth: 18,
      strokeLinecap: 'round',

      _disabled: {
        stroke: 'global.neutral.AD5',
      },
    } as unknown as InternalCSSObject,
    indicator: {
      fill: 'none',
      strokeWidth: 18,
      strokeLinecap: 'round',
      strokeDasharray: 565,
      transformOrigin: 'center',
      animation: `${spin} 3s cubic-bezier(0.75, 0.5, 0.5, 0.5) infinite`,

      _disabled: {
        stroke: 'semantic.icon.disabled',
      },
    } as unknown as InternalCSSObject,
  },
  sizes: {
    small: {
      container: {
        height: '16px',
        width: '16px',
      },
    },
    medium: {
      container: {
        height: '24px',
        width: '24px',
      },
    },
  },
  variants: {
    neutral: {
      track: {
        stroke: 'global.neutral.AD10',
      },
      indicator: {
        stroke: 'semantic.icon.primary',
      },
    },
    brand: {
      track: {
        stroke: 'global.neutral.AD10',
      },
      indicator: {
        stroke: 'semantic.icon.brand',
      },
    },
    inverse: {
      track: {
        stroke: 'global.neutral.A10',
      },
      indicator: {
        stroke: 'semantic.icon.inverse',
      },
    },
  },
};
