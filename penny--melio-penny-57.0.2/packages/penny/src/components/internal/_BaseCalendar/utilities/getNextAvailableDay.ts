import { addMonths, flatten } from '@melio/penny-utils';

import { type DaysUtilitiesReturnType, type DayType, type MonthType, type UseCalendarProps } from '../hooks';
import { createActiveMonth } from './createActiveMonth';
import { getPartialWeeks } from './getPartialWeeks';

export type GetNextAvailableDayProperties = Pick<UseCalendarProps, 'secondarySelectedDate' | 'selectedDate'> & {
  activeMonth: MonthType;
} & DaysUtilitiesReturnType;

export const getNextAvailableDay = ({
  selectedDate,
  activeMonth,
  ...partialWeeksProps
}: GetNextAvailableDayProperties): DayType | null | undefined => {
  const weeks = getPartialWeeks({ selectedDate, activeMonth, ...partialWeeksProps });
  const days = flatten(weeks);
  const availableDay = days.find((day) => (day ? !day?.isDisabled : undefined));

  return (
    availableDay ??
    getNextAvailableDay({
      selectedDate,
      ...partialWeeksProps,
      activeMonth: createActiveMonth(addMonths(activeMonth.date, 1)),
    })
  );
};
