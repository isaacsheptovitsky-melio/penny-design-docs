import type { IconProps } from '@/components/foundations/Icon';

import type { IconButtonSizes, IconButtonVariants } from './IconButton.types';

export const DEFAULT_VARIANT: IconButtonVariants = 'primary';

export const DEFAULT_DATA_TEST_ID = 'icon-button';

export const iconSizeMap: Record<NonNullable<IconButtonSizes>, NonNullable<IconProps['size']>> = {
  'extra-small': 'small',
  small: 'small',
  medium: 'large',
  large: 'large',
};
