import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { _IconIndicator } from '@/components/internal/_IconIndicator';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import type { _SectionLabelProps } from './_SectionLabel.types';

/**
 * @private
 */
export const _SectionLabel = forwardRef<HTMLDivElement, _SectionLabelProps>(
  ({ label, as = 'div', tooltipProps, isVerified, ...props }, ref) => {
    const styles = useStyleConfig('_SectionLabel', {});

    return (
      <Box ref={ref} data-component="_SectionLabel" __css={styles} data-testid="section-label" {...props} as={as}>
        <Text textStyle="inline" color="inherit">
          {label}
        </Text>
        {tooltipProps && <_IconIndicator tooltip={tooltipProps} />}
        {isVerified && <Icon type="verified" size="small" color="brand" />}
      </Box>
    );
  }
);

_SectionLabel.displayName = '_SectionLabel';
