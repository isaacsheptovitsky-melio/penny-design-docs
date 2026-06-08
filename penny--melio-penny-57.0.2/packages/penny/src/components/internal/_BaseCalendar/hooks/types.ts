import { type TestIdProp } from '@melio/penny-utils';

export type WeekType = (DayType | null)[];

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DayType = {
  isDisabled: boolean;
  isSelected: boolean;
  isSecondarySelectedDate: boolean;
  date: Date;
  label: string;
  selectDay: VoidFunction;
};

export type MonthType = {
  month: number;
  year: number;
  date: Date;
};

export type MonthSelectionType = {
  date: Date;
  label: string;
  fullLabel: string;
  isDisabled: boolean;
};

export type UseCalendarProps = {
  /**
   * Marks a primary selected date.
   */
  selectedDate?: Date;

  /**
   * The `aria-label` of the selected date in date picker calendar.
   */
  selectedDateAriaLabel?: string;

  /**
   * The `aria-label` of the secondary selected date in date picker calendar.
   */
  secondaryDateAriaLabel?: string;

  /**
   * The `aria-label` of the current date (today) in date picker calendar.
   */
  currentDateAriaLabel?: string;

  /**
   * Marks a secondary selected date.
   */
  secondarySelectedDate?: Date;

  /**
   * The minimum selectable date.
   */
  minDate?: Date;

  /**
   * The maximum selectable date.
   */
  maxDate?: Date;

  /**
   * Callback to call when a date is selected.
   */
  onSelect: (date: Date) => void;

  /**
   * Decides what week days to enable for selection.
   * @default [1, 2, 3, 4, 5]
   */
  weekDays?: DayOfWeek[];

  /**
   * Callback to determine if a date should be disabled.
   * @param date - The date to evaluate
   * @returns true if the date should be disabled, false otherwise
   */
  shouldDisableDate?: (date: Date) => boolean;

  /**
   * The range of years to display in year selection.
   */
  yearsRange?: number;
} & TestIdProp;
