import { formatDateTime } from './formatDateTime';
import { TimeZone } from './timeZone.types';
import { DateType } from './types';

export function getNowDate() {
  // eslint-disable-next-line no-restricted-syntax
  return new Date();
}

export function isSameDay(firstDate: DateType, secondDate: DateType, timeZone?: TimeZone) {
  const formattedFirst = formatDateTime(firstDate, { timeZone, format: 'MM/dd/yyyy' });
  const formattedSecond = formatDateTime(secondDate, { timeZone, format: 'MM/dd/yyyy' });

  return formattedFirst === formattedSecond;
}
