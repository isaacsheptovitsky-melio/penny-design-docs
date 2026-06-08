import { useIntl } from '../../i18n';
import { differenceInCalendarDays } from '../differenceInCalendarDays';
import { fromZonedTime } from '../fromZonedTime';
import { isEqualDates } from '../isEqualDates';
import { parseDateISO } from '../parseDateISO';

export const useDateUtils = () => {
  const { timeZone, locale } = useIntl();

  // eslint-disable-next-line no-restricted-syntax
  const createDate = (dateStr?: string) => fromZonedTime(dateStr ? parseDateISO(dateStr) : new Date(), timeZone);

  const isValidScheduledDate = (scheduledDate: Date | string) => {
    const daysAfterToday = differenceInCalendarDays(
      typeof scheduledDate === 'string' ? parseDateISO(scheduledDate) : scheduledDate,
      createDate()
    );
    return daysAfterToday >= 0;
  };

  const convertToDate = (date: Date | number | string) => (typeof date === 'string' ? createDate(date) : date);
  const isEqualDate = (dateLeft: Date | number | string, dateRight: Date | number | string) =>
    isEqualDates(convertToDate(dateLeft), convertToDate(dateRight));

  const isDatePartEqual = (dateLeft: Date, dateRight: Date) =>
    dateLeft.toLocaleDateString(locale, { timeZone }) === dateRight.toLocaleDateString(locale, { timeZone });

  return {
    createDate,
    isValidScheduledDate,
    isEqualDate,
    isDatePartEqual,
  };
};
