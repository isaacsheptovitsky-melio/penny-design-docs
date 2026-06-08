import { Box } from '@chakra-ui/react';
import { isEqualDates } from '@melio/penny-utils';
import { useMemo, useRef } from 'react';

import { useMultiStyleConfig } from '../../../../../theme/hooks/use-style-config';
import { useCalendarContext } from '../../CalendarContext';
import { type MonthSelectionType, useFocus, useKeyDown } from '../../hooks';
import { getMonthNumber, getTargetMonthByArrowKeyType } from '../../utilities';
import { type YearSelectionListItemProps } from './types';

export const MonthSelectionCell = ({
  month,
  isActiveMonth,
  goToYear,
  focusedMonth,
  onFocusMonthChange,
  handleEscape,
  onBlurMonth,
  isActiveYear,
}: {
  month: MonthSelectionType;
  isActiveMonth?: boolean;
  goToYear: YearSelectionListItemProps['goToYear'];
  onFocusMonthChange: (date?: Date) => void;
  focusedMonth?: Date;
  handleEscape?: () => void;
  onBlurMonth: () => void;
  isActiveYear?: boolean;
}) => {
  const { size, isMobileDatePicker, getTestId } = useCalendarContext();
  const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });
  const monthItemRef = useRef<HTMLDivElement>(null);
  const isFocusedMonth = useMemo(() => focusedMonth && isEqualDates(focusedMonth, month.date), [focusedMonth, month]);
  const { isFirstMonth } = getMonthNumber(month.date);

  const { onKeyDown } = useKeyDown({
    handleArrowKey: (key) => {
      const targetDate = getTargetMonthByArrowKeyType(key, month.date);
      if (targetDate) {
        onFocusMonthChange(targetDate);
      }
    },
    handleSelectKey: () => goToYear(month.date),
    handleEscape,
    handleBlur: onBlurMonth,
  });

  const { onFocus, onBlur } = useFocus({
    ref: monthItemRef,
    isFocused: isFocusedMonth,
    handleOnFocus: () => {
      onFocusMonthChange(month.date);
    },
    handleOnBlur: () => {
      onFocusMonthChange(undefined);
    },
  });

  // The focusable month is the focused month or active month in the active year, otherwise is the first month of the year.
  const defaultFocusableMonth = isActiveYear ? isActiveMonth : isFirstMonth;
  const isFocusable = focusedMonth ? isFocusedMonth : defaultFocusableMonth;

  return (
    <Box
      as="button"
      data-active={isActiveMonth || null}
      __css={styles['monthSelectionCell']}
      onClick={() => goToYear(month.date)}
      aria-disabled={month.isDisabled}
      {...getTestId?.(`year-selection-list-item-month-${month.fullLabel.toLowerCase()}`)}
      aria-label={`Month ${month.fullLabel}`}
      aria-checked={isActiveMonth}
      tabIndex={isFocusable ? 0 : -1}
      role="radio"
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={monthItemRef}
    >
      {month.label}
    </Box>
  );
};
