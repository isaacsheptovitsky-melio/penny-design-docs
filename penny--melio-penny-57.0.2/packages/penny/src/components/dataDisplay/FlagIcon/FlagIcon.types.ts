import { type TestIdProp } from '@melio/penny-utils';

import type { _BaseIconProps } from '@/components/internal/_BaseIcon';
import type { FlagKey } from '@/theme/icons/assets/flags/flags.generated.types';

/**
 * Available sizes for flag icons
 */
export type FlagIconSize = Extract<_BaseIconProps['size'], 'extra-small' | 'small' | 'medium'>;

export type FlagIconProps = Pick<_BaseIconProps, 'isDisabled' | 'aria-label'> & {
  /**
   * The country code of the icon in ISO 3166-1 alpha-2 format.
   */
  countryCode: FlagKey;

  /**
   * The size of the icon.
   * @default 'medium'
   */
  size?: FlagIconSize;
} & TestIdProp;
