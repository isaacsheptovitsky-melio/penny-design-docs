import { type Placement } from '@floating-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import { forwardRef, type ReactNode } from 'react';

import { Button } from '@/components/action/Button';
import {
  type BasePopoverOpenChangeTriggerEvent,
  basePopoverVerticalPlacementEdges,
} from '@/components/containers/BasePopover';
import { Popover, type PopoverProps } from '@/components/containers/Popover';

export type TourPopoverProps = Pick<
  PopoverProps,
  | 'placement'
  | 'title'
  | 'icon'
  | 'description'
  | 'isOpen'
  | 'hideCloseButton'
  | 'footerText'
  | 'showArrow'
  | 'triggerProps'
  | 'shouldTrapFocus'
> & {
  onCloseClick?: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onOutsideClick?: () => void;
  onTriggerClick?: () => void;
  nextButtonLabel: string;
  prevButtonLabel?: string;
  children?: ReactNode;
} & TestIdProp;

export const TourPopover = forwardRef<HTMLDivElement, TourPopoverProps>(
  (
    {
      onNextClick,
      onPrevClick,
      onOutsideClick,
      onTriggerClick,
      onCloseClick,
      nextButtonLabel = 'Next',
      prevButtonLabel,
      placement = 'bottom-end',
      showArrow = true,
      triggerProps,
      shouldTrapFocus,
      ...props
    },
    ref
  ) => {
    const handleOnOpenChange = (_isOpen: boolean, triggerEvent?: BasePopoverOpenChangeTriggerEvent) => {
      if (triggerEvent === 'outside') {
        onOutsideClick?.();
      } else if (triggerEvent === 'close') {
        onCloseClick?.();
      } else if (triggerEvent === 'children') {
        onTriggerClick?.();
      }
    };

    // converting the placements because the design placements requirements are different from the actual floating-ui's placements.
    const convertedPlacement = basePopoverVerticalPlacementEdges.includes(placement)
      ? ((placement.includes('start')
          ? placement.replace('start', 'end')
          : placement.replace('end', 'start')) as Placement)
      : placement;

    return (
      <Popover
        data-component="TourPopover"
        showArrow={showArrow}
        {...props}
        onOpenChange={handleOnOpenChange}
        actionRenderer={({ onClose, ...props }) => (
          <Button
            {...props}
            variant="secondary-inverse"
            size="small"
            onClick={() => {
              onClose();
              onNextClick?.();
            }}
            label={nextButtonLabel}
          />
        )}
        backButtonRenderer={(props) =>
          prevButtonLabel && (
            <Button {...props} variant="secondary-inverse" size="small" onClick={onPrevClick} label={prevButtonLabel} />
          )
        }
        triggerEvent="click"
        closeButtonSize="extra-small"
        placement={convertedPlacement}
        ref={ref}
        enableAnimationFrame
        triggerProps={triggerProps}
        shouldTrapFocus={shouldTrapFocus}
      />
    );
  }
);

TourPopover.displayName = 'TourPopover';
