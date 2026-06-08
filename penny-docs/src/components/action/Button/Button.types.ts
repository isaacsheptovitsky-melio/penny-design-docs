import type { TestIdProp } from '@melio/penny-utils';
import type { ReactNode } from 'react';

import type { CommonActionProps } from '@/components/action/action.types';
import type { LoaderProps } from '@/components/foundations/Loader';

export const buttonVariants = [
  'primary',
  'primary-inverse',
  'secondary',
  'secondary-inverse',
  'tertiary',
  'success',
  'critical',
  'critical-secondary',
] as const;
export type ButtonVariants = (typeof buttonVariants)[number];

export type ButtonSizes = 'small' | 'medium' | 'large';

export type ButtonProps = {
  /**
   * The variant of the button.
   * @default 'primary'
   */
  variant?: ButtonVariants;

  /**
   * The size of the button.
   * @default 'medium'
   */
  size?: ButtonSizes;

  /**
   * Determines if the button should take the full width of its container.
   * @default false
   */
  isFullWidth?: boolean;

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

  /**
   * An element to be displayed on the left side of the label.
   */
  leftElement?: ReactNode;

  /**
   * An element to be displayed on the right side of the label.
   */
  rightElement?: ReactNode;

  /**
   * The text inside the button.
   */
  label?: string;

  /**
   * @deprecated Please use label prop instead.
   */
  children?: never;
} & CommonActionProps &
  TestIdProp &
  Pick<LoaderProps, 'loadingText' | 'hideLoadingText'>;
