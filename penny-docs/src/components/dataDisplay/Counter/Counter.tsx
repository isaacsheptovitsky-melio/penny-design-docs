import { useTestId } from '@melio/penny-utils';
import { forwardRef, useMemo } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { _BaseBadge } from '../../internal/_BaseBadge';
import type { CounterProps } from './Counter.types';

const LENGTH = 2; // preparation for dynamic length of characters to detect the max number to display.
const FIX_SIZE_LENGTH = 2; // according to the design up to 2 character the counter has fixed size

/**
 * The `Counter` displays small numerical values to indicate quantities
 */
export const Counter = forwardRef<HTMLDivElement, CounterProps>(
  ({ status, number, 'data-testid': dataTestId = 'counter', ...rest }, ref) => {
    const getTestId = useTestId(dataTestId);

    const numberMask = useMemo(() => {
      const maxNumber = Math.pow(10, LENGTH) - 1;

      return maxNumber < number ? `+${maxNumber}` : `${number}`;
    }, [number]);

    const isFixedSize = numberMask.length <= FIX_SIZE_LENGTH;

    const styles = useStyleConfig('Counter', { status, isFixedSize });

    return (
      <_BaseBadge
        data-component="Counter"
        status={status}
        {...rest}
        {...getTestId()}
        __css={styles}
        ref={ref}
        label={numberMask}
      />
    );
  }
);

Counter.displayName = 'Counter';
