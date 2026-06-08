import { type TestIdProp } from '@melio/penny-utils';

import { type CalendarContextData } from './CalendarContext';
import type { CalendarLegendProps } from './components/CalendarLegend';
import type { UseCalendarProps } from './hooks';

/**
 * @private for internal use only
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _BaseCalendarProps = UseCalendarProps &
  Omit<CalendarContextData, 'weeks'> & {
    legendItems?: CalendarLegendProps[];
    isMobileDatePicker?: boolean;
    legendWidth?: CalendarLegendProps['legendWidth'];
  } & TestIdProp;
