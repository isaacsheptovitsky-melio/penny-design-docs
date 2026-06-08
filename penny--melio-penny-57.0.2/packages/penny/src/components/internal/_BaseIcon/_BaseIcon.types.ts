import { type AriaAttributes, type HTMLAttributes } from 'react';

import { type AllIconKey, type BaseIconColorKey, type IconSize } from '@/theme/icons/icon.types';

export const iconColorMapping = {
  default: 'semantic.icon.primary',
  inverse: 'semantic.icon.inverse',
  inherit: 'inherit',
  brand: 'semantic.icon.brand',
  critical: 'semantic.icon.critical',
  success: 'semantic.icon.success',
  informative: 'semantic.icon.informative',
} as const;

export type IconColor = keyof typeof iconColorMapping;

/**
 * @private For internal use only.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _BaseIconProps = {
  type: AllIconKey;
  size: IconSize;
  color: BaseIconColorKey;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInverse?: boolean;
} & AriaAttributes &
  Pick<HTMLAttributes<HTMLSpanElement>, 'role'>;
