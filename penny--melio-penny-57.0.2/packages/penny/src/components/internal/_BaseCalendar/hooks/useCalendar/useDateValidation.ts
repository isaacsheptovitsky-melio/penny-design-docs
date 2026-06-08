import {
  getDay,
  isDateAfter,
  isDateBefore,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  useDateUtils,
} from '@melio/penny-utils';
import { useCallback } from 'react';

import { type DayOfWeek, type UseCalendarProps } from '../types';

export const useDateValidation = ({
  shouldDisableDate: shouldDisableDateProp,
  minDate,
  maxDate,
  weekDays,
}: Pick<UseCalendarProps, 'shouldDisableDate' | 'minDate' | 'maxDate' | 'weekDays'>) => {
  const { createDate } = useDateUtils();
  const wrap = (d: Date) => createDate(convertDateToStringRepresentation(d));
  const isYearBefore1901 = useCallback((date: Date) => (date ? date.getFullYear() < 1901 : false), []);

  const isBeforeMinDate = useCallback(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    (date: Date) => !!minDate && isDateBefore(wrap(date), wrap(minDate)),
    [minDate] // eslint-disable-line react-hooks/exhaustive-deps -- we want to avoid unnecessary re-renders caused by the `wrap` function
  );

  const isAfterMaxDate = useCallback(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    (date: Date) => !!maxDate && isDateAfter(wrap(date), wrap(maxDate)),
    [maxDate] // eslint-disable-line react-hooks/exhaustive-deps -- we want to avoid unnecessary re-renders caused by the `wrap` function
  );

  const shouldDisableDate = useCallback(
    (date: Date) => (shouldDisableDateProp ? shouldDisableDateProp(date) : false),
    [shouldDisableDateProp]
  );

  const isInWeekDays = useCallback(
    (date: Date) => !weekDays || weekDays.includes(getDay(date) as DayOfWeek),
    [weekDays]
  );

  return {
    isYearBefore1901,
    isBeforeMinDate,
    isAfterMaxDate,
    shouldDisableDate,
    isInWeekDays,
  };
};

export type DaysUtilitiesReturnType = ReturnType<typeof useDateValidation>;

// Utility functions //////////////////////////////////////////////////////////

// Strip time to local midnight
function stripTime(date: Date) {
  return setMilliseconds(setSeconds(setMinutes(setHours(date, 0), 0), 0), 0);
}

// Format local YYYY-MM-DD string without date-fns-tz
function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// XXX hack to get around payment intent expects the dates to be YYYY-MM-DD and not a standard ISO date string
// https://meliorisk.atlassian.net/browse/ME-19758
function convertDateToStringRepresentation(date: Date) {
  return formatLocalDate(stripTime(date));
}
