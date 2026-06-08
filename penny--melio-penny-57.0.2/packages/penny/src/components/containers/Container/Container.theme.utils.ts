import { type ThemeColorKey } from '@/theme/foundations/colors/types';
import { type InternalCSSObject } from '@/theme/types';

import { type BackgroundColorOptions, BorderOptions } from './Container.types';

export const BorderStyle: Record<BorderOptions, InternalCSSObject> = {
  [BorderOptions.None]: {
    border: 'global.none',
  },
  [BorderOptions.Regular]: {
    border: 'semantic.container.default',
    borderColor: 'semantic.border.static',
    borderRadius: 'component.container.default',
  },
  [BorderOptions.Dashed]: {
    border: 'semantic.container.default',
    borderStyle: 'dashed' as never,
    borderColor: 'semantic.border.interactive.rest',
    borderRadius: 'component.container.default',
  },
} as const;

export const BackgroundStyle: Record<BackgroundColorOptions, ThemeColorKey | 'transparent'> = {
  default: 'transparent',
  light: 'semantic.surface.secondary.rest',
  white: 'semantic.surface.primary.rest',
};
