import type { TestIdProp } from '@melio/penny-utils';
import type { ReactNode } from 'react';

/**
 * Status options for pill component
 */
export type PillStatus = 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';

/**
 * Type variants for pill appearance
 */
export type PillType = 'primary' | 'secondary' | 'tertiary';

export type PillProps = {
  /**
   * The type of the pill.
   */
  status: PillStatus;

  /**
   * The label on the pill.
   */
  label: string;

  /**
   * The type of the pill.
   * @default 'primary'
   */
  type?: PillType;

  /**
   * Children are not supported for Pill component
   */
  children?: never;

  /**
   * Determines if the pill is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Determines if the pill is read-only.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * An element to be displayed on the left side of the label.
   */
  leftElement?: ReactNode;

  /**
   * An element to be displayed on the right side of the label.
   */
  rightElement?: ReactNode;

  /**
   * Dedicated label for screen-readers (used for accessibility).
   */
  'aria-label'?: string;
} & TestIdProp;
