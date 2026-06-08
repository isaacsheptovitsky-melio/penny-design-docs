import { Box, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMergeRefs } from '@floating-ui/react';
import { isMobileDevice, uniqueId, useTestId } from '@melio/penny-utils';
import { forwardRef, useMemo } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { Floating } from '@/components/containers/Floating';
import { Loader } from '@/components/foundations/Loader';
import { useMultiStyleConfig } from '@/theme/hooks';
import { getAriaProps } from '@/utils/getAriaProps';

import { DateFieldContent, DateFieldInput, DateFieldRightElement } from './components';
import { DateFieldDesktopTrigger } from './components/DateFieldDesktopTrigger';
import type { DateFieldCalendarProps, DateFieldProps } from './DateField.types';
import { getUseFloatingOptions } from './DateField.utils';
import { useDateField } from './hooks';

/**
 * The Date Field component serves as an input for selecting dates, providing a user-friendly way to trigger and control the Calendar component.
 * It allows users to manually enter a date or open the Calendar for selection.
 */
export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  (
    {
      minDate,
      onDateValidationError,
      maxDate,
      secondarySelectedDate,
      legendItems,
      legendWidth,
      showToday = true,
      disableYearSelection,
      currentDateAriaLabel,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      shouldDisableDate,
      weekDays = [1, 2, 3, 4, 5],
      footer,
      size = 'large',
      'data-testid': dataTestId = 'date-field',
      shouldTrapFocus = true,
      value,
      onChange,
      onBlur,
      defaultIsOpen,
      isOpen: controlledOpen,
      onOpenChange: setControlledOpen,
      selectedDate: controlledSelectedDate,
      onSelectDate,
      isTypable,
      autoFocus,
      isDisabled,
      isReadOnly,
      isLoading,
      isViewMode,
      hideClear,
      format,
      placeholder,
      toggleDatePickerAriaLabel = 'Date picker',
      toggleDatePickerAriaLabelledBy,
      clearDateAriaLabel,
      dialogAriaLabel,
      toggleDatePickerRef,
      ...otherProps
    },
    ref
  ) => {
    const dateFieldContextProps: DateFieldProps = {
      value,
      minDate,
      maxDate,
      onChange,
      onBlur,
      defaultIsOpen,
      isOpen: controlledOpen,
      onOpenChange: setControlledOpen,
      selectedDate: controlledSelectedDate,
      onSelectDate,
      onDateValidationError,
      isTypable,
      autoFocus,
      isDisabled,
      isReadOnly,
      isLoading,
      isViewMode,
      hideClear,
      format,
      placeholder,
      clearDateAriaLabel,
      weekDays,
      shouldDisableDate,
    };

    const calendarProps: DateFieldCalendarProps = {
      minDate,
      maxDate,
      secondarySelectedDate,
      legendItems,
      legendWidth,
      showToday,
      disableYearSelection,
      currentDateAriaLabel,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      shouldDisableDate,
      weekDays,
      footer,
    };

    const { inputProps, contentProps, rightElementProps, toggleProps, inputRightElementProps } =
      useDateField(dateFieldContextProps);

    const getTestId = useTestId(dataTestId);
    const floatingOptions = getUseFloatingOptions(size);
    const styles = useMultiStyleConfig('DateField', { isTypable });

    const desktopNonTypable = !isTypable && !isMobileDevice();

    const loaderId = useMemo(() => uniqueId('loader-'), []);
    const calendarId = useMemo(() => uniqueId('calendar-'), []);

    const commonTriggerProps = {
      'aria-haspopup': 'dialog',
      'aria-controls': inputProps.isOpen ? calendarId : undefined,
    } as const;

    const triggerButton = (
      <IconButton
        icon="calendar"
        variant="naked"
        size="extra-small"
        isDisabled={isReadOnly || isDisabled}
        aria-label={toggleDatePickerAriaLabel}
        {...getAriaProps('aria-labelledby', [toggleDatePickerAriaLabelledBy])}
        {...commonTriggerProps}
        {...getTestId('toggle')}
        ref={useMergeRefs([toggleDatePickerRef, toggleProps.toggleRef])}
      />
    );

    const floatingCalendar = (
      <Floating
        id={calendarId}
        isDisabled={isReadOnly || isDisabled}
        onOpenChange={inputProps.setIsOpen}
        isOpen={inputProps.isOpen}
        trigger={triggerButton}
        shouldTrapFocus={shouldTrapFocus}
        aria-label={dialogAriaLabel ?? undefined}
        {...floatingOptions}
      >
        <DateFieldContent {...getTestId('calendar')} {...contentProps} {...calendarProps} />
      </Floating>
    );

    const rightElement = (
      <DateFieldRightElement trigger={floatingCalendar} {...rightElementProps} {...getTestId('toggle')} />
    );

    if (desktopNonTypable && !inputProps.isViewMode) {
      const { containerRef, ...rest } = inputProps;
      const { inputRightElementRef } = inputRightElementProps;

      return (
        <InputGroup ref={containerRef}>
          <DateFieldDesktopTrigger
            ref={ref}
            size={size}
            loaderId={loaderId}
            {...getTestId()}
            {...rest}
            {...commonTriggerProps}
            {...otherProps}
          />
          <InputRightElement __css={styles['inputRightElement']} ref={inputRightElementRef}>
            {isLoading ? (
              <Box as={Loader} __css={styles['loader']} id={loaderId} {...getTestId('loader')} />
            ) : (
              rightElement
            )}
          </InputRightElement>
        </InputGroup>
      );
    }

    return (
      <DateFieldInput
        ref={ref}
        rightElement={rightElement}
        size={size}
        {...getTestId()}
        {...inputProps}
        {...otherProps}
      />
    );
  }
);

DateField.displayName = 'DateField';
