import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';
import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { getBrandMap } from '@/theme/icons';
import { useConfig } from '@/theme/providers/ConfigProvider';

import type { BrandProps } from './Brand.types';

/**
 * `Brand` component displays brand logos and icons in various visual styles.
 */
export const Brand = forwardRef<HTMLDivElement, BrandProps>(
  ({ type, variant = 'default', 'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.BRAND, ...rest }, ref) => {
    const styles = useStyleConfig('Brand');
    const { cdnUrl } = useConfig();
    const brandType = getBrandMap(cdnUrl)[type][variant];
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        __css={styles}
        as="img"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        src={brandType}
        alt={`${type} logo`}
        ref={ref}
        aria-label={`${type} brand`}
        data-component="Brand"
        {...getTestId()}
        {...rest}
      />
    );
  }
);

Brand.displayName = 'Brand';
