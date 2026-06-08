import type { Currency } from '@melio/penny-utils';
import { type CurrencyInputProps } from 'react-currency-input-field/src/components/CurrencyInputProps';

/**
 * @private For internal use only
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _CurrencyInputProps = CurrencyInputProps & {
  currency: Currency;
  currencySign: string;
  locale: string;
  decimalLimit?: number;
  integerLimit?: number;
  allowNegativeValue?: boolean;
};
