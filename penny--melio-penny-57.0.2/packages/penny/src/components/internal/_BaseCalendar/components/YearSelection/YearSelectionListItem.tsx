import { Box } from '@chakra-ui/react';
import { isEqual, isMobileIOS, useIntl } from '@melio/penny-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useMultiStyleConfig } from '../../../../../theme/hooks/use-style-config';
import { useCalendarContext } from '../../CalendarContext';
import { useFocus, useKeyDown } from '../../hooks';
import { MonthSelectionCell } from './MonthSelectionCell';
import { type YearSelectionListItemProps } from './types';

export const YearSelectionListItem = ({
  yearItem,
  isOpen,
  activeMonth,
  goToYear,
  onToggleYear,
  scrollToElement,
  focusedYear,
  onFocusYearChange,
  onBlurYear,
  isActiveYear,
  shouldTriggerScrollToElement,
  handleEscape,
}: YearSelectionListItemProps) => {
  const { size, isMobileDatePicker, getTestId } = useCalendarContext();
  const { formatDate } = useIntl();
  const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });
  const itemRef = useRef<HTMLDivElement>(null);
  const itemTriggerRef = useRef<HTMLDivElement>(null);
  const isFocusedYear = useMemo(() => focusedYear === yearItem.year, [focusedYear, yearItem]);
  const [focusedMonth, setFocusedMonth] = useState<Date>();

  const onFocusMonthChange = useCallback(
    (date?: Date) => {
      const targetMonth = date && yearItem.months.find((month) => isEqual(month.date, date) && !month.isDisabled);
      setFocusedMonth(targetMonth?.date);
    },
    [yearItem]
  );

  // scroll to the opened year item when the year selection is opened for the first time.
  useEffect(() => {
    if (shouldTriggerScrollToElement) {
      scrollToElement(itemRef);
      // Detect if the user is on iOS and focus the first month of the year (because the focus is not working properly on iOS).
      if (isMobileIOS()) {
        requestAnimationFrame(() => {
          itemTriggerRef.current?.focus();
        });
      }
    }
  }, [shouldTriggerScrollToElement, scrollToElement]);

  const isActiveMonth = useCallback(
    (index: number) => isActiveYear && yearItem.months[activeMonth.month]?.date === yearItem.months[index]?.date,
    [isActiveYear, activeMonth, yearItem]
  );

  const { onFocus, onBlur } = useFocus({
    ref: itemTriggerRef,
    isFocused: isFocusedYear,
    handleOnFocus: () => {
      onFocusYearChange(yearItem.year, itemTriggerRef);
    },
    handleOnBlur: () => {
      onFocusYearChange(undefined);
    },
  });

  const { onKeyDown } = useKeyDown({
    handleArrowKey: (key) => {
      if (key === 'ArrowDown') {
        onFocusYearChange(yearItem.year + 1, itemTriggerRef);
      } else if (key === 'ArrowUp') {
        onFocusYearChange(yearItem.year - 1);
      }
    },
    handleSelectKey: () => {
      onToggleYear(yearItem.year, itemRef);
    },
    handleBlur: onBlurYear,
    handleEscape,
  });

  // The focusable year is the active year or the focused year.
  const isFocusable = focusedYear ? isFocusedYear : isActiveYear;

  return (
    <Box
      __css={styles['yearSelectionListItem']}
      {...getTestId?.('year-selection-list-item')}
      ref={itemRef}
      role="listitem"
    >
      <Box
        as="button"
        __css={styles['yearSelectionListItemTrigger']}
        onMouseDown={() => {
          onToggleYear(yearItem.year, itemRef);
        }}
        aria-expanded={isOpen}
        aria-label={`Year ${yearItem.year}`}
        aria-disabled={yearItem.isDisabled}
        tabIndex={isFocusable ? 0 : -1}
        ref={itemTriggerRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        {...getTestId?.(`year-selection-list-item-year-${yearItem.year}`)}
      >
        {yearItem.year}
      </Box>
      {isOpen && (
        <Box __css={styles['monthSelectionGrid']} aria-label="Month selection options" role="radiogroup">
          {yearItem.months.map((month, i) => (
            <MonthSelectionCell
              month={month}
              key={formatDate(month.date)}
              isActiveMonth={isActiveMonth(i)}
              isActiveYear={isActiveYear}
              goToYear={goToYear}
              focusedMonth={focusedMonth}
              onFocusMonthChange={onFocusMonthChange}
              onBlurMonth={() => {
                // returns the focus to the trigger button.
                itemTriggerRef.current?.focus();
              }}
              handleEscape={handleEscape}
              {...month}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

YearSelectionListItem.displayName = 'YearSelectionListItem';
