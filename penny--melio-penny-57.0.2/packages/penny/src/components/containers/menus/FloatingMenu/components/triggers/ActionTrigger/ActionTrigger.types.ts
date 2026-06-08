import { type TestIdProp } from '@melio/penny-utils';

import { type ButtonProps } from '@/components/action/Button';
import { type IconKey } from '@/theme/icons';

export type ActionTriggerProps = Pick<ButtonProps, 'label' | 'size' | 'isFullWidth' | 'children'> & {
  icon?: IconKey;
  variant?: 'default' | 'inverse';
} & TestIdProp;
