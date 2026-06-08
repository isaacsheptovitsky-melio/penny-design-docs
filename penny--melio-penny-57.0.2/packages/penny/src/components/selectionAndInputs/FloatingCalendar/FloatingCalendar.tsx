import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Floating } from '@/components/containers/Floating';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { _FloatingCalendar } from './_FloatingCalendar';
import type { FloatingCalendarProps } from './FloatingCalendar.types';
import { getUseFloatingOptions } from './FloatingCalendar.utils';

/**
 * The `FloatingCalendar` component allows users to select a date by triggering the `Calendar` component.
 */
export const FloatingCalendar = forwardRef<HTMLDivElement, FloatingCalendarProps>(
  (
    {
      minDate,
      onOpenChange,
      maxDate,
      shouldDisableDate,
      weekDays,
      secondarySelectedDate,
      showToday,
      legendItems,
      onSelect,
      value,
      backButton,
      trigger,
      footer,
      'data-testid': dataTestId = 'floating-calendar',
      disableYearSelection,
      shouldTrapFocus = true,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      currentDateAriaLabel,
      ...props
    },
    ref
  ) => {
    const calendarProps = {
      minDate,
      maxDate,
      shouldDisableDate,
      weekDays,
      secondarySelectedDate,
      showToday,
      onSelect,
      value,
      legendItems,
      backButton,
      footer,
      disableYearSelection,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      currentDateAriaLabel,
    };
    const getTestId = useTestId(dataTestId);
    const { isExtraSmallScreen } = useBreakpoint();

    return (
      <Floating
        data-component="FloatingCalendar"
        {...getTestId()}
        {...props}
        trigger={trigger}
        ref={ref}
        onOpenChange={onOpenChange}
        shouldTrapFocus={shouldTrapFocus}
        {...getUseFloatingOptions(isExtraSmallScreen)}
      >
        <_FloatingCalendar {...calendarProps} onOpenChange={onOpenChange} />
      </Floating>
    );
  }
);

FloatingCalendar.displayName = 'FloatingCalendar';
