import { formatDate } from './formatDate';
import { formatInTimeZone } from './formatInTimeZone';
import { toDate } from './toDate';
import { DateTimeFormatOptions, DateType, DEFAULT_DATE_TIME_FORMAT } from './types';

export function formatDateTime(date: DateType | undefined | null, options?: DateTimeFormatOptions) {
  if (!date) return '';

  const { format = DEFAULT_DATE_TIME_FORMAT, timeZone } = options ?? {};
  const _date = toDate(date);

  // format in local time zone
  if (!timeZone) {
    return formatDate(_date, format);
  }

  return formatInTimeZone(_date, timeZone, format);
}
