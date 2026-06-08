import { forwardRef } from 'react';

import { Group } from '@/components/containers/Group';

import { TooltipContent, TooltipTrigger } from './components';
import type { TooltipProps } from './tooltip.types';
import { TooltipContext, useTooltip } from './tooltip.utils';

/**
 * A `Tooltip` is a brief, informative message that appears when a user interacts with an element.
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      placement,
      isEnabled = true,
      shouldAddTriggerFocus = false,
      triggerAriaLabel = 'More info',
      dontDescribeChild = false,
      isOpen,
      onOpenChange,
      ...otherProps
    },
    ref
  ) => {
    const tooltip = useTooltip({ placement, isEnabled, isOpen, onOpenChange });

    return (
      <TooltipContext.Provider value={tooltip}>
        <TooltipTrigger
          shouldAddTriggerFocus={shouldAddTriggerFocus}
          aria-label={triggerAriaLabel}
          {...(dontDescribeChild && {
            'aria-describedby': undefined,
          })}
          isEnabled={isEnabled}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent ref={ref} data-component="Tooltip" {...otherProps}>
          <Group variant="vertical" spacing="none">
            {content}
          </Group>
        </TooltipContent>
      </TooltipContext.Provider>
    );
  }
);

Tooltip.displayName = 'Tooltip';
