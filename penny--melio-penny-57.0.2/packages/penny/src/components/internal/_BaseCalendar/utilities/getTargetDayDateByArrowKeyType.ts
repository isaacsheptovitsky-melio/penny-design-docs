import { addDays, addMonths, addYears, setHours, startOfWeek } from '@melio/penny-utils';

import { type ArrowKeyType, type DayOfWeek } from '../hooks';

/**
 * getTargetDayDateByArrowKeyType - A function that returns the target date based on the key pressed.
 *
 * It accepts an `ArrowKeyType` and a `Date` object and returns the target date.
 * The target date is calculated based on the key pressed based on: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#kbd_label
 */
export const getTargetDayDateByArrowKeyType = (key: ArrowKeyType, dayDate: Date, weekDays?: number[]) => {
  switch (key) {
    case 'ArrowUp':
      return addDays(dayDate, -7);
    case 'ArrowDown':
      return addDays(dayDate, 7);
    case 'ArrowLeft':
      return addDays(dayDate, -1);
    case 'ArrowRight':
      return addDays(dayDate, 1);
    case 'Home': {
      // get the date of the first day of the week
      const weekStartsOn = (weekDays?.[0] ?? 0) as DayOfWeek;
      // set the time to 12:00 PM
      return setHours(startOfWeek(dayDate, { weekStartsOn }), 12);
    }
    case 'End': {
      const weekEndsOn = weekDays?.[weekDays.length - 1] ?? 6;
      const daysToAdd = weekEndsOn - dayDate.getDay();
      // get the date of the last day of the week
      return addDays(dayDate, daysToAdd);
    }
    case 'PageUp':
      // get the same date in the following month
      return addMonths(dayDate, 1);
    case 'PageDown':
      // get the same date in the previous month
      return addMonths(dayDate, -1);
    case 'PageUp + Shift':
      // get the same date in the following year
      return addYears(dayDate, 1);
    case 'PageDown + Shift':
      // get the same date in the previous year
      return addYears(dayDate, -1);
    default:
      return;
  }
};
