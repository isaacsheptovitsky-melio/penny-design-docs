import { SkeletonCircle as ChakraSkeletonCircle } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';

import { skeletonColors } from '../Skeleton/Skeleton.types';
import type { SkeletonCircleProps } from './SkeletonCircle.types';

/**
 * SkeletonCircle is used to display the loading state of some components.
 */
export const SkeletonCircle = ({
  diameter = '20px',
  'data-testid': dataTestId = 'skeleton-circle',
  ...props
}: SkeletonCircleProps) => {
  const getTestId = useTestId(dataTestId);

  return (
    <ChakraSkeletonCircle
      data-component="SkeletonCircle"
      {...props}
      {...getTestId()}
      size={diameter.toString()}
      borderRadius="global.full"
      speed={1.2}
      {...skeletonColors}
    />
  );
};

SkeletonCircle.displayName = 'SkeletonCircle';
