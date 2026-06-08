import { type TestIdProp } from '@melio/penny-utils';
import { type ReactNode } from 'react';

import { type CalendarContextData } from '@/components/internal/_BaseCalendar/CalendarContext';
import type { CalendarLegendProps } from '@/components/internal/_BaseCalendar/components/CalendarLegend';
import { type UseCalendarProps } from '@/components/internal/_BaseCalendar/hooks';

export type CalendarProps = UseCalendarProps &
  Omit<CalendarContextData, 'weeks' | 'size'> & {
    /**
     * An array of the legends under the calendar.
     */
    legendItems?: CalendarLegendProps[];

    /**
     * Decides the width of the legend items.
     */
    legendWidth?: CalendarLegendProps['legendWidth'];

    /**
     * Any free-content to be displayed below the calendar (instead of the "Replace Me" section)
     */
    footer?: ReactNode;

    /**
     * Component identifier for testing.
     */
    'data-component'?: string;
  } & TestIdProp;
