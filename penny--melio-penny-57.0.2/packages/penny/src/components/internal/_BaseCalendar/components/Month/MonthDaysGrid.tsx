import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '../../../../../theme/hooks/use-style-config';
import { useCalendarContext } from '../../CalendarContext';
import { Day } from '../Day';
import { type MonthProps } from './types';

export const MonthDaysGrid = forwardRef<HTMLDivElement, MonthProps>(
  (
    {
      onChangeFocusedDate,
      getClosestDateToFocus,
      currentDateAriaLabel,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      ...props
    },
    ref
  ) => {
    const { size, isDisabled, weeks, isMobileDatePicker, getTestId } = useCalendarContext();

    const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });

    return (
      <Box role="presentation">
        <Box
          role="rowgroup"
          __css={styles['calendar']}
          ref={ref}
          {...getTestId?.('month-grid')}
          data-disabled={isDisabled || void 0}
          {...props}
        >
          {weeks.map((week, weekIndex) => (
            <Box key={`week-${weekIndex}`} role="row" aria-rowindex={weekIndex + 1} __css={styles['calendarRow']}>
              {week.map((day, i) => (
                <Day
                  day={day}
                  key={day ? day.date.getTime() : `day-week-${weekIndex}-cell-${i}`}
                  onChangeFocusedDate={onChangeFocusedDate}
                  getClosestDateToFocus={getClosestDateToFocus}
                  aria-colindex={i + 1}
                  selectedDateAriaLabel={selectedDateAriaLabel}
                  secondaryDateAriaLabel={secondaryDateAriaLabel}
                  currentDateAriaLabel={currentDateAriaLabel}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
);
