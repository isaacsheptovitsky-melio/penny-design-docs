import type { TestIdProp } from '@melio/penny-utils';
import type { ReactNode } from 'react';

import type { CommonActionProps } from '@/components/action/action.types';

export type NakedButtonVariant = 'primary' | 'secondary' | 'invert' | 'critical';
export type NakedButtonSize = 'medium' | 'large';

export type NakedButtonProps = TestIdProp & {
  /**
   * The variant of the button.
   * @default 'primary'
   */
  variant?: NakedButtonVariant;

  /**
   * The size of the button.
   * @default 'medium'
   */
  size?: NakedButtonSize;

  /**
   * Determines if the button is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * The text inside the button.
   */
  label: string;

  /**
   * @deprecated Please use label prop instead.
   */
  children?: never;

  /**
   * Determines if a long label should be truncated.
   * @default false
   */
  shouldSupportEllipsis?: boolean;

  /**
   * An element to be displayed on the left side of the label.
   */
  leftElement?: ReactNode;

  /**
   * An element to be displayed on the right side of the label.
   */
  rightElement?: ReactNode;
} & CommonActionProps;
