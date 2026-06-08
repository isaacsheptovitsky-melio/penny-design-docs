import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '../../../../../theme/hooks/use-style-config';
import { useCalendarContext } from '../../CalendarContext';
import { MonthDaysGrid } from './MonthDaysGrid';
import { type MonthProps } from './types';
import { WeekDaysHeader } from './WeekDaysHeader';

export const Month = forwardRef<HTMLDivElement, MonthProps>(
  (
    {
      onChangeFocusedDate,
      getClosestDateToFocus,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      currentDateAriaLabel,
      ...props
    },
    ref
  ) => {
    const { size, isMobileDatePicker, showYearSelection } = useCalendarContext();

    const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });

    return (
      <Box
        {...props}
        ref={ref}
        __css={styles['monthContainer']}
        // Hides the month container when the year selection is open to prevent focus issues (necessary for a11y)
        data-hidden={showYearSelection || null}
        role="grid"
      >
        <WeekDaysHeader />
        <MonthDaysGrid
          onChangeFocusedDate={onChangeFocusedDate}
          getClosestDateToFocus={getClosestDateToFocus}
          selectedDateAriaLabel={selectedDateAriaLabel}
          secondaryDateAriaLabel={secondaryDateAriaLabel}
          currentDateAriaLabel={currentDateAriaLabel}
        />
      </Box>
    );
  }
);
