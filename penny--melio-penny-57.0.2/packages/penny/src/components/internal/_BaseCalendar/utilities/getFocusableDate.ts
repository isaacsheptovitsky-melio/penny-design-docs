import { isDateAfter, isDateBefore } from '@melio/penny-utils';

import { type DayType } from '../hooks';

/**
 * getFocusableDate - is  used for accessibility purposes.
 *
 * Returns the first enabled focusable day in the month. It used to set the correct tabbable day option when the month is changed.
 *
 * - If there's a selected date - it will be the focusable day.
 * - Otherwise, if there's a secondary selected date - it will be the focusable day.
 * - Otherwise, it returns the first / last enabled day in the month based to the next/prev navigation (the following month will have the first day as the focusable day, and the previous month - the last day).
 */
export const getFocusableDate = (days: DayType[], monthsToAdd: number = 0): Date | undefined => {
  const selectedDay = days.find((day: DayType | null) => day?.isSelected);
  const secondarySelectedDay = days.find((day: DayType | null) => day?.isSecondarySelectedDate);
  const focusableSelected = selectedDay || secondarySelectedDay;

  const firstFocusableDayInMonth = days.find(
    (day) =>
      day && (focusableSelected ? isDateAfter(day?.date, focusableSelected.date) && !day?.isDisabled : !day?.isDisabled)
  );
  const lastFocusableDayInMonth = days
    .reverse()
    .find(
      (day) =>
        day &&
        (focusableSelected ? isDateBefore(day?.date, focusableSelected.date) && !day?.isDisabled : !day?.isDisabled)
    );

  const defaultFocusableDay = monthsToAdd < 0 ? lastFocusableDayInMonth : firstFocusableDayInMonth;

  return focusableSelected && !focusableSelected.isDisabled ? focusableSelected?.date : defaultFocusableDay?.date;
};
