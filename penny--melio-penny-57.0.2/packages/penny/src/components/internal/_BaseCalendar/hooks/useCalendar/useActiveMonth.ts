import { isSameMonth, useDateUtils } from '@melio/penny-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { createActiveMonth, findClosestDateToFocus, getFocusableDate } from '../../utilities';
import { getNextAvailableDay } from '../../utilities/getNextAvailableDay';
import { type DayType, type MonthType, type UseCalendarProps } from '../types';
import { useDateValidation } from './useDateValidation';
import { useMonth } from './useMonth';

export const useActiveMonth = (props: UseCalendarProps) => {
  const { createDate } = useDateUtils();
  const { isYearBefore1901, isBeforeMinDate, isAfterMaxDate, isInWeekDays, shouldDisableDate } = useDateValidation({
    shouldDisableDate: props.shouldDisableDate,
    minDate: props.minDate,
    maxDate: props.maxDate,
    weekDays: props.weekDays,
  });

  const today = createDate();

  const [activeMonth, setActiveMonth] = useState<MonthType>(createActiveMonth(props.selectedDate ?? today));
  const [focusableDate, setFocusableDate] = useState<Date | undefined>(undefined);
  const [focusedDate, setFocusedDate] = useState<Date | undefined>(undefined);

  const { minDate, secondarySelectedDate, selectedDate } = props;

  const sharedPropsToGetPartialWeeks = useMemo(
    () => ({
      selectedDate,
      secondarySelectedDate,
      isBeforeMinDate,
      isAfterMaxDate,
      isInWeekDays,
      isYearBefore1901,
      shouldDisableDate,
    }),
    [
      isAfterMaxDate,
      isBeforeMinDate,
      isInWeekDays,
      secondarySelectedDate,
      selectedDate,
      isYearBefore1901,
      shouldDisableDate,
    ]
  );

  const setAvailableActiveMonth = useCallback(() => {
    if (!minDate) return;
    if (!selectedDate) return;
    if (selectedDate >= minDate) return;

    const nextAvailableDay = getNextAvailableDay({
      ...sharedPropsToGetPartialWeeks,
      activeMonth: createActiveMonth(minDate), // save iterations by setting the `minDate` instead of checking all months from `activeMonth`.
    });

    if (nextAvailableDay) {
      setActiveMonth(createActiveMonth(nextAvailableDay.date));
    }
  }, [minDate, selectedDate, sharedPropsToGetPartialWeeks]);

  useEffect(() => {
    setAvailableActiveMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we want to run this only on mount
  }, []);

  const { month: weeks } = useMonth({
    activeMonth,
    ...props,
    onSelect: (date) => {
      props.onSelect(date);
      setActiveMonth(createActiveMonth(date));
      setFocusableDate(date);
    },
  });

  const defaultFocusableDay = useMemo(() => getFocusableDate(weeks.flat() as DayType[]), [weeks]);

  const getClosestDateToFocus = useCallback(
    (date: Date) => {
      const dateToFocus = findClosestDateToFocus({
        ...sharedPropsToGetPartialWeeks,
        activeMonth,
        focusedDate,
        date,
        weeks,
      });

      if (dateToFocus && activeMonth && !isSameMonth(dateToFocus, activeMonth.date)) {
        setActiveMonth(createActiveMonth(dateToFocus));
        // it is important to set the focusable date after changing the active month.
        setFocusableDate(dateToFocus);
      }
      if (dateToFocus) {
        setFocusedDate(dateToFocus);
      }
    },
    [sharedPropsToGetPartialWeeks, focusedDate, weeks, activeMonth]
  );

  return {
    today,
    weeks,
    activeMonth,
    defaultFocusableDay,
    setActiveMonth,
    focusableDate: focusableDate ?? defaultFocusableDay,
    setFocusableDate,
    focusedDate,
    setFocusedDate,
    getClosestDateToFocus,
  };
};
