import { getWeek, getWeeksInMonth, isSameDay, isSameMonth, setDate, setDay, setWeek } from '@melio/penny-utils';

import { type DayType, type MonthType, type UseCalendarProps, type WeekType } from '../hooks/types';
import { type DaysUtilitiesReturnType } from '../hooks/useCalendar/useDateValidation';

export type GetPartialWeeksProperties = Pick<UseCalendarProps, 'secondarySelectedDate' | 'selectedDate'> &
  DaysUtilitiesReturnType & {
    activeMonth: MonthType;
  };

export const getPartialWeeks = ({
  activeMonth,
  secondarySelectedDate,
  selectedDate,
  isBeforeMinDate,
  isAfterMaxDate,
  isInWeekDays,
  shouldDisableDate,
}: GetPartialWeeksProperties) => {
  const dayInMonth = setDate(activeMonth.date, 1);
  const numWeeks = getWeeksInMonth(dayInMonth);
  const weeks: WeekType[] = [];
  const diff = getWeek(dayInMonth);

  for (let i = 0; i < numWeeks; i++) {
    if (!weeks[i]) weeks[i] = [];

    const week = weeks[i] as (Partial<DayType> | null)[];
    const weekDay = setWeek(dayInMonth, diff + i);

    for (let j = 0; j < 7; j++) {
      const day = setDay(weekDay, j);

      if (isSameMonth(dayInMonth, day)) {
        week.push({
          isDisabled: isBeforeMinDate(day) || !isInWeekDays(day) || isAfterMaxDate(day) || shouldDisableDate(day),
          isSecondarySelectedDate: !!secondarySelectedDate && isSameDay(secondarySelectedDate, day),
          isSelected: !!selectedDate && isSameDay(selectedDate, day),
          date: day,
        });
      } else {
        week.push(null);
      }
    }
  }

  return weeks;
};
