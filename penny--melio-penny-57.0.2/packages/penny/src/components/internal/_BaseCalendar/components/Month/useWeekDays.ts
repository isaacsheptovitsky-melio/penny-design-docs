import { setDay, useIntl } from '@melio/penny-utils';
import { useMemo } from 'react';

export const useWeekDays = () => {
  const { locale } = useIntl();
  const getWeekDay = (_: unknown, i: number) => {
    // eslint-disable-next-line no-restricted-syntax
    const weekDay = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(setDay(new Date(), i));
    // eslint-disable-next-line no-restricted-syntax
    const weekDayLong = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(setDay(new Date(), i));
    // XXX display two letters day name for english
    return {
      label: locale.startsWith('en') ? weekDay.substring(0, 2) : weekDay,
      fullLabel: weekDayLong,
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => Array.from({ length: 7 }).map(getWeekDay), []);
};
