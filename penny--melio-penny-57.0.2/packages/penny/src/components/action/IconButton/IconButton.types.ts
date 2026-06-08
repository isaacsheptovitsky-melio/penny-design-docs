import type { TestIdProp } from '@melio/penny-utils';

import type { CommonActionProps } from '@/components/action/action.types';
import type { IconKey } from '@/theme/icons';

export const iconButtonSizes = ['extra-small', 'small', 'medium', 'large'] as const;
export type IconButtonSizes = (typeof iconButtonSizes)[number];

export const iconButtonVariants = [
  'primary',
  'primary-inverse',
  'secondary',
  'secondary-inverse',
  'tertiary',
  'critical',
  'critical-secondary',
  'naked',
  'naked-inverse',
] as const;
export type IconButtonVariants = (typeof iconButtonVariants)[number];

export type IconButtonProps = {
  /**
   * The icon inside the button.
   */
  icon: IconKey;
  /**
   * The variant of the button.
   * @default 'tertiary'
   */
  variant?: IconButtonVariants;

  /**
   * The size of the button.
   * @default 'medium'
   */
  size?: IconButtonSizes;
  /**
   * Determines if the button is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Determines if the button is in loading state.
   * @default false
   */
  isLoading?: boolean;
} & CommonActionProps &
  TestIdProp;
