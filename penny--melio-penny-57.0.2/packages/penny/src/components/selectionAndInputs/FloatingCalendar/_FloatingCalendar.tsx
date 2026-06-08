import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { Group } from '@/components/containers/Group';
import { Divider } from '@/components/dataDisplay/Divider';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { _BaseCalendar } from '@/components/internal/index.deprecated';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import type { _FloatingCalendarDropdownProps } from './FloatingCalendar.types';
import { useIsSelectingDifferentDate } from './FloatingCalendar.utils';

export const _FloatingCalendar = forwardRef<HTMLDivElement, _FloatingCalendarDropdownProps>(
  (
    {
      minDate,
      maxDate,
      onOpenChange: setIsOpen,
      shouldDisableDate,
      weekDays,
      secondarySelectedDate,
      showToday,
      legendItems,
      onSelect,
      value,
      backButton,
      footer,
      disableYearSelection,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      currentDateAriaLabel,
      ...props
    },
    ref
  ) => {
    const { isExtraSmallScreen: isMobile } = useBreakpoint();
    const styles = useMultiStyleConfig('FloatingCalendar', { backButton, legendItems });

    const onClose = () => {
      setIsOpen(false, 'content');
    };

    const { isSelectingDifferentDate } = useIsSelectingDifferentDate();

    const onSelectDate = (date: Date) => {
      if (isSelectingDifferentDate(value)(date)) {
        onSelect(date);
      }
      onClose();
    };

    const testId = 'dropdown-floating-calendar';

    return (
      <Box
        data-component="_FloatingCalendar"
        data-testid={testId}
        aria-label="floating-calendar"
        ref={ref}
        __css={styles['container']}
        {...props}
      >
        <Group variant="vertical" spacing="none" hasDivider>
          {!isMobile && backButton && (
            <Box
              data-testid={`${props['data-testid'] || testId}-back-button`}
              as="button"
              __css={styles['backButton']}
              onClick={backButton.onBack}
            >
              <Group alignItems="center">
                <Icon type="chevron-left" color="inherit" />
                <Text textStyle="inline" color="inherit">
                  {backButton.label}
                </Text>
              </Group>
            </Box>
          )}
          <Group variant="vertical" spacing="xs">
            <Box __css={styles['calendarContainer']}>
              <_BaseCalendar
                onSelect={onSelectDate}
                minDate={minDate}
                maxDate={maxDate}
                shouldDisableDate={shouldDisableDate}
                weekDays={weekDays}
                secondarySelectedDate={secondarySelectedDate}
                showToday={showToday}
                selectedDate={value}
                legendItems={legendItems}
                isMobileDatePicker={isMobile}
                disableYearSelection={disableYearSelection}
                data-testid="calendar"
                selectedDateAriaLabel={selectedDateAriaLabel}
                secondaryDateAriaLabel={secondaryDateAriaLabel}
                currentDateAriaLabel={currentDateAriaLabel}
              />
            </Box>
            {footer && (
              <Box>
                <Divider />
                {footer}
              </Box>
            )}
          </Group>
        </Group>
      </Box>
    );
  }
);

_FloatingCalendar.displayName = '_FloatingCalendar';
