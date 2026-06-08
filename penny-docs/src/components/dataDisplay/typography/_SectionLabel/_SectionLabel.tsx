import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import type { _SectionLabelProps } from './_SectionLabel.types';

/**
 * @private
 *
 * Vendored-trimmed: the `tooltipProps` (_IconIndicator -> Popover/StatusIconSolid) and `isVerified`
 * (Icon "verified") branches were removed because the Menu spine only renders
 * `<Typography.SectionLabel label={...} />`. The props remain in the type for source compatibility
 * but are not rendered here.
 */
export const _SectionLabel = forwardRef<HTMLDivElement, _SectionLabelProps>(
  ({ label, as = 'div', tooltipProps: _tooltipProps, isVerified: _isVerified, ...props }, ref) => {
    const styles = useStyleConfig('_SectionLabel', {});

    return (
      <Box ref={ref} data-component="_SectionLabel" __css={styles} data-testid="section-label" {...props} as={as}>
        <Text textStyle="inline" color="inherit">
          {label}
        </Text>
      </Box>
    );
  }
);

_SectionLabel.displayName = '_SectionLabel';
