import { useIntl } from '@melio/penny-utils';
import { useMemo } from 'react';

import { getPartialWeeks } from '../../utilities/getPartialWeeks';
import { type MonthType, type UseCalendarProps } from '../types';
import { useDateValidation } from './useDateValidation';

export type UseWeeksProps = UseCalendarProps & {
  activeMonth: MonthType;
};

export const useWeeks = ({
  activeMonth,
  shouldDisableDate: shouldDisableDateProp,
  minDate,
  maxDate,
  weekDays,
  secondarySelectedDate,
  selectedDate,
  onSelect,
}: UseWeeksProps) => {
  const { formatDate } = useIntl();
  const { isBeforeMinDate, isAfterMaxDate, isInWeekDays, isYearBefore1901, shouldDisableDate } = useDateValidation({
    shouldDisableDate: shouldDisableDateProp,
    minDate,
    maxDate,
    weekDays,
  });

  return useMemo(
    () =>
      getPartialWeeks({
        activeMonth,
        secondarySelectedDate,
        selectedDate,
        isBeforeMinDate,
        isAfterMaxDate,
        isInWeekDays,
        isYearBefore1901,
        shouldDisableDate,
      }).map((week) =>
        week.map((day) =>
          day ? { ...day, label: formatDate(day.date, { day: 'numeric' }), selectDay: () => onSelect(day.date) } : day
        )
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we want to avoid unnecessary re-renders caused by the `formatDate` function
    [
      activeMonth,
      secondarySelectedDate,
      isAfterMaxDate,
      isBeforeMinDate,
      isInWeekDays,
      shouldDisableDate,
      onSelect,
      selectedDate,
    ]
  );
};
