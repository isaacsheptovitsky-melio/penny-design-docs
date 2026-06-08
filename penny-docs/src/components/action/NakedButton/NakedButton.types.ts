import type { ReactNode } from 'react';

import type { CommonActionProps } from '@/components/action/action.types';

export type NakedButtonVariant = 'primary' | 'secondary' | 'invert' | 'critical';
export type NakedButtonSize = 'medium' | 'large';

export type NakedButtonProps = {
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

  /** data-testid attribute for test selectors. */
  'data-testid'?: string;
} & CommonActionProps;
