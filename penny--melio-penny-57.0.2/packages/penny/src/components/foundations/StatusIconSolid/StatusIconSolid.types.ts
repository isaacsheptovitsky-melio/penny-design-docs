import type { TestIdProp } from '@melio/penny-utils';
import type { AriaAttributes, AriaRole } from 'react';

import type { _BaseIconProps } from '@/components/internal/_BaseIcon';

export const statusIconSolidType = {
  pending: 'pause-solid',
  warning: 'warning-solid',
  success: 'checked-circle-fill',
  informative: 'info-fill',
  scheduled: 'stopwatch-fill',
  processing: 'process-fill',
  help: 'help-circle-fill',
  issues: 'refresh-fill',
  cancel: 'cancel',
  decline: 'decline-fill',
  alert: 'error-fill',
};

type StatusIconSolidType = typeof statusIconSolidType;
export type StatusIconSolidIcons = StatusIconSolidType[keyof StatusIconSolidType];

export type StatusIconSolidProps = Pick<_BaseIconProps, 'isDisabled' | 'isReadOnly' | 'isInverse'> & {
  variant: keyof typeof statusIconSolidType;
  size: Extract<_BaseIconProps['size'], 'small' | 'medium' | 'large' | 'extra-large'>;
  role?: AriaRole;
} & AriaAttributes &
  TestIdProp;
