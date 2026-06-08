import { addMonths, flatten, isDateAfter, isDateBefore, isSameMonth } from '@melio/penny-utils';

import { type MonthType, type WeekType } from '../hooks';
import { createActiveMonth } from './createActiveMonth';
import { getDaysDictionary } from './getDaysDictionary';
import { getPartialWeeks, type GetPartialWeeksProperties } from './getPartialWeeks';

type FindClosestDateToFocusProps = GetPartialWeeksProperties & {
  date: Date;
  weeks: WeekType[];
  activeMonth: MonthType;
  focusedDate?: Date;
};

/**
 * isDateCanBeFocused - Checks if the target date is available to focus.
 * It will return true if the date is not disabled.
 */
const isDateCanBeFocused = ({ weeks, date }: { weeks: WeekType[]; date: Date }) => {
  const days = getDaysInMonth(weeks);
  const daysDictionary = getDaysDictionary(days);
  const isDisabled = daysDictionary[date.getTime()]?.isDisabled;
  return !isDisabled;
};

/**
 * getClosestDateInMonth - Returns the first available day in the month based on the target date, and if it's before or after the focused date.
 */
const getClosestDateInMonth = ({
  date,
  isBeforeFocusedDate,
  weeks,
}: {
  date: Date;
  isBeforeFocusedDate?: boolean;
  weeks: WeekType[];
}): Date | undefined => {
  const daysInMonth = getDaysInMonth(weeks);
  const filteredDays = isBeforeFocusedDate ? daysInMonth.slice().reverse() : daysInMonth;

  return filteredDays.find((day) => {
    const isInRange = isBeforeFocusedDate ? isDateBefore(day.date, date) : isDateAfter(day.date, date);
    return isInRange && !day.isDisabled;
  })?.date;
};

/**
 * getDaysInMonth - Returns the days in the month from the weeks.
 */
const getDaysInMonth = (weeks: WeekType[]) => flatten(weeks).filter((day) => day !== null);

/**
 * findClosestDateToFocus - Finds the next available day to focus based on the target date.
 * In case the target is before or after the min/max date, it will return undefined.
 * otherwise, it will iterate through the months to find the next available date.
 */
export const findClosestDateToFocus = ({
  date,
  weeks,
  activeMonth,
  focusedDate,
  ...props
}: FindClosestDateToFocusProps): Date | undefined => {
  // If the date is before the min date or after the max date, it returns undefined.
  if (props.isBeforeMinDate(date) || props.isAfterMaxDate(date)) return;

  const isBeforeFocusedDate = focusedDate && isDateBefore(date, focusedDate);
  const nextActiveMonth = createActiveMonth(addMonths(activeMonth.date, isBeforeFocusedDate ? -1 : 1));

  // Search for the closest date in the current month
  const getClosestDateInCurrentMonth = () =>
    isDateCanBeFocused({ weeks, date })
      ? date
      : getClosestDateInMonth({
          date,
          weeks,
          isBeforeFocusedDate,
        });

  // Search for the closest date in the next month for edge cases when the current month doesn't have any available date to focus.
  const getClosestDateInNextMonth = () =>
    getClosestDateInMonth({
      date,
      weeks: getPartialWeeks({
        ...props,
        activeMonth: nextActiveMonth,
      }),
      isBeforeFocusedDate,
    });

  // Sets the closest date in the current month / next month to focus if the date is in the current month.
  const dateToFocus =
    isSameMonth(date, activeMonth.date) && (getClosestDateInCurrentMonth() ?? getClosestDateInNextMonth());

  // If the date is not found it will iterate through the months to find the next available date.
  return (
    dateToFocus ||
    findClosestDateToFocus({
      ...props,
      weeks: getPartialWeeks({
        ...props,
        activeMonth: nextActiveMonth,
      }),
      date,
      focusedDate,
      activeMonth: nextActiveMonth,
    })
  );
};
