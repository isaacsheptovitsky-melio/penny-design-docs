/* eslint-disable max-lines */
import {
  addDate,
  createDate,
  formatDateTime,
  isEqual,
  isSameDay,
  isValidDate,
  parseDate,
  useUpdateEffect,
} from '@melio/penny-utils';
import {
  type FocusEvent,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEvent,
  type MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useDateValidation } from '@/components/internal/_BaseCalendar/hooks';

import { calculateRightLeftPadding } from '../../utils/calculateRightLeftPadding';
import { dateValidationReason, defaultFormat } from '../DateField.types';
import { type UseDateFieldProps, type UseDateFieldReturnType } from './types';

export const useDateField = ({
  value,
  onFocus,
  onClick,
  onKeyDown,
  onChange,
  onBlur,
  defaultIsOpen,
  isOpen: controlledOpen,
  onOpenChange: setControlledOpen,
  selectedDate: controlledSelectedDate,
  onSelectDate,
  onDateValidationError,
  isTypable = false,
  autoFocus = false,
  isDisabled,
  isReadOnly,
  isLoading,
  isViewMode,
  hideClear = false,
  format = defaultFormat,
  placeholder = isTypable ? (format === defaultFormat ? 'MM/DD/YYYY' : 'DD/MM/YYYY') : 'Select a date...',
  clearDateAriaLabel = 'Clear date',
  minDate,
  maxDate,
  weekDays,
  shouldDisableDate: shouldDisableDateProp,
  ...props
}: UseDateFieldProps): UseDateFieldReturnType => {
  const isControlledDate = Boolean(onSelectDate);
  const isEnabled = !isReadOnly && !isLoading && !isViewMode && !isDisabled;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultIsOpen && isEnabled);
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = useState<Date | undefined>();
  const [activeElement, setActiveElement] = useState<Element | null>(null);
  const [shouldReturnFocus, setShouldReturnFocus] = useState<boolean | undefined>(false);
  const { isYearBefore1901, isBeforeMinDate, isAfterMaxDate, isInWeekDays, shouldDisableDate } = useDateValidation({
    shouldDisableDate: shouldDisableDateProp,
    minDate,
    maxDate,
    weekDays,
  });

  const [isFocused, setIsFocused] = useState(false);
  const [inputRightElementWidth, setInputRightElementWidth] = useState<number | null>(null);

  const displayTypableMode = isTypable && (isFocused || !value);
  const isOpen = controlledOpen ?? uncontrolledOpen ?? false;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;
  const selectedDate = controlledSelectedDate ?? uncontrolledSelectedDate;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>();
  const inputRightElementRef = useRef<HTMLDivElement>(null);

  const toggleElement = toggleRef.current;
  const [inputValue, setInputValue] = useState('');

  const actualValue = useMemo(
    () =>
      displayTypableMode ? inputValue : formatDateTime(value ?? uncontrolledSelectedDate, { format: 'MMM d, yyyy' }),
    [value, displayTypableMode, inputValue, uncontrolledSelectedDate]
  );
  useEffect(() => {
    if (isControlledDate) return;
    setUncontrolledSelectedDate(value ?? undefined);
  }, [value, isControlledDate]);

  // In case the toggle icon is out of the DOM (in case of loading for example) and the focus was on it, it needs to be focus again when the toggle is back to the DOM.
  useUpdateEffect(() => {
    if (toggleElement && shouldReturnFocus) {
      setActiveElement(null);
      toggleElement.focus();
    }
  }, [toggleElement]);

  useEffect(() => {
    if (containerRef.current?.contains(activeElement)) {
      setShouldReturnFocus(true);
    } else {
      setShouldReturnFocus(false);
      setActiveElement(null);
    }
  }, [activeElement]);

  useUpdateEffect(() => {
    if (isOpen || !isControlledDate) return;

    // We don't want to call `onChange` if the date is cleared because `onClear` already does that.
    if (value) onChange?.(value);
  }, [isControlledDate, value]);

  // This is to enable smooth toggling between modes by focus and blur.
  // Since the focus toggled between modes and different modes render different inputs, we need to refocus the input
  const toggledToTyping = displayTypableMode && value;

  useEffect(() => {
    if (toggledToTyping && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [toggledToTyping]);

  useEffect(() => {
    if (defaultIsOpen) {
      setInputValue(formatDateTime(value, { format }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- When `defaultIsOpen` is set, we need to update the input value on mount.
  }, []);

  const shouldSkipInputValueUpdate = isOpen || !isValidDate(value);
  const hasInvalidInputValue = Boolean(!selectedDate && inputValue);

  useEffect(() => {
    if (isControlledDate || shouldSkipInputValueUpdate || hasInvalidInputValue) return;

    setInputValue(formatDateTime(selectedDate, { format }));
  }, [format, hasInvalidInputValue, isControlledDate, selectedDate, shouldSkipInputValueUpdate]);

  useEffect(() => {
    if (!isControlledDate || shouldSkipInputValueUpdate) return;

    setInputValue(formatDateTime(value, { format }));
  }, [format, isControlledDate, shouldSkipInputValueUpdate, value]);

  useEffect(() => {
    if (inputRightElementRef.current) {
      setInputRightElementWidth(inputRightElementRef.current.clientWidth);
    }
  }, [isLoading]);

  const handleOnClick: MouseEventHandler<HTMLInputElement> = (event) => {
    if (!isEnabled) return;

    if (isTypable) {
      inputRef.current?.focus();
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    onClick?.(event);
  };

  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (!isEnabled) return;
    setActiveElement(document.activeElement);

    onKeyDown?.(event);

    if (isTypable) return;

    if (event.code === 'Enter' || event.key === 'Enter' || event.code === 'Space' || event.key === ' ') {
      setIsOpen(true);
    }
  };

  const handleOnFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    if (!isEnabled) {
      return;
    }
    setActiveElement(document.activeElement);

    setIsFocused(true);
    onFocus?.(event);
  };

  const onSelect = (newDate?: Date) => {
    const isDifferentDate = !isEqual(newDate, selectedDate);

    if (isControlledDate) {
      if (isDifferentDate) onSelectDate?.(newDate);
    } else {
      setUncontrolledSelectedDate(newDate);
      setIsOpen(false);

      // This is to prevent the input value from being cleared when the user types an invalid date and then clicks away.
      if (newDate) setInputValue(formatDateTime(newDate, { format }));
      // We don't want to call `onChange` if the date was cleared by `onClear` or if the date was invalid from `onInputBlur`.
      if (newDate && isDifferentDate) onChange?.(newDate);
    }
  };

  const onClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onSelect(undefined);
    onChange?.(undefined);
    setInputValue('');
    setIsOpen(false);
    inputRef.current?.focus();
  };
  const validateDate = (currentInputValue: string) => {
    if (!currentInputValue) return; // Guard clause to prevent unnecessary checks.
    const parsedDate = addDate(parseDate(currentInputValue, format, createDate()), {
      hours: 12,
    });

    const validationError = getValidationError({
      parsedDate,
      isYearBefore1901,
      isBeforeMinDate,
      isAfterMaxDate,
      shouldDisableDate,
      isInWeekDays,
    });

    if (validationError) {
      onChange?.(null);
      onDateValidationError?.(validationError);

      if (!isControlledDate) onSelect(undefined);
      return false;
    }
    return true;
  };

  const onInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!isEnabled) {
      return;
    }

    setIsFocused(false);
    onBlur?.(event);

    if (!isTypable) return;

    const currentInputValue = event.target.value;

    // Clear
    if (!currentInputValue) {
      onChange?.(undefined);
      return;
    }

    const [month, day, year] = currentInputValue.split('/');

    if (!validateDate(currentInputValue)) {
      return;
    }

    // Clear errors if validation passes.
    onDateValidationError?.();

    const date =
      // When the format is not the default one, we need to swap the month and day.
      format === defaultFormat ? createDate(`${year}-${month}-${day}`) : createDate(`${year}-${day}-${month}`);

    // No need to call `onChange` if the date is the same as the current value.
    if (value && isSameDay(date, value)) return;
    onChange?.(date);

    if (!isControlledDate) onSelect(date);
  };
  const toggleProps = {
    toggleRef,
  };

  const contentProps = { onSelect, isTypable, selectedDate };
  const rightElementProps = {
    isEnabled,
    inputValue,
    hideClear,
    isDisabled,
    isTypable,
    isReadOnly,
    inputRef,
    onClear,
    clearDateAriaLabel,
    setActiveElement,
  };

  const inputRightElementPaddingRight = calculateRightLeftPadding({
    rightElementWidth: inputRightElementWidth,
  }).paddingRight;
  const inputProps = {
    onFocus: handleOnFocus,
    onClick: handleOnClick,
    onKeyDown: handleOnKeyDown,
    onInputBlur,
    value: actualValue,
    isTypable,
    isEnabled,
    inputRef,
    setInputValue,
    isFocused,
    setIsFocused,
    isOpen,
    setIsOpen,
    setActiveElement,
    displayTypableMode,
    containerRef,
    placeholder,
    autoFocus,
    isViewMode,
    isReadOnly,
    isDisabled,
    isLoading,
    onDateValidationError,
    paddingRight: inputRightElementPaddingRight,
  };
  return {
    contentProps,
    rightElementProps,
    toggleProps,
    inputProps,
    inputRightElementProps: {
      inputRightElementRef,
    },
    ...props,
  };
};

function getValidationError({
  parsedDate,
  isYearBefore1901,
  isBeforeMinDate,
  isAfterMaxDate,
  shouldDisableDate,
  isInWeekDays,
}: {
  parsedDate: Date;
  isYearBefore1901: (date: Date) => boolean;
  isBeforeMinDate: (date: Date) => boolean;
  isAfterMaxDate: (date: Date) => boolean;
  shouldDisableDate: (date: Date) => boolean;
  isInWeekDays: (date: Date) => boolean;
}) {
  if (isYearBefore1901(parsedDate)) {
    return dateValidationReason['UNSUPPORTED_YEAR'];
  }
  if (!isValidDate(parsedDate)) {
    return dateValidationReason['INVALID_FORMAT'];
  }
  if (isBeforeMinDate(parsedDate) || isAfterMaxDate(parsedDate)) {
    return dateValidationReason['OUT_OF_RANGE'];
  }
  if (shouldDisableDate(parsedDate)) {
    return dateValidationReason['DISABLED_DATE'];
  }
  if (!isInWeekDays(parsedDate)) {
    return dateValidationReason['DISABLED_DATE'];
  }
  return undefined;
}
