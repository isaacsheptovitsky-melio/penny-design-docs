import { flatten, identity } from '@melio/penny-utils';
import { renderHook } from '@testing-library/react';
import { type ReactElement } from 'react';
import { IntlProvider } from 'react-intl';

import { renderComponent } from '../../../../test-utils';
import { PennyProvider } from '../../../../theme/providers';
import { type DayType, useCalendar, type UseCalendarProps, type WeekType } from '../hooks';

export const renderUseCalendar = (props: Partial<UseCalendarProps> = {}) => {
  const theme = {
    logos: {
      light: () => <></>,
      dark: () => <></>,
    },
  };

  return renderHook(() => useCalendar({ onSelect: () => void 0, ...props }), {
    wrapper: (props: object) => (
      <IntlProvider locale="en" timeZone="UTC">
        <PennyProvider {...props} theme={theme} />
      </IntlProvider>
    ),
  });
};

export const getDays = (weeks: WeekType[]) => flatten(weeks).filter(identity) as DayType[];

export const getMonthDays = (props: Partial<UseCalendarProps> = {}) => {
  const { result } = renderUseCalendar(props);

  return getDays(result.current.weeks);
};

export const renderCalendar = (jsx: ReactElement): ReturnType<typeof renderComponent> =>
  renderComponent(jsx, { userEventOptions: { advanceTimers: vi.advanceTimersByTime } });
