import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Group, type GroupProps } from '@/components/containers/Group';
import { BaseVirtualCard, type BaseVirtualCardProps } from '@/components/internal/BaseVirtualCard';
import type { BaseVirtualCardCardNumberProps } from '@/components/internal/BaseVirtualCard/components/BaseVirtualCardCardNumber';
import { BaseVirtualCardCardNumber } from '@/components/internal/BaseVirtualCard/components/BaseVirtualCardCardNumber';
import type { BaseVirtualCardCvvNumberProps } from '@/components/internal/BaseVirtualCard/components/BaseVirtualCardCvvNumber';
import { BaseVirtualCardCvvNumber } from '@/components/internal/BaseVirtualCard/components/BaseVirtualCardCvvNumber';
import type { BaseVirtualCardExpirationDateProps } from '@/components/internal/BaseVirtualCard/components/BaseVirtualCardExpirationDate';
import { BaseVirtualCardExpirationDate } from '@/components/internal/BaseVirtualCard/components/BaseVirtualCardExpirationDate';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpointValue } from '@/theme/hooks/useBreakpointValue';
import { type BrandSymbolKey } from '@/theme/icons/brandSymbol.generated.types';

import { Brand, type BrandProps } from '../Brand';
import { BrandSymbol, type BrandSymbolProps } from '../BrandSymbol';
import { Currency, type CurrencyProps } from '../Currency';

export type VirtualCardProps = BaseVirtualCardProps & {
  /**
   * The value of the currency.
   */
  amount: CurrencyProps['value'];
  /**
   * Determines if the card details is visible or not.
   * @default true
   */
  showDetails?: boolean;
  /**
   * Props for the brand symbol component displayed on the card.
   */
  brandSymbolProps: { type: BrandSymbolKey; variant?: BrandSymbolProps['variant'] };
  /**
   * The type of the brand displayed on the card.
   */
  brandType: BrandProps['type'];
  /**
   * The card number details to display.
   */
  cardNumberProps: BaseVirtualCardCardNumberProps;
  /**
   * The CVV details to display.
   */
  cvvNumberProps: BaseVirtualCardCvvNumberProps;
  /**
   * The expiration date details to display.
   */
  expirationDateProps: BaseVirtualCardExpirationDateProps;
};

/**
 * VirtualCard component displays payment card information in a visually appealing card format.
 */
export const VirtualCard = forwardRef<HTMLDivElement, VirtualCardProps>(
  (
    {
      variant,
      amount,
      showDetails,
      brandSymbolProps,
      brandType,
      cardNumberProps,
      cvvNumberProps,
      expirationDateProps,
      'data-testid': dataTestId = 'virtual-card',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('VirtualCard', {});
    const cardDetailsVariant = variant !== 'white' ? 'inverse' : 'default';
    const brandVariant = variant !== 'white' ? 'inverse' : 'neutral';
    const spacing = useBreakpointValue<GroupProps['spacing']>({ xs: 'xxs', s: 's' });
    const getTestId = useTestId(dataTestId);

    return (
      <BaseVirtualCard data-component="VirtualCard" ref={ref} {...getTestId()} {...props} variant={variant}>
        <Group variant="vertical" height="full" justifyContent="space-evenly" spacing={spacing}>
          <Group justifyContent="space-between" alignItems="center">
            <Currency value={amount} variant={cardDetailsVariant} />
            <BrandSymbol {...brandSymbolProps} size="extra-large" />
          </Group>
          <BaseVirtualCardCardNumber
            {...cardNumberProps}
            showDetails={showDetails}
            variant={cardDetailsVariant}
            {...getTestId('card-number')}
          />
          <Group justifyContent="space-between" alignItems="flex-end">
            <Group spacing="m">
              <BaseVirtualCardExpirationDate
                {...expirationDateProps}
                showDetails={showDetails}
                variant={cardDetailsVariant}
                {...getTestId('expiration-date')}
              />
              <BaseVirtualCardCvvNumber
                {...cvvNumberProps}
                showDetails={showDetails}
                variant={cardDetailsVariant}
                {...getTestId('cvv-number')}
              />
            </Group>
            <Box __css={styles['brand']}>
              <Brand type={brandType} variant={brandVariant} />
            </Box>
          </Group>
        </Group>
      </BaseVirtualCard>
    );
  }
);

VirtualCard.displayName = 'VirtualCard';
