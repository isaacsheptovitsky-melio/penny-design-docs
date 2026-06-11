import type { Currency, TestIdProp } from '@melio/penny-utils';

/**
 * Size options for currency display
 */
export type CurrencySize = 'large' | 'small';

/**
 * Variant options for currency color theme
 */
export type CurrencyVariant = 'default' | 'inverse';

export type CurrencyProps = {
  /**
   * The value of the currency.
   */
  value: number;

  /**
   * Determines the size of the currency text.
   * @default 'small'
   */
  size?: CurrencySize;

  /**
   * Determines the color of the currency text.
   * @default 'default'
   */
  variant?: CurrencyVariant;

  /**
   * Sets the currency type of the input.
   * @default 'USD'
   */
  currency?: Currency;
} & TestIdProp;
