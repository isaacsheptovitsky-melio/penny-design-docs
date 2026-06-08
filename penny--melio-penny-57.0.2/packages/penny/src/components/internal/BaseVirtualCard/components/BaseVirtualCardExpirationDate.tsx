import { useTestId } from '@melio/penny-utils';
import { type ReactNode, useMemo } from 'react';

import { BaseVirtualCardDetails, type BaseVirtualCardDetailsProps } from './BaseVirtualCardDetails';
import { type Month, type Year } from './types';

type DetailsType = { showDetails?: boolean; label?: string } & (
  | {
      month: Month;
      year: Year;
      children?: never;
    }
  | {
      month?: never;
      year?: never;
      children?: ReactNode;
    }
);

export type BaseVirtualCardExpirationDateProps = Omit<
  BaseVirtualCardDetailsProps,
  'label' | 'mainLabel' | 'enableCopy' | 'dataDogPrivacy'
> &
  DetailsType;

export const BaseVirtualCardExpirationDate = ({
  month,
  year,
  label = 'Expiry date',
  showDetails = true,
  onCopy,
  'data-testid': dataTestId = 'expiration-date',
  children,
  ...props
}: BaseVirtualCardExpirationDateProps) => {
  const expirationDateToView = useMemo(() => {
    if (!month || !year) return;
    const expirationDate = `${month}/${year}`;
    return showDetails ? expirationDate : expirationDate.replace(/\d/g, '•');
  }, [month, year, showDetails]);

  const getTestId = useTestId(dataTestId);

  return (
    <BaseVirtualCardDetails
      data-component="BaseVirtualCardExpirationDate"
      mainLabel={children ?? expirationDateToView}
      label={label}
      onCopy={!children && showDetails ? onCopy : undefined}
      enableCopy={showDetails}
      {...getTestId()}
      {...props}
    />
  );
};

BaseVirtualCardExpirationDate.displayName = 'BaseVirtualCardExpirationDate';
