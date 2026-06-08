import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { type AriaAttributes, forwardRef, type PropsWithChildren, type ReactNode, useRef } from 'react';

import type { IconButtonProps } from '@/components/action/IconButton';

import {
  BasePopoverArrow,
  BasePopoverClose,
  BasePopoverContent,
  BasePopoverRoot,
  BasePopoverTrigger,
  type BasePopoverTriggerProps,
} from './components';
import type { UsePopoverOptions } from './useBasePopover';
import { useBasePopover } from './useBasePopover';

export type BasePopoverProps = {
  /** The trigger element that opens the popover. */
  trigger: ReactNode;
  /** If true, the close button will be hidden. */
  hideCloseButton?: boolean;
  /** The size of the close button. @default 'extra-small' */
  closeButtonSize?: IconButtonProps['size'];
  /** If true, focus will be trapped within the popover. */
  shouldTrapFocus?: boolean;
  'data-component'?: string;
} & AriaAttributes &
  Pick<BasePopoverTriggerProps, 'triggerProps'> &
  UsePopoverOptions &
  TestIdProp &
  PropsWithChildren;

/**
 * The BasePopover is a floating container that displays content relative to a trigger element.
 */
export const BasePopover = forwardRef<HTMLDivElement, BasePopoverProps>(
  (
    {
      children,
      hideCloseButton = false,
      trigger,
      closeButtonSize,
      showArrow = true,
      placement,
      'data-testid': dataTestId = 'base-popover',
      triggerProps,
      shouldTrapFocus = false,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const arrowRef = useRef(null);
    const popover = useBasePopover({ ...props, placement, showArrow, arrowRef });

    const getTestId = useTestId(dataTestId);

    const getDataComponent = (childName?: string) =>
      [props['data-component'] || 'BasePopover', childName].filter(Boolean).join('');

    return (
      <BasePopoverRoot popover={popover}>
        <BasePopoverTrigger data-component={getDataComponent('Trigger')} triggerProps={triggerProps}>
          {trigger}
        </BasePopoverTrigger>
        <BasePopoverContent
          ref={ref}
          {...getTestId()}
          data-component={getDataComponent()}
          shouldTrapFocus={shouldTrapFocus}
          aria-label={ariaLabel}
        >
          {!hideCloseButton && (
            <BasePopoverClose
              {...getTestId('close')}
              data-component={getDataComponent('Close')}
              onClose={() => popover.onOpenChange(false, 'close')}
              closeButtonSize={closeButtonSize}
            />
          )}
          {children}
          {showArrow && <BasePopoverArrow ref={arrowRef} />}
        </BasePopoverContent>
      </BasePopoverRoot>
    );
  }
);

BasePopover.displayName = 'BasePopover';
