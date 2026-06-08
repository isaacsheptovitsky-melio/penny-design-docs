import { Box } from '@chakra-ui/react';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { Group } from '@/components/containers/Group';

import { getThemeSpacingAsNumber } from '../../../theme/foundations';
import { useMultiStyleConfig } from '../../../theme/hooks/use-style-config';
import type { _BaseCalendarProps } from './_BaseCalendar.types';
import { CalendarContext } from './CalendarContext';
import { CalendarLegend, Header, Month, YearSelection } from './components';
import { useCalendar } from './hooks';

const LEGENDS_SPACING = 's';

/**
 * `getLegendMaxWidth` function is used to calculate the max width of the legend items based on the calendar's container width (and remove the spaces between / around the items).
 */
const getLegendMaxWidth = (containerWidth: number, itemsLength: number) =>
  `calc(${containerWidth - getThemeSpacingAsNumber(LEGENDS_SPACING) * itemsLength}px / ${itemsLength})`;

/**
 * @private For internal use only.
 */
export const _BaseCalendar = forwardRef<HTMLDivElement, _BaseCalendarProps>(
  (
    {
      secondarySelectedDate,
      onSelect,
      selectedDate,
      shouldDisableDate,
      maxDate,
      minDate,
      weekDays,
      isDisabled,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      currentDateAriaLabel,
      size = 'large',
      showToday,
      legendItems,
      isMobileDatePicker,
      yearsRange,
      legendWidth = 'fit-content',
      disableYearSelection = false,
      'data-testid': dataTestid,
      ...props
    },
    ref
  ) => {
    const {
      activeMonth,
      weeks,
      goToNextMonth,
      goToPreviousMonth,
      hasNextMonth,
      nextMonthLabels,
      hasPreviousMonth,
      previousMonthLabels,
      showYearSelection,
      setShowYearSelection,
      setSelectedYear,
      focusableDate,
      years,
      getClosestDateToFocus,
      setFocusedDate,
      focusedDate,
      getTestId,
    } = useCalendar({
      secondarySelectedDate,
      onSelect,
      selectedDate,
      shouldDisableDate,
      maxDate,
      minDate,
      weekDays,
      yearsRange,
      'data-testid': dataTestid,
    });

    const [calendarWidth, setCalendarWidth] = useState(0);
    const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });
    // Used to detect if the year selection trigger button should be focused when the year selection is closed.
    const [shouldFocusYearSelectionTrigger, setShouldFocusYearSelectionTrigger] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleYearSelection = (open?: boolean) => {
      setShowYearSelection(Boolean(open));
    };

    const closeYearSelection = (date?: Date) => {
      if (date) {
        setSelectedYear(date);
      }
      setShowYearSelection(false);
      setShouldFocusYearSelectionTrigger(true);
    };

    // This is use to reset the state of the year selection button focus.
    useEffect(() => {
      if (shouldFocusYearSelectionTrigger) {
        setShouldFocusYearSelectionTrigger(false);
      }
    }, [shouldFocusYearSelectionTrigger]);

    useEffect(() => {
      if (!containerRef.current) return;

      setCalendarWidth(containerRef.current.clientWidth);
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/refs
    }, [containerRef.current?.clientWidth]);

    return (
      <CalendarContext.Provider
        value={{
          showToday,
          weeks,
          isDisabled,
          size,
          isMobileDatePicker,
          years,
          showYearSelection,
          focusableDate,
          focusedDate,
          weekDays,
          disableYearSelection,
          getTestId,
        }}
      >
        {activeMonth && (
          <Group variant="vertical" spacing="s" ref={ref} data-component="_BaseCalendar" {...getTestId()} {...props}>
            <Box data-disabled={isDisabled || void 0} __css={styles['container']} ref={containerRef}>
              <Header
                activeMonth={activeMonth}
                hasPreviousMonth={hasPreviousMonth}
                hasNextMonth={hasNextMonth}
                nextMonthLabels={nextMonthLabels}
                previousMonthLabels={previousMonthLabels}
                goToPreviousMonth={goToPreviousMonth}
                goToNextMonth={goToNextMonth}
                toggleYearSelection={toggleYearSelection}
                shouldFocusYearSelectionTrigger={shouldFocusYearSelectionTrigger}
              />
              {showYearSelection && (
                <YearSelection
                  activeMonth={activeMonth}
                  closeYearSelection={closeYearSelection}
                  onBlurYearList={() => setShouldFocusYearSelectionTrigger(true)}
                />
              )}
              <Month
                onChangeFocusedDate={setFocusedDate}
                getClosestDateToFocus={getClosestDateToFocus}
                selectedDateAriaLabel={selectedDateAriaLabel}
                secondaryDateAriaLabel={secondaryDateAriaLabel}
                currentDateAriaLabel={currentDateAriaLabel}
              />
            </Box>
            {legendItems?.length ? (
              <Box
                as={Group}
                __css={styles['legendsList']}
                // ts-ignore is used due to props issues with `<Box/>`.
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                variant="horizontal"
                spacing={LEGENDS_SPACING}
                width="full"
                {...getTestId?.('legend-list')}
              >
                {legendItems.map((item, index) => (
                  <CalendarLegend
                    key={`legend-${item.label}`}
                    {...getTestId(item.testId ?? `legend-item-${index}`)}
                    label={item.label}
                    date={item.date}
                    variant={item.variant}
                    legendWidth={legendWidth}
                    legendMaxWidth={getLegendMaxWidth(calendarWidth, legendItems.length)}
                  />
                ))}
              </Box>
            ) : null}
          </Group>
        )}
      </CalendarContext.Provider>
    );
  }
);

_BaseCalendar.displayName = '_BaseCalendar';
