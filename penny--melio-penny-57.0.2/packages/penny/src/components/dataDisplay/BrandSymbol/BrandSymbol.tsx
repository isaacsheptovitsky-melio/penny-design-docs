import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';
import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { getBrandSymbolsMap } from '@/theme/icons/brandSymbol.generated';
import { useConfig } from '@/theme/providers/ConfigProvider';

import type { BrandSymbolProps } from './BrandSymbol.types';

/**
 * The `BrandSymbol` is a compact logo used to represent companies, banks, payment methods, and platforms in limited space.
 */
export const BrandSymbol = forwardRef<HTMLDivElement, BrandSymbolProps>(
  (
    {
      type,
      size = 'medium',
      isDisabled,
      isReadOnly,
      variant = 'default',
      'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.BRAND_SYMBOL,
      ...props
    },
    ref
  ) => {
    const styles = useStyleConfig('BrandSymbol', { size, ...props });
    const { cdnUrl } = useConfig();
    const brandSymbolType = getBrandSymbolsMap(cdnUrl)[type][variant];
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        __css={styles}
        as="img"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        src={brandSymbolType}
        alt={`${type} logo`}
        data-disabled={isDisabled || null}
        data-readonly={isReadOnly || null}
        ref={ref}
        aria-label={`${type} brand symbol`}
        data-component="BrandSymbol"
        {...getTestId()}
        {...props}
      />
    );
  }
);

BrandSymbol.displayName = 'BrandSymbol';
