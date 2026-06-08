import { type TestIdProp } from '@melio/penny-utils';
import { type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';

import { type OpenChangeTriggerEvent } from '../..';

export type ItemProps = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>, triggerEvent?: OpenChangeTriggerEvent) => void;
  isSelected?: boolean;
  disabled?: boolean;
  index?: number;
  tabIndex?: number;
  id?: string;
  role?: string;
  label?: string;
  isMulti?: boolean;
} & TestIdProp &
  HTMLAttributes<HTMLElement>;
