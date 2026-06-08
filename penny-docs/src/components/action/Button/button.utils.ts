import type { LoaderProps } from '@/components/foundations/Loader';

import type { ButtonVariants } from './Button.types';

export const DEFAULT_VARIANT = 'primary';

export const DEFAULT_DATA_TEST_ID = 'button';

export const loaderColorMap: Record<ButtonVariants, LoaderProps['color']> = {
  primary: 'component.button.primary.loading.content',
  'primary-inverse': 'component.button.primaryInverse.loading.content',
  secondary: 'component.button.secondary.loading.content',
  'secondary-inverse': 'component.button.secondaryInverse.loading.content',
  tertiary: 'component.button.tertiary.loading.content',
  success: 'semantic.text.inverse',
  critical: 'component.button.critical.loading.content',
  'critical-secondary': 'component.button.criticalSecondary.loading.content',
};
