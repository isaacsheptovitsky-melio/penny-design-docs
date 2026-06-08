import { type Currency } from '@melio/penny-utils';
import { type ReactElement } from 'react';
import { type CurrencyInputProps } from 'react-currency-input-field';

import { type TextFieldProps } from '../TextField';

export type AmountFieldProps = Omit<TextFieldProps, 'defaultValue'> &
  Pick<CurrencyInputProps, 'allowNegativeValue' | 'decimalScale' | 'formatValueOnBlur'> & {
    /**
     * Value and placeholder alignment.
     */
    align?: TextFieldProps['align'];

    /**
     * Sets the currency type of the input.
     */
    currency: Currency;

    /**
     * Sets the currency sign (e.g., "$", "€", "฿").
     */
    currencySign: string;

    /**
     * Sets the locale for currency formatting (e.g., "en-US", "th-TH").
     */
    locale: string;

    /**
     * Sets the number of digits to allow before the decimal point.
     */
    integerLimit?: number;

    /**
     * Sets the number of digits to allow after the decimal point.
     */
    decimalLimit?: number;

    /**
     * An element that appears as a suffix of the input.
     */
    endElement?: ReactElement;
  };
