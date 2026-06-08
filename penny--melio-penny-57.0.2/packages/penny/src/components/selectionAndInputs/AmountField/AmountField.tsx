import { useIntl } from '@melio/penny-utils';
import { type ChangeEvent, forwardRef } from 'react';
import { formatValue } from 'react-currency-input-field';

import { _CurrencyInput } from '@/components/internal/_CurrencyInput';

import { TextField } from '../TextField';
import { type AmountFieldProps } from './AmountField.types';

/**
 * The Amount Field component is an input field designed for entering monetary values in different currencies.
 * It supports left and right text alignment and can include an optional End Element, typically used for currency selection.
 */
export const AmountField = forwardRef<HTMLInputElement, AmountFieldProps>(
  (
    {
      value: valueProp,
      currency,
      currencySign,
      locale,
      placeholder,
      size = 'large',
      onChange,
      allowNegativeValue = true,
      align = 'start',
      endElement,
      isViewMode,
      decimalScale,
      'data-testid': dataTestId = 'amount-field',
      ...inputProps
    },
    ref
  ) => {
    const { formatCurrency } = useIntl();

    const viewModeValue = formatValue({
      value: valueProp?.toString(),
      intlConfig: { locale, currency },
      decimalScale,
    });
    const value = isViewMode ? viewModeValue : valueProp;

    const localPlaceholder = placeholder ?? formatCurrency(0, currency, { currencyDisplay: 'code' });

    return (
      <TextField
        data-component="AmountField"
        ref={ref}
        as={_CurrencyInput}
        data-testid={dataTestId}
        {...inputProps}
        value={value}
        align={align}
        allowNegativeValue={allowNegativeValue}
        placeholder={localPlaceholder}
        size={size}
        rightElement={endElement}
        currency={currency}
        currencySign={currencySign}
        locale={locale}
        onValueChange={(value: string | undefined) => {
          onChange?.({ target: { value: value ?? '' } } as ChangeEvent<HTMLInputElement>);
        }}
        isViewMode={isViewMode}
        decimalScale={decimalScale}
      />
    );
  }
);

AmountField.displayName = 'AmountField';
