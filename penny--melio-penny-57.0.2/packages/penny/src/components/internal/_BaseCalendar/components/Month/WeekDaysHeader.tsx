import { Box } from '@chakra-ui/react';
import { isMobileIOS } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '../../../../../theme/hooks/use-style-config';
import { VisuallyHidden } from '../../../../accessibility/VisuallyHidden';
import { useCalendarContext } from '../../CalendarContext';
import { useWeekDays } from './useWeekDays';

export const WeekDaysHeader = forwardRef<HTMLDivElement>((props, ref) => {
  const { size, isMobileDatePicker } = useCalendarContext();

  const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });
  const weekDays = useWeekDays();

  //aria-label and aria-labelledby is not working on IOS mobile, this way the SR will read the full day name.
  const mobileLabel = (weekDay: { label: string; fullLabel: string }) => (
    <Box as="span" role="text">
      <Box as="span" aria-hidden>
        {weekDay.label}
      </Box>
      <VisuallyHidden>{weekDay.fullLabel}</VisuallyHidden>
    </Box>
  );

  return (
    <Box role="row" __css={styles['calendarRow']} {...props} ref={ref}>
      {weekDays.map((weekDay) => (
        <Box role="columnheader" key={weekDay.label} __css={styles['headerCell']} aria-label={weekDay.fullLabel}>
          {isMobileIOS() ? mobileLabel(weekDay) : weekDay.label}
        </Box>
      ))}
    </Box>
  );
});
