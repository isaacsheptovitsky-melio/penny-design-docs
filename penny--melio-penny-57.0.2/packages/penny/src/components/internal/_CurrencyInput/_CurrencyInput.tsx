import { forwardRef, type RefObject } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { type _CurrencyInputProps } from './_CurrencyInput.types';
import { getValidValue, nonDecimalCurrencies } from './currencyInputHelper';

/**
 * @private For internal use only
 */
export const _CurrencyInput = forwardRef<'input', _CurrencyInputProps>(
  (
    {
      value,
      onValueChange,
      currency,
      currencySign,
      integerLimit = 8,
      decimalLimit: decimalLimitProp = 2,
      allowDecimals: allowDecimalsProp = true,
      allowNegativeValue = true,
      locale,
      placeholder,
      ...props
    },
    ref
  ) => {
    const isNonDecimalCurrency = nonDecimalCurrencies.includes(currency);
    const allowDecimals = isNonDecimalCurrency ? false : allowDecimalsProp;
    const decimalLimit = isNonDecimalCurrency ? 0 : decimalLimitProp;
    const nonDecimalProps = {
      decimalScale: undefined,
      decimalSeparator: undefined,
      fixedDecimalLength: undefined,
      decimalLimit,
      allowDecimals,
    };
    const intlConfig = { locale, currency };

    const handleChange = (value: string | undefined) => {
      const validValue = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
      onValueChange?.(validValue);
    };

    return (
      <CurrencyInput
        {...props}
        transformRawValue={(rawValue) => (allowNegativeValue ? rawValue : rawValue.replace('-', ''))}
        ref={ref as RefObject<HTMLInputElement>}
        value={getValidValue(value, integerLimit, decimalLimit, allowDecimals)}
        prefix={currencySign}
        intlConfig={intlConfig}
        allowNegativeValue={allowNegativeValue}
        onValueChange={handleChange}
        decimalsLimit={decimalLimit}
        placeholder={placeholder}
        allowDecimals={allowDecimals}
        {...(isNonDecimalCurrency && nonDecimalProps)}
      />
    );
  }
);

_CurrencyInput.displayName = '_CurrencyInput';
