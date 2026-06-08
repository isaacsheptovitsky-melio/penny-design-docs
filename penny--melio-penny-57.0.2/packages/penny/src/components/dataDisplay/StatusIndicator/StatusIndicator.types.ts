import type { TestIdProp } from '@melio/penny-utils';
import type { ReactNode } from 'react';

/**
 * Available status types for visual indication
 */
export type StatusType = 'brand' | 'critical' | 'warning' | 'success' | 'informative' | 'neutral' | 'secondary';

export type StatusIndicatorProps = {
  /**
   * The status of the status indicator.
   */
  status: StatusType;

  /**
   * Determines if the status indicator is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Determines if the status indicator is in read-only state.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * The wrapped component with the status indicator.
   */
  children?: ReactNode;
} & TestIdProp;
