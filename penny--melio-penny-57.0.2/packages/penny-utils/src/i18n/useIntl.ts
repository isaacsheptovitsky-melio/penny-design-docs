import { useCallback } from 'react';
import { FormatNumberOptions, useIntl as useReactIntl } from 'react-intl';

export type Currency = string;

type AllOrNone<T> = Required<T> | { [P in keyof T]?: never };
type AllOrNonePartial<T, F extends keyof T> = Omit<T, F> & AllOrNone<Pick<T, F>>;
export type ValidatedFormatNumberOptions = AllOrNonePartial<
  FormatNumberOptions,
  'maximumFractionDigits' | 'minimumFractionDigits'
>;

type FormatCurrency = (amount: number, currency?: Currency, options?: ValidatedFormatNumberOptions) => string;

export const useIntl = () => {
  const intl = useReactIntl();

  const { timeZone, locale } = intl;

  const formatCurrency = useCallback<FormatCurrency>(
    (amount, currency = 'USD', options) =>
      intl.formatNumber(amount, { ...options, style: 'currency', currencyDisplay: 'narrowSymbol', currency }),
    [intl]
  );

  const formatDate = (...args: Parameters<typeof intl.formatDate>) => intl.formatDate(...args);
  const formatDateTimeRange = (...args: Parameters<typeof intl.formatDateTimeRange>) =>
    intl.formatDateTimeRange(...args);
  const formatNumberToParts = (...args: Parameters<typeof intl.formatNumberToParts>) =>
    intl.formatNumberToParts(...args);

  return {
    locale,
    timeZone: timeZone as string,
    formatCurrency,
    formatDate,
    formatDateTimeRange,
    formatNumberToParts,
  };
};
