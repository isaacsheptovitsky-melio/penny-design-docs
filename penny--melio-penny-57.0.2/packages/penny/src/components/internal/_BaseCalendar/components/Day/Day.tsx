import { Box } from '@chakra-ui/react';
import { formatDate, isEqualDates, isMobileIOS, isToday, useIntl } from '@melio/penny-utils';
import { type AriaAttributes, forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';

import { useMultiStyleConfig } from '../../../../../theme/hooks/use-style-config';
import { VisuallyHidden } from '../../../../accessibility/VisuallyHidden';
import { useCalendarContext } from '../../CalendarContext';
import { type ArrowKeyType, type DayType, useFocus, useKeyDown } from '../../hooks';
import { getTargetDayDateByArrowKeyType } from '../../utilities';
import { type MonthProps } from '../Month';

type DayProps = Pick<
  MonthProps,
  | 'onChangeFocusedDate'
  | 'getClosestDateToFocus'
  | 'selectedDateAriaLabel'
  | 'secondaryDateAriaLabel'
  | 'currentDateAriaLabel'
> & {
  day: DayType | null;
} & AriaAttributes;

const getAriaLabel = ({
  day,
  currentDateAriaLabel,
  selectedDateAriaLabel,
  secondaryDateAriaLabel,
}: {
  day: DayType;
  currentDateAriaLabel?: string;
  selectedDateAriaLabel?: string;
  secondaryDateAriaLabel?: string;
}): string => {
  const dateFormatAriaLabel = formatDate(day.date, 'do MMMM yyyy');

  if (day.isSelected && selectedDateAriaLabel) {
    return `${dateFormatAriaLabel} ${selectedDateAriaLabel}`;
  }

  if (day.isSecondarySelectedDate && secondaryDateAriaLabel) {
    return `${dateFormatAriaLabel} ${secondaryDateAriaLabel}`;
  }

  if (isToday(day.date) && currentDateAriaLabel) {
    return `${dateFormatAriaLabel} ${currentDateAriaLabel}`;
  }

  return dateFormatAriaLabel;
};

export const Day = forwardRef<HTMLDivElement, DayProps>(
  (
    {
      day,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      currentDateAriaLabel,
      onChangeFocusedDate,
      getClosestDateToFocus,
      ['aria-colindex']: ariaColIndex,
      ...props
    },
    forwardRef
  ) => {
    const {
      size,
      showToday,
      isDisabled: isCalenderDisabled,
      isMobileDatePicker,
      focusableDate,
      focusedDate,
      weekDays,
      getTestId,
    } = useCalendarContext();

    const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });
    const { formatDate } = useIntl();

    const ref = useRef<HTMLDivElement>(null);
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardRef, () => ref.current);

    const isFocused = useMemo(
      () => Boolean(focusedDate && day && isEqualDates(focusedDate, day.date)),
      [focusedDate, day]
    );

    const handleArrowKey = useCallback(
      (key: ArrowKeyType) => {
        if (!day) return;
        const targetDate = getTargetDayDateByArrowKeyType(key, day.date, weekDays);
        if (targetDate) {
          getClosestDateToFocus(targetDate);
        }
      },
      [day, getClosestDateToFocus, weekDays]
    );

    const { onKeyDown } = useKeyDown({
      handleArrowKey,
      handleSelectKey: () => day?.selectDay(),
    });

    const { onFocus, onBlur } = useFocus({
      ref,
      isFocused,
      handleOnFocus: () => {
        onChangeFocusedDate(day?.date);
      },
      handleOnBlur: () => {
        onChangeFocusedDate(undefined);
      },
    });

    // For the empty slots in the month selection (say, the 1st of the month is starting on Monday and not Sunday).
    if (!day) {
      return <Box {...props} role="gridcell" ref={ref} />;
    }

    const isFocusableDate =
      !isCalenderDisabled && (focusedDate ? isFocused : focusableDate && isEqualDates(focusableDate, day.date));
    const ariaLabel = getAriaLabel({ day, currentDateAriaLabel, selectedDateAriaLabel, secondaryDateAriaLabel });
    const isiOSMobile = isMobileIOS();

    return (
      <Box
        __css={styles['cell']}
        onClick={day?.isDisabled ? undefined : day.selectDay}
        data-show-today={showToday}
        aria-selected={day.isSelected ?? undefined}
        data-secondary-selected-date={day.isSecondarySelectedDate}
        aria-disabled={day.isDisabled}
        {...getTestId?.(`day-${formatDate(day.date, { day: 'numeric' })}`)}
        tabIndex={isFocusableDate ? 0 : -1}
        {...props}
        ref={ref}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        /* The following props are used for accessibility purposes */
        // Used to indicate the current date. (associated with gridcell role)
        aria-current={isToday(day.date) ? 'date' : undefined}
        role="gridcell"
        // ts-ignore is used due to `type` issues with `<Box/>`.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        type="button"
        aria-colindex={ariaColIndex}
        data-timestamp={day.date.getTime()}
      >
        <Box
          as="span"
          __css={styles['cellLabel']}
          aria-label={ariaLabel}
          data-testid={showToday && isToday(day.date) ? 'today-marker' : undefined}
          data-secondary-selected-date={day.isSecondarySelectedDate}
          data-selected-date={day.isSelected}
          data-disabled={day.isDisabled}
          aria-describedby={isiOSMobile ? day.label : undefined}
        >
          {day.label}
          {isiOSMobile && (
            <VisuallyHidden aria-hidden id={day.label}>
              {ariaLabel}
            </VisuallyHidden>
          )}
        </Box>
      </Box>
    );
  }
);
