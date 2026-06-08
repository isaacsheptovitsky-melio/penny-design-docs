import { DateTimeFormatPart } from './formatDateRange.types';
import { formatDateTime } from './formatDateTime';
import { TimeZone } from './timeZone.types';
import { toDate } from './toDate';
import { DateTimeOptions, DateType } from './types';

export function formatDateRange(
  startDate: DateType | undefined | null,
  endDate: DateType | undefined | null,
  options?: DateTimeOptions
) {
  if (startDate == undefined || endDate == undefined) {
    return '';
  }

  const { timeZone } = options ?? {};
  const _startDate = toDate(startDate);
  const _endDate = toDate(endDate);

  const formatter = Intl.DateTimeFormat('en-US', { timeZone, dateStyle: 'medium' });
  const rangeParts = formatter.formatRangeToParts(_startDate, _endDate);
  return removeYearFromRangePartsWhenCurrent(rangeParts, timeZone)
    .map(({ value }) => value)
    .join('');
}

// We are using the built-in Intl capabilities that handles the different range cases - same day / month / years.
// It mentions the year when is the current year so we remove it.
function removeYearFromRangePartsWhenCurrent(rangeParts: DateTimeFormatPart[], timeZone: TimeZone | undefined) {
  const formattedNow = formatDateTime(Date.now(), { timeZone, format: 'MM/yyyy' });
  const currentYear = formattedNow.slice(3);

  const rangeYearList = rangeParts.filter(({ type }) => type === 'year');
  const sameAndCurrentYear = rangeYearList.length === 1 && rangeYearList[0]?.value === currentYear;
  return rangeParts.slice(0, sameAndCurrentYear ? -2 : undefined);
}
