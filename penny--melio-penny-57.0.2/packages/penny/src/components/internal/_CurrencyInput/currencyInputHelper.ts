import { type Currency } from '@melio/penny-utils';
import { isNil } from '@melio/penny-utils';

import { type _CurrencyInputProps } from './_CurrencyInput.types';

export const nonDecimalCurrencies: Currency[] = ['HUF', 'JPY', 'KRW', 'VND'];

export function getValidValue(
  value: _CurrencyInputProps['value'],
  integerLimit: number,
  decimalLimit: number,
  allowDecimals: boolean
) {
  if (isNil(value)) {
    return undefined;
  }

  const stringValue = String(value);
  const negative = stringValue.startsWith('-');
  const absoluteValue = negative ? stringValue.slice(1) : stringValue;
  const [integerPart = '', decimalPart = ''] = absoluteValue.split('.');
  const hasDecimal = allowDecimals && decimalLimit > 0 && (!!decimalPart || absoluteValue.endsWith('.'));
  const concatNumber = integerPart + decimalPart;

  const validIntegerPart = concatNumber.slice(0, Math.min(integerLimit, integerPart.length));
  const validDecimalPart = hasDecimal
    ? `.${concatNumber.slice(
        validIntegerPart.length,
        validIntegerPart.length + Math.min(decimalLimit, decimalPart.length)
      )}`
    : '';
  return `${negative ? '-' : ''}${validIntegerPart}${validDecimalPart}`;
}
