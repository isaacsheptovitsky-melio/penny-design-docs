import { useTestId } from '@melio/penny-utils';
import { useState } from 'react';

import { createActiveMonth } from '../../utilities';
import { type UseCalendarProps } from '../types';
import { useActiveMonth } from './useActiveMonth';
import { useMonth } from './useMonth';
import { useYears } from './useYears';

export const useCalendar = ({ 'data-testid': dataTestId = 'base-calendar', ...props }: UseCalendarProps) => {
  const {
    weeks,
    activeMonth,
    setActiveMonth: _setActiveMonth,
    focusableDate,
    setFocusableDate,
    focusedDate,
    setFocusedDate,
    getClosestDateToFocus,
  } = useActiveMonth(props);
  const [showYearSelection, setShowYearSelection] = useState(false);
  const getTestId = useTestId(dataTestId);

  const setActiveMonth = (date: Date) => {
    _setActiveMonth(createActiveMonth(date));
  };

  const {
    hasMonth: hasPreviousMonth,
    monthLabels: previousMonthLabels,
    goToMonth: goToPreviousMonth,
  } = useMonth({
    ...props,
    monthsToAdd: -1,
    activeMonth,
    onSelect: setActiveMonth,
    setFocusableDate,
  });
  const {
    hasMonth: hasNextMonth,
    monthLabels: nextMonthLabels,
    goToMonth: goToNextMonth,
  } = useMonth({
    ...props,
    monthsToAdd: 1,
    activeMonth,
    onSelect: setActiveMonth,
    setFocusableDate,
  });

  const years = useYears(props);

  return {
    years,
    weeks,
    activeMonth,
    goToNextMonth,
    goToPreviousMonth,
    hasPreviousMonth,
    previousMonthLabels,
    hasNextMonth,
    nextMonthLabels,
    showYearSelection,
    setShowYearSelection,
    setSelectedYear: (date: Date) => {
      setActiveMonth(date);
      // reset the focusable date, to undefined for getting the default focusable day from useActiveMonth.
      setFocusableDate(undefined);
    },
    focusableDate,
    focusedDate,
    setFocusedDate,
    // get the available date to focus.
    getClosestDateToFocus,
    getTestId,
  };
};
