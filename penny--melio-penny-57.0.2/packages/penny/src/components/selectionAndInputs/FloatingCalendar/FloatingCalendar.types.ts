import { type TestIdProp } from '@melio/penny-utils';
import { type ReactNode } from 'react';

import { type FloatingProps } from '@/components/containers/Floating';
import type { _BaseCalendarProps, CalendarLegendProps } from '@/components/internal/_BaseCalendar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _FloatingCalendarDropdownProps = Pick<
  Partial<_BaseCalendarProps>,
  | 'minDate'
  | 'maxDate'
  | 'shouldDisableDate'
  | 'weekDays'
  | 'secondarySelectedDate'
  | 'showToday'
  | 'disableYearSelection'
> &
  Pick<_BaseCalendarProps, 'onSelect' | 'selectedDateAriaLabel' | 'secondaryDateAriaLabel' | 'currentDateAriaLabel'> & {
    /**
     * Current selected date.
     */
    value?: Date;

    /**
     * An array of the legends under the calendar.
     */
    legendItems?: CalendarLegendProps[];

    /**
     * Decides the width of the legend items.
     * @default 'fit-content'
     */
    legendWidth?: CalendarLegendProps['legendWidth'];

    /**
     * The back button's callback and label.
     */
    backButton?: {
      onBack: VoidFunction;
      label: string;
    };

    /**
     * Footer content to display below the calendar.
     */
    footer?: ReactNode;
  } & TestIdProp &
  Pick<FloatingProps, 'shouldTrapFocus' | 'onOpenChange'>;

export type FloatingCalendarProps = Pick<FloatingProps, 'isDisabled' | 'isOpen' | 'onOpenChange'> &
  _FloatingCalendarDropdownProps & {
    /**
     * The trigger element that opens the floating calendar when clicked.
     */
    trigger: NonNullable<FloatingProps['trigger']>;
  };
