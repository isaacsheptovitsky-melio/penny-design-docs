import { type AriaAttributes, type ReactNode } from 'react';

import { type TextProps } from '@/components/dataDisplay/Text';

import { type OpenChangeTriggerEvent } from '../../../Context';
import { type ItemProps } from '../../../Context/components/Item/Item.types';

export type MenuItemProps = Pick<ItemProps, 'disabled'> & {
  label: string;
  isSelected?: boolean;
  variant?: 'default' | 'critical';
  dataTestId?: string;
  onClick?: (triggerEvent?: OpenChangeTriggerEvent) => void;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  textStyle?: TextProps['textStyle'];
} & AriaAttributes;
