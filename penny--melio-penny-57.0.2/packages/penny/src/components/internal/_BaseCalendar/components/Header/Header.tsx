import { Box } from '@chakra-ui/react';
import { isMobileAndroid } from '@melio/penny-utils';
import { forwardRef, useEffect, useMemo, useRef } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useCalendarContext } from '../../CalendarContext';
import type { useCalendar } from '../../hooks';
import type { YearSelectionHeaderTriggerProps } from '../YearSelection';
import { YearSelectionHeaderTrigger } from '../YearSelection';

type HeaderProps = Pick<
  ReturnType<typeof useCalendar>,
  | 'goToPreviousMonth'
  | 'goToNextMonth'
  | 'hasPreviousMonth'
  | 'hasNextMonth'
  | 'nextMonthLabels'
  | 'previousMonthLabels'
> & {
  shouldFocusYearSelectionTrigger?: boolean;
  toggleYearSelection: (open?: boolean) => void;
} & Pick<YearSelectionHeaderTriggerProps, 'activeMonth'>;

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      activeMonth,
      goToPreviousMonth,
      goToNextMonth,
      hasPreviousMonth,
      hasNextMonth,
      toggleYearSelection,
      nextMonthLabels,
      previousMonthLabels,
      shouldFocusYearSelectionTrigger,
      ...props
    },
    ref
  ) => {
    const { size, isDisabled, isMobileDatePicker, showYearSelection, getTestId } = useCalendarContext();
    const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });

    // This is used to returns the focus to trigger button when the year selection is closed and the header is visible.
    const triggerYearSelectionBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (shouldFocusYearSelectionTrigger) {
        triggerYearSelectionBtnRef.current?.focus();
      }
    }, [shouldFocusYearSelectionTrigger]);

    const getNextPrevMonthActionLabel = (direction?: 'Next' | 'Previous', directionAvailable?: boolean) =>
      directionAvailable ? `${direction} month` : `${direction} month is not available`;

    /**
     * Detect if it is an Android device to handle focus behavior when the button becomes disabled.
     *
     * On Android devices, setting the `disabled` attribute on a button causes focus to be lost when the button becomes disabled.
     * To prevent this issue, the `disabled` attribute is conditionally applied based on the device type.
     * Instead, `aria-disabled` is used, and the `onClick` event is prevented from triggering when the button is in a disabled state.
     */
    const isAndroidDevice = isMobileAndroid();
    const isPrevButtonDisabled = isDisabled || !hasPreviousMonth;
    const isNextButtonDisabled = isDisabled || !hasNextMonth;
    const previousMonthProps = useMemo(
      () => ({
        onClick: () => {
          if (isPrevButtonDisabled) return;
          goToPreviousMonth();
        },
        isDisabled: !isAndroidDevice && isPrevButtonDisabled,
        'aria-disabled': isPrevButtonDisabled,
        tabIndex: !isPrevButtonDisabled ? 0 : -1,
      }),
      [goToPreviousMonth, isAndroidDevice, isPrevButtonDisabled]
    );
    const nextMonthProps = useMemo(
      () => ({
        onClick: () => {
          if (isNextButtonDisabled) return;
          goToNextMonth();
        },
        isDisabled: !isAndroidDevice && isNextButtonDisabled,
        tabIndex: !isNextButtonDisabled ? 0 : -1,
        'aria-disabled': isNextButtonDisabled,
      }),
      [goToNextMonth, isAndroidDevice, isNextButtonDisabled]
    );

    return (
      <Box
        __css={styles['header']}
        {...props}
        data-year-selection-open={showYearSelection}
        {...getTestId?.('header')}
        ref={ref}
      >
        {!showYearSelection && (
          <IconButton
            {...getTestId?.('header-previous-month-button')}
            aria-label={getNextPrevMonthActionLabel('Previous', Boolean(previousMonthLabels))}
            size="small"
            variant="naked"
            icon="chevron-left"
            {...previousMonthProps}
          />
        )}
        <YearSelectionHeaderTrigger
          activeMonth={activeMonth}
          toggleYearSelection={toggleYearSelection}
          {...getTestId?.('header-year-selection-open-trigger')}
          ref={triggerYearSelectionBtnRef}
          // Is used for a11y reasons to update the calendar's title when the date changes
          aria-live="polite"
        />
        {!showYearSelection && (
          <IconButton
            {...getTestId?.('header-next-month-button')}
            aria-label={getNextPrevMonthActionLabel('Next', Boolean(nextMonthLabels))}
            variant="naked"
            icon="chevron-right"
            size="small"
            {...nextMonthProps}
          />
        )}
      </Box>
    );
  }
);
