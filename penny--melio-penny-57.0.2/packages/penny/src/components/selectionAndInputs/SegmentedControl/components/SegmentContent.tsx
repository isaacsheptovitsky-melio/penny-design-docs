import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type SegmentContentProps } from './SegmentContent.types';
import { DEFAULT_SEGMENT_SIZE } from './SegmentedControlItem.types';

export const SegmentContent = forwardRef<HTMLDivElement, SegmentContentProps>(
  ({ children, size = DEFAULT_SEGMENT_SIZE, disabled, selected, ...props }, ref) => {
    const styles = useMultiStyleConfig('SegmentedControl', { size });

    return (
      <Box
        ref={ref}
        __css={styles['segmentLabel']}
        data-component="SegmentLabel"
        data-selected={selected || undefined}
        data-disabled={disabled || undefined}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

SegmentContent.displayName = 'SegmentLabel';
