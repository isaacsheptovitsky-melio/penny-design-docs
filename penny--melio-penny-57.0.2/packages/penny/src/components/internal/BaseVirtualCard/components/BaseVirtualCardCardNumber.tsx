import { useTestId } from '@melio/penny-utils';
import { type ReactNode, useMemo } from 'react';

import { BaseVirtualCardDetails, type BaseVirtualCardDetailsProps } from './BaseVirtualCardDetails';

type DetailsType = { showDetails?: boolean; label?: string } & (
  | {
      cardNumber: string | number;
      children?: never;
    }
  | {
      cardNumber?: never;
      children?: ReactNode;
    }
);

export type BaseVirtualCardCardNumberProps = Omit<
  BaseVirtualCardDetailsProps,
  'label' | 'mainLabel' | 'enableCopy' | 'dataDogPrivacy'
> &
  DetailsType;

export const BaseVirtualCardCardNumber = ({
  cardNumber,
  label = 'Card Number',
  showDetails = true,
  onCopy,
  'data-testid': dataTestId = 'card-number',
  children,
  ...props
}: BaseVirtualCardCardNumberProps) => {
  const cardNumberToView = useMemo(() => {
    if (!cardNumber) return;
    const cardNumberStringWithoutSpaces = cardNumber.toString().replace(/\s/g, '');
    const visibleChars = Math.min(cardNumberStringWithoutSpaces.length, 4);
    const maskedPart = '•'.repeat(cardNumberStringWithoutSpaces.length - visibleChars);
    const visiblePart = cardNumberStringWithoutSpaces.slice(-visibleChars);
    const cardNumberToParsing = showDetails ? cardNumberStringWithoutSpaces : maskedPart + visiblePart;

    return cardNumberToParsing.replace(/(.{4})/g, '$1 ');
  }, [cardNumber, showDetails]);

  const getTestId = useTestId(dataTestId);

  return (
    <BaseVirtualCardDetails
      data-component="BaseVirtualCardCardNumber"
      mainLabel={children ?? cardNumberToView}
      label={label}
      onCopy={!children && showDetails ? onCopy : undefined}
      enableCopy={showDetails}
      dataDogPrivacy="mask"
      {...getTestId()}
      {...props}
    />
  );
};

BaseVirtualCardCardNumber.displayName = 'BaseVirtualCardCardNumber';
