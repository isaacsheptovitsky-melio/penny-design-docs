import { Skeleton as ChakraSkeleton } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { skeletonColors, type SkeletonProps } from './Skeleton.types';

/**
 * Skeleton is used to display the loading state of some components.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ height = '20px', 'data-testid': dataTestId = 'skeleton', ...props }, ref) => {
    const styles = useStyleConfig('Skeleton', props);
    const getTestId = useTestId(dataTestId);

    return (
      <ChakraSkeleton
        data-component="Skeleton"
        {...props}
        ref={ref}
        {...getTestId()}
        height={height}
        __css={styles}
        speed={1.2}
        {...skeletonColors}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
