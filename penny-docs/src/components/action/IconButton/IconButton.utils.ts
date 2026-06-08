import type { IconProps } from '@/components/foundations/Icon';
import type { SpinnerVariant } from '@/components/foundations/Spinner';

import type { IconButtonSizes, IconButtonVariants } from './IconButton.types';

export const DEFAULT_VARIANT: IconButtonVariants = 'primary';

export const DEFAULT_DATA_TEST_ID = 'icon-button';

export const iconSizeMap: Record<NonNullable<IconButtonSizes>, NonNullable<IconProps['size']>> = {
  'extra-small': 'small',
  small: 'small',
  medium: 'large',
  large: 'large',
};

/** Pixel size of the Spinner, matched to each button size. */
export const spinnerSizeMap: Record<NonNullable<IconButtonSizes>, number> = {
  'extra-small': 12,
  small: 14,
  medium: 18,
  large: 22,
};

/**
 * Maps each IconButton variant to the Spinner variant whose indicator colour matches the
 * button's foreground — light-content (filled/inverse-surface) variants get the `inverse`
 * (light) spinner; dark-content variants get the `neutral` (dark) spinner. This preserves the
 * "spinner inherits the button's colour" behaviour across all variants.
 */
export const spinnerVariantMap: Record<NonNullable<IconButtonVariants>, SpinnerVariant> = {
  primary: 'inverse',
  'primary-inverse': 'neutral',
  secondary: 'neutral',
  'secondary-inverse': 'inverse',
  tertiary: 'neutral',
  critical: 'inverse',
  'critical-secondary': 'neutral',
  naked: 'neutral',
  'naked-inverse': 'inverse',
};
