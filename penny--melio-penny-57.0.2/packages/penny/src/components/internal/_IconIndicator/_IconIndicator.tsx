import { forwardRef } from 'react';

import { Popover } from '@/components/containers/Popover';
import { Icon } from '@/components/foundations/Icon';
import { StatusIconSolid } from '@/components/foundations/StatusIconSolid';

import { Tooltip } from '../../dataDisplay';
import type { _IconIndicatorProps } from './_IconIndicator.types';

/**
 * @private For internal use only
 */
export const _IconIndicator = forwardRef<HTMLDivElement, _IconIndicatorProps>(
  (
    {
      variant = 'informative',
      tooltip,
      popover,
      'data-testid': dataTestId = 'icon-indicator',
      isInverse = false,
      ...props
    },
    ref
  ) => {
    // Warning variant should be always solid due to accessibility
    const icon =
      variant === 'warning' ? (
        <StatusIconSolid
          data-component="_IconIndicator"
          data-testid={dataTestId}
          {...props}
          ref={ref}
          size="small"
          variant="warning"
        />
      ) : (
        <Icon
          data-component="_IconIndicator"
          data-testid={dataTestId}
          {...props}
          ref={ref}
          size="small"
          type={variant === 'informative' ? 'info' : 'error'}
          color={isInverse ? 'inverse' : variant === 'informative' ? 'default' : 'critical'}
        />
      );

    if (tooltip) {
      return (
        <Tooltip content={tooltip.content} triggerAriaLabel={tooltip.triggerAriaLabel} shouldAddTriggerFocus>
          {icon}
        </Tooltip>
      );
    }

    if (popover) {
      return <Popover {...popover}>{icon}</Popover>;
    }

    return icon;
  }
);

_IconIndicator.displayName = '_IconIndicator';
