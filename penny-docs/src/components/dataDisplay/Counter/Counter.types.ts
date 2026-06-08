import type { TestIdProp } from '@melio/penny-utils';

import type { _BaseBadgeProps } from '@/components/internal/_BaseBadge';

/**
 * Available status options for the counter
 */
export type CounterStatus = Extract<
  _BaseBadgeProps['status'],
  'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative'
>;

export type CounterProps = Pick<_BaseBadgeProps, 'children'> & {
  /**
   * The status of the Counter.
   */
  status: CounterStatus;

  /**
   * The number in the Counter.
   * When the number is above the maximum digits displayed, the largest number that can be displayed is shown with a '+' sign.
   */
  number: number;
} & TestIdProp;
