import { type TestIdProp } from '@melio/penny-utils';

import { type PopoverProps } from '@/components/containers/Popover';

import { type TooltipProps } from '../../dataDisplay';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _IconIndicatorProps = {
  variant?: 'informative' | 'warning' | 'alert';
  isInverse?: boolean;
} & OneOrNone<{
  tooltip: Pick<TooltipProps, 'content' | 'shouldAddTriggerFocus' | 'triggerAriaLabel'>;
  popover: Pick<
    PopoverProps,
    'description' | 'actionRenderer' | 'data-testid' | 'aria-label' | 'triggerEvent' | 'defaultIsOpen' | 'isOpen'
  >;
}> &
  TestIdProp;
