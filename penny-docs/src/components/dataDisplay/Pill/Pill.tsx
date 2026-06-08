import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { _BaseBadge } from '../../internal/_BaseBadge';
import type { PillProps } from './Pill.types';

/**
 * The `Pill` component is a small, rounded UI element for indicating status, categorizing content, or highlighting key details.
 */
export const Pill = forwardRef<HTMLDivElement, PillProps>(
  ({ status, 'data-testid': dataTestId = 'pill', ...props }, ref) => {
    const getTestId = useTestId(dataTestId);

    return <_BaseBadge data-component="Pill" {...props} status={status} {...getTestId()} ref={ref} />;
  }
);

Pill.displayName = 'Pill';
