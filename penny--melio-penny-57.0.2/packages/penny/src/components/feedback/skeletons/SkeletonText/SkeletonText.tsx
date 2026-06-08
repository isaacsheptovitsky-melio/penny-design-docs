import { SkeletonText as ChakraSkeletonText } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { skeletonColors } from '../Skeleton/Skeleton.types';
import type { SkeletonTextProps } from './SkeletonText.types';

/**
 * SkeletonText is used to display the loading state of some components.
 */
export const SkeletonText = ({
  numberOfLines = 2,
  spacing = 'xs',
  'data-testid': dataTestId = 'skeleton-text',
  ...props
}: SkeletonTextProps) => {
  const styles = useStyleConfig('SkeletonText', props);
  const getTestId = useTestId(dataTestId);
  return (
    <ChakraSkeletonText
      data-component="SkeletonText"
      {...props}
      noOfLines={numberOfLines}
      spacing={spacing}
      {...getTestId()}
      __css={styles}
      speed={1.2}
      {...skeletonColors}
    />
  );
};

SkeletonText.displayName = 'SkeletonText';
