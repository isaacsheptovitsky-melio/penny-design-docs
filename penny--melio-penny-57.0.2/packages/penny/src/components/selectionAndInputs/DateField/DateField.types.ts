import { type DateTimeFormat } from '@melio/penny-utils';
import { type ReactNode, type Ref } from 'react';

import { type CalendarProps } from '../Calendar';
import { type TextFieldProps } from '../TextField';

export const defaultFormat = 'MM/dd/yyyy';

export const dateValidationReason = {
  INVALID_FORMAT: 'INVALID_FORMAT',
  UNSUPPORTED_YEAR: 'UNSUPPORTED_YEAR',
  OUT_OF_RANGE: 'OUT_OF_RANGE',
  DISABLED_DATE: 'DISABLED_DATE',
} as const;

export type DateValidationReasonKey = keyof typeof dateValidationReason;

export type DateFieldCalendarProps = Pick<
  CalendarProps,
  | 'minDate'
  | 'maxDate'
  | 'shouldDisableDate'
  | 'weekDays'
  | 'legendItems'
  | 'secondarySelectedDate'
  | 'showToday'
  | 'legendWidth'
  | 'selectedDateAriaLabel'
  | 'secondaryDateAriaLabel'
  | 'currentDateAriaLabel'
  | 'disableYearSelection'
> & { footer?: ReactNode };

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _DateFieldProps = Omit<TextFieldProps, 'value' | 'onChange' | 'rightElement' | 'maskProps' | 'onSelect'> & {
  /**
   * The selected date value.
   */
  value?: Date | null;

  /**
   * Callback fired when the date value changes.
   */
  onChange?: (value?: Date | null) => void;

  /**
   * The currently selected date (alternative to value).
   */
  selectedDate?: Date | null;

  /**
   * Callback fired when a date is selected.
   */
  onSelectDate?: (date?: Date | null) => void;

  /**
   * Whether the date picker should be open by default.
   * @default false
   */
  defaultIsOpen?: boolean;

  /**
   * Whether the date picker is currently open.
   */
  isOpen?: boolean;

  /**
   * Callback fired when the open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Callback fired when date validation fails.
   */
  onDateValidationError?: (reason?: DateValidationReasonKey) => void;

  /**
   * Whether users can type directly into the date field.
   * @default false
   */
  isTypable?: boolean;

  /**
   * Whether to hide the clear date button.
   * @default false
   */
  hideClear?: boolean;

  /**
   * The date format to use when typable is enabled.
   * @default 'MM/dd/yyyy'
   */
  format?: Extract<DateTimeFormat, 'dd/MM/yyyy' | 'MM/dd/yyyy'>;

  /**
   * Ref for the date picker toggle button.
   */
  toggleDatePickerRef?: Ref<HTMLButtonElement | null>;

  /**
   * Aria label for the date picker toggle button.
   */
  toggleDatePickerAriaLabel?: string;

  /**
   * Aria labelledby for the date picker toggle button.
   */
  toggleDatePickerAriaLabelledBy?: string;

  /**
   * Aria label for the clear date button.
   */
  clearDateAriaLabel?: string;

  /**
   * Aria label for the calendar dialog.
   */
  dialogAriaLabel?: string;

  /**
   * The minimum selectable date.
   */
  minDate?: Date;

  /**
   * The maximum selectable date.
   */
  maxDate?: Date;
};

export type DateFieldProps = DateFieldCalendarProps &
  _DateFieldProps & {
    /**
     * Whether to trap focus within the date picker when opened.
     * @default true
     */
    shouldTrapFocus?: boolean;
  };
