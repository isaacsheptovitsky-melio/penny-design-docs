import { addMonths, isDateAfter, isDateBefore, useIntl } from '@melio/penny-utils';
import { useMemo } from 'react';

import { createActiveMonth, getFocusableDate } from '../../utilities';
import { type DayType, type WeekType } from '../types';
import { useWeeks, type UseWeeksProps } from './useWeeks';

export type UseMonthProps = UseWeeksProps & {
  monthsToAdd?: number;
  setFocusableDate?: (date?: Date) => void;
};

export type UseMonthReturnType = {
  month: WeekType[];
  hasMonth: boolean;
  monthLabels?: { short: string; full: string; year: number };
  goToMonth: VoidFunction;
};

export const useMonth = (props: UseMonthProps): UseMonthReturnType => {
  const { formatDate } = useIntl();
  const { monthsToAdd, activeMonth, minDate, maxDate } = props;
  const target = monthsToAdd ? addMonths(activeMonth.date, monthsToAdd) : activeMonth.date;
  const month = useWeeks({
    ...props,
    activeMonth: createActiveMonth(target),
    onSelect: (date: Date) => {
      props.onSelect(date);
      props.setFocusableDate?.(date);
    },
  });

  const hasEnabledDays = month.some((week) => week.some((day) => day && !day.isDisabled));

  const hasMonth = useMemo(() => {
    if (hasEnabledDays) return true;
    // Allow forward navigation if there's a minDate in the future
    if (monthsToAdd && monthsToAdd > 0 && minDate && isDateAfter(minDate, target)) return true;
    // Allow backward navigation if there's a maxDate in the past
    if (monthsToAdd && monthsToAdd < 0 && maxDate && isDateBefore(maxDate, target)) return true;
    return false;
  }, [hasEnabledDays, monthsToAdd, minDate, maxDate, target]);

  const focusableDate = useMemo(() => getFocusableDate(month.flat() as DayType[], monthsToAdd), [month, monthsToAdd]);

  const goToMonth = () => {
    if (hasMonth) props.onSelect(target);
    props.setFocusableDate?.(focusableDate);
  };

  const monthLabels = hasMonth
    ? {
        short: formatDate(target, { month: 'short' }),
        full: formatDate(target, { month: 'long' }),
        year: createActiveMonth(target).year,
      }
    : undefined;

  return {
    month,
    hasMonth,
    monthLabels,
    goToMonth,
  };
};
