import { addDays } from './addDays';
import { getNowDate, isSameDay } from './helpers';
import { DateTimeOptions, DateType } from './types';

export function isTomorrow(date: DateType, options?: DateTimeOptions) {
  const nowDate = getNowDate();
  const tomorrowDate = addDays(nowDate, 1);
  return isSameDay(date, tomorrowDate, options?.timeZone);
}
