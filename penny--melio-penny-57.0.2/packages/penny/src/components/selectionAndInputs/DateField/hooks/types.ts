import { type RefObject } from 'react';

import { type UseCalendarProps } from '@/components/internal/_BaseCalendar/hooks/types';

import type { DateFieldContentProps, DateFieldInputProps, DateFieldRightElementProps } from '../components';
import type { _DateFieldProps } from '../DateField.types';

export type UseDateFieldReturnType = {
  rightElementProps: Omit<DateFieldRightElementProps, 'trigger'>;
  inputRightElementProps: {
    inputRightElementRef: RefObject<HTMLDivElement>;
  };
  inputProps: Omit<DateFieldInputProps, 'rightElement'>;
  contentProps: DateFieldContentProps;
  toggleProps: { toggleRef: RefObject<HTMLButtonElement> };
};

export type UseDateFieldProps = Omit<
  _DateFieldProps,
  'toggleDatePickerAriaLabel' | 'toggleDatePickerAriaLabelledBy' | 'toggleDatePickerRef'
> &
  Pick<UseCalendarProps, 'weekDays' | 'shouldDisableDate'>;
