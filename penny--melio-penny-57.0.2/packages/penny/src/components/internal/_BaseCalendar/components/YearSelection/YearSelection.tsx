import { Box } from '@chakra-ui/react';
import { type RefObject, useCallback, useRef, useState } from 'react';

import { Group } from '@/components/containers/Group';
import { Fade } from '@/components/foundations/transitions';

import { useMultiStyleConfig } from '../../../../../theme/hooks/use-style-config';
import { useCalendarContext } from '../../CalendarContext';
import { type YearSelectionListProps } from './types';
import { YearSelectionListItem } from './YearSelectionListItem';

export const YearSelection = ({ activeMonth, closeYearSelection, onBlurYearList }: YearSelectionListProps) => {
  const { size, isMobileDatePicker, years, showYearSelection, getTestId } = useCalendarContext();
  const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });
  const [expandedYear, setExpandedYear] = useState<number | undefined>(activeMonth.year);
  const listRef = useRef<HTMLDivElement>(null);
  const [initiated, setInitiated] = useState(false);

  const handleToggleItem = (year: number, refToScroll?: RefObject<HTMLDivElement>) => {
    if (expandedYear === year) {
      setExpandedYear(undefined);
    } else {
      setExpandedYear(year);
      if (refToScroll) {
        scrollToElement(refToScroll);
      }
    }
  };

  const [focusedYear, setFocusedYear] = useState<number | undefined>();

  const scrollToElement = useCallback(
    (itemRef: RefObject<HTMLDivElement>) => {
      if (listRef.current && itemRef.current) {
        const containerRect = listRef.current.getBoundingClientRect();
        const elementRect = itemRef.current.getBoundingClientRect();
        const offset = elementRect.top - containerRect.top;

        listRef.current.scrollTo({
          top: listRef.current.scrollTop + offset,
          // we want to avoid smooth scroll when the user opens the year selection for the first time and when focus the year with the keyboard.
          behavior: initiated && itemRef.current.ariaExpanded !== 'false' ? 'smooth' : 'auto',
        });
      }
      setInitiated(true);
    },
    [initiated]
  );

  const handleFocusYearChange = (year?: number, refToScroll?: RefObject<HTMLDivElement>) => {
    setFocusedYear(year);
    if (refToScroll) {
      scrollToElement(refToScroll);
    }
  };

  const handleEscape = () => {
    closeYearSelection();
  };

  return (
    <Box __css={styles['yearSelectionContainer']} {...getTestId?.('year-selection')}>
      <Group variant="vertical" spacing="s" height="full">
        <Box
          __css={styles['yearSelectionList']}
          {...getTestId?.('year-selection-list')}
          ref={listRef}
          // Uses to A11y to announce the year selection menu and its orientation.
          role="list"
          aria-label="Year Selection List"
        >
          <Fade in={showYearSelection}>
            {years && (
              <>
                {Object.keys(years).map((year) => {
                  const yearItem = years[Number(year)];
                  const isOpen = expandedYear === Number(year);
                  if (!yearItem) return null;

                  return (
                    <YearSelectionListItem
                      key={year}
                      yearItem={yearItem}
                      isOpen={isOpen}
                      goToYear={closeYearSelection}
                      activeMonth={activeMonth}
                      onToggleYear={handleToggleItem}
                      scrollToElement={scrollToElement}
                      focusedYear={focusedYear}
                      onFocusYearChange={handleFocusYearChange}
                      onBlurYear={onBlurYearList}
                      isActiveYear={activeMonth.year === yearItem.year}
                      shouldTriggerScrollToElement={isOpen && !initiated}
                      handleEscape={handleEscape}
                    />
                  );
                })}
              </>
            )}
          </Fade>
        </Box>
      </Group>
    </Box>
  );
};

YearSelection.displayName = 'YearSelection';
