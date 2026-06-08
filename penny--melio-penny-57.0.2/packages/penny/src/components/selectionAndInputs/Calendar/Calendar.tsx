import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Card } from '@/components/containers/cards/Card';
import { Group } from '@/components/containers/Group';
import { Divider } from '@/components/dataDisplay/Divider';
import { _BaseCalendar } from '@/components/internal/_BaseCalendar';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import type { CalendarProps } from './Calendar.types';

/**
 * The Calendar component allows users to select a date, while supporting additional functionalities such as marking primary and secondary selected dates, disabling dates, and customizing selectable weekdays.
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      isDisabled,
      secondarySelectedDate,
      selectedDate,
      selectedDateAriaLabel,
      currentDateAriaLabel,
      onSelect,
      minDate,
      maxDate,
      shouldDisableDate,
      weekDays,
      legendItems,
      legendWidth,
      showToday,
      footer,
      disableYearSelection,
      yearsRange,
      'data-testid': dataTestid = 'calendar',
      'data-component': dataComponent = 'Calendar',
      ...props
    },
    ref
  ) => {
    const styles = useStyleConfig('Calendar');
    const getTestId = useTestId(dataTestid);

    return (
      <Card
        width="min-content"
        paddingX="none"
        paddingY="none"
        data-component={`${dataComponent}Card`}
        {...getTestId('card')}
        {...props}
      >
        <Group variant="vertical" spacing="none">
          <Box __css={styles}>
            <_BaseCalendar
              ref={ref}
              isDisabled={isDisabled}
              secondarySelectedDate={secondarySelectedDate}
              selectedDate={selectedDate}
              onSelect={onSelect}
              minDate={minDate}
              maxDate={maxDate}
              shouldDisableDate={shouldDisableDate}
              weekDays={weekDays}
              legendItems={legendItems}
              legendWidth={legendWidth}
              showToday={showToday}
              selectedDateAriaLabel={selectedDateAriaLabel}
              currentDateAriaLabel={currentDateAriaLabel}
              disableYearSelection={disableYearSelection}
              yearsRange={yearsRange}
              data-component={dataComponent}
              {...getTestId()}
            />
          </Box>
          <Divider />
          <Box {...getTestId('footer')}>{footer}</Box>
        </Group>
      </Card>
    );
  }
);

Calendar.displayName = 'Calendar';
