import { type GetTestId } from '@melio/penny-utils';
import { createContext, useContext } from 'react';

import { type UseYearsReturnType, type WeekType } from './hooks';

export type CalendarContextData = {
  weeks: WeekType[];
  size?: 'small' | 'large';
  isDisabled?: boolean;
  showToday?: boolean;
  isMobileDatePicker?: boolean;
  showYearSelection?: boolean;
  disableYearSelection?: boolean;
  years?: UseYearsReturnType;
  focusableDate?: Date;
  focusedDate?: Date;
  weekDays?: number[];
  getTestId?: GetTestId;
};

export const CalendarContext = createContext<CalendarContextData>({ weeks: [] });
export const useCalendarContext = () => useContext(CalendarContext);
