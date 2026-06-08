import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { _BaseIcon } from '../../internal/_BaseIcon';
import type { FlagIconProps } from './FlagIcon.types';

/**
 * `FlagIcon` component displays country flag icons using ISO 3166-1 alpha-2 country codes.
 */
export const FlagIcon = forwardRef<HTMLDivElement, FlagIconProps>(
  (
    {
      countryCode,
      size = 'medium',
      isDisabled,
      'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.FLAG_ICON,
      ...otherProps
    },
    ref
  ) => {
    const styles = useStyleConfig('FlagIcon');
    const getTestId = useTestId(dataTestId);

    return (
      <Box __css={styles} as="span" data-disabled={isDisabled || null}>
        <_BaseIcon
          ref={ref}
          type={countryCode}
          size={size}
          color="inherit"
          aria-label={`${countryCode} flag icon`}
          data-component="FlagIcon"
          role="img"
          {...getTestId()}
          {...otherProps}
        />
      </Box>
    );
  }
);

FlagIcon.displayName = 'FlagIcon';
