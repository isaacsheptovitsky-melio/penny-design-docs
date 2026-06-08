import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';

import { _BaseBadge } from '../../internal';
import type { PillProps } from './Pill.types';

/**
 * The `Pill` component is a small, rounded UI element for indicating status, categorizing content, or highlighting key details.
 */
export const Pill = forwardRef<HTMLDivElement, PillProps>(
  ({ status, 'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.PILL, ...props }, ref) => {
    const getTestId = useTestId(dataTestId);

    return <_BaseBadge data-component="Pill" {...props} status={status} {...getTestId()} ref={ref} />;
  }
);

Pill.displayName = 'Pill';
