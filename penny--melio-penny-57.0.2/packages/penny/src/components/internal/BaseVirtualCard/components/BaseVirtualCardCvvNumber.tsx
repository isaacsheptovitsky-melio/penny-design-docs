import { useTestId } from '@melio/penny-utils';
import { type ReactNode, useMemo } from 'react';

import { BaseVirtualCardDetails, type BaseVirtualCardDetailsProps } from './BaseVirtualCardDetails';

type DetailsType = { showDetails?: boolean; label?: string } & (
  | {
      cvv: number | string;
      children?: never;
    }
  | {
      cvv?: never;
      children?: ReactNode;
    }
);

export type BaseVirtualCardCvvNumberProps = Omit<
  BaseVirtualCardDetailsProps,
  'label' | 'mainLabel' | 'enableCopy' | 'dataDogPrivacy'
> &
  DetailsType;

export const BaseVirtualCardCvvNumber = ({
  cvv,
  label = 'CVV',
  showDetails = true,
  onCopy,
  'data-testid': dataTestId = 'cvv-number',
  children,
  ...props
}: BaseVirtualCardCvvNumberProps) => {
  const cvvNumberToView = useMemo(() => {
    if (!cvv) return;
    const cvvNumber = cvv.toString();
    return showDetails ? cvvNumber : cvvNumber.replace(/\d/g, '•');
  }, [cvv, showDetails]);

  const getTestId = useTestId(dataTestId);

  return (
    <BaseVirtualCardDetails
      data-component="BaseVirtualCardCvvNumber"
      mainLabel={children ?? cvvNumberToView}
      label={label}
      onCopy={!children && showDetails ? onCopy : undefined}
      enableCopy={showDetails}
      dataDogPrivacy="mask"
      {...getTestId()}
      {...props}
    />
  );
};

BaseVirtualCardCvvNumber.displayName = 'BaseVirtualCardCvvNumber';
