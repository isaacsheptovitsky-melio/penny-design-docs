import { getNowDate, isSameDay } from './helpers';
import { DateTimeOptions, DateType } from './types';

export function isToday(date: DateType, options?: DateTimeOptions) {
  const nowDate = getNowDate();
  return isSameDay(date, nowDate, options?.timeZone);
}
