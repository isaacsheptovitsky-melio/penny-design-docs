import type { TestIdProp } from '@melio/penny-utils';

import type { _BaseIconProps, IconColor } from '@/components/internal/_BaseIcon';
import type { IconKey } from '@/theme/icons/icons.generated.types';

export type IconSize = Extract<_BaseIconProps['size'], 'extra-small' | 'small' | 'large'>;

export type IconProps = Pick<_BaseIconProps, 'isDisabled' | 'isReadOnly' | 'role' | 'aria-label'> & {
  type: IconKey;
  size?: IconSize;
  color?: IconColor;
} & TestIdProp;
