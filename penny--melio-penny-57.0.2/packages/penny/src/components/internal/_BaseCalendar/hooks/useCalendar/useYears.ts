import { createDate, eachMonthOfInterval, useIntl } from '@melio/penny-utils';
import { useCallback } from 'react';

import { createActiveMonth } from '../../utilities/createActiveMonth';
import { getPartialWeeks, type GetPartialWeeksProperties } from '../../utilities/getPartialWeeks';
import { type MonthSelectionType, type UseCalendarProps } from '../types';
import { useDateValidation } from './useDateValidation';

export type YearSelectionType = {
  year: number;
  months: MonthSelectionType[];
  isDisabled: boolean;
};

export type UseYearsReturnType = { [key: number]: YearSelectionType };

const isMonthDisabled = (props: GetPartialWeeksProperties) => {
  const isBeforeMinDate = props.isBeforeMinDate(props.activeMonth.date);
  const isAfterMaxDate = props.isAfterMaxDate(props.activeMonth.date);

  if (isBeforeMinDate || isAfterMaxDate) {
    const monthWeeks = getPartialWeeks(props);
    const areAllWeeksDisabled = monthWeeks.every((week) => week.every((day) => day === null || day?.isDisabled));

    return areAllWeeksDisabled;
  }

  return false;
};

export const useYears = ({
  shouldDisableDate: shouldDisableDateProp,
  minDate,
  maxDate,
  weekDays,
  yearsRange = 100,
  ...props
}: UseCalendarProps): UseYearsReturnType => {
  const { formatDate } = useIntl();
  const today = createDate();
  const mainDate = createActiveMonth(props.selectedDate ?? today);

  const minDateRange = minDate ? mainDate.year - createActiveMonth(minDate).year : yearsRange;
  // The range of years is an absolute value because it can be negative)
  const maxDateRange = maxDate ? Math.abs(mainDate.year - createActiveMonth(maxDate).year) : yearsRange;

  const { isYearBefore1901, isBeforeMinDate, isAfterMaxDate, isInWeekDays, shouldDisableDate } = useDateValidation({
    shouldDisableDate: shouldDisableDateProp,
    minDate,
    maxDate,
    weekDays,
  });

  const getMonthsOfYear = useCallback(
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    (year: number) => {
      const monthsArray = eachMonthOfInterval({
        start: createDate(`${year}-01-01`), // January 1st
        end: createDate(`${year}-12-31`), // December 31st
      });

      // Format each month to get the month selection type
      return monthsArray.map((m) => ({
        date: m,
        label: formatDate(createActiveMonth(m).date, { month: 'short' }),
        fullLabel: formatDate(createActiveMonth(m).date, { month: 'long' }),
        isDisabled: isMonthDisabled({
          activeMonth: createActiveMonth(m),
          ...props,
          isBeforeMinDate,
          isAfterMaxDate,
          isInWeekDays,
          isYearBefore1901,
          shouldDisableDate,
        }),
      }));
    },
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    [formatDate, props, isBeforeMinDate, isAfterMaxDate, isInWeekDays, isYearBefore1901, shouldDisableDate]
  );
  const getYearData = (year: number) => {
    const months = getMonthsOfYear(year);
    return {
      year,
      months,
      isDisabled: months.every((m) => m.isDisabled),
    } as YearSelectionType;
  };

  const getYearsRange = (middleYear: number) => {
    const yearsBefore = Array.from({ length: minDateRange }, (_, index) =>
      getYearData(middleYear - minDateRange + index)
    );
    const yearsAfter = Array.from({ length: maxDateRange }, (_, index) => getYearData(middleYear + 1 + index));

    return [...yearsBefore, getYearData(middleYear), ...yearsAfter];
  };

  const getYears = (middleYear: number) => {
    const years = getYearsRange(middleYear);
    return years.reduce((acc, yearObj) => {
      acc[Number(yearObj.year)] = yearObj;
      return acc;
    }, {} as UseYearsReturnType);
  };

  return getYears(mainDate.year);
};
