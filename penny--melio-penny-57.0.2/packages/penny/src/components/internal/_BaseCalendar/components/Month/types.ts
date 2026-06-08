import { type useCalendar } from '../../hooks';

export type MonthProps = Pick<ReturnType<typeof useCalendar>, 'getClosestDateToFocus'> & {
  onChangeFocusedDate: ReturnType<typeof useCalendar>['setFocusedDate'];
  currentDateAriaLabel?: string;
  selectedDateAriaLabel?: string;
  secondaryDateAriaLabel?: string;
};
