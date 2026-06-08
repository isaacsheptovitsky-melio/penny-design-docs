import { addMonths } from '@melio/penny-utils';

import { type ArrowKeyType } from '../hooks';

export const getMonthNumber = (date: Date) => {
  const monthNumber = date.getMonth() + 1;

  return {
    monthNumber,
    isFirstMonth: monthNumber === 1,
    isLastMonth: monthNumber === 12,
    isOnFirstRow: monthNumber <= 3,
    isOnLastRow: monthNumber >= 10,
  };
};

/**
 * getTargetMonthByArrowKeyType - Returns the target month based on the arrow key type.
 *
 * - ArrowUp - Navigate to the previous months row, in case the current month is the one of the first row do nothing.
 * - ArrowDown - Navigate to the next months row, in case the current month is the one of the last row do nothing.
 * - ArrowLeft - Navigate to the previous month, in case the current month is the first month of the year do nothing.
 * - ArrowRight - Navigate to the next month, in case the current month is the last month of the year do nothing.
 */
export const getTargetMonthByArrowKeyType = (key: ArrowKeyType, monthDate: Date) => {
  const { isFirstMonth, isLastMonth, isOnFirstRow, isOnLastRow } = getMonthNumber(monthDate);

  switch (key) {
    case 'ArrowUp': {
      if (isOnFirstRow) return;
      return addMonths(monthDate, -3);
    }
    case 'ArrowDown': {
      if (isOnLastRow) return;
      return addMonths(monthDate, 3);
    }
    case 'ArrowLeft': {
      if (isFirstMonth) return;
      return addMonths(monthDate, -1);
    }
    case 'ArrowRight': {
      if (isLastMonth) return;
      return addMonths(monthDate, 1);
    }
    default:
      return;
  }
};
