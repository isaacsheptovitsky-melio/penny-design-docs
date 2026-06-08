import { createDate } from '@melio/penny-utils';
import { within } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Calendar, type CalendarProps } from '..';

validateComponent<CalendarProps>(Calendar, 'Calendar', {
  props: { secondarySelectedDate: createDate(), onSelect: () => null, selectedDate: createDate() },
});

describe('Calendar', () => {
  it('opens the calendar on today on demand', () => {
    vi.useFakeTimers().setSystemTime(createDate('2021-11-15').getTime());

    const handleSelect = vi.fn();

    const { getByTestId, getByText } = renderComponent(<Calendar onSelect={handleSelect} showToday />);

    expect(getByText('November 2021')).toBeInTheDocument();
    expect(within(getByTestId('calendar-day-15')).getByTestId('today-marker')).toBeInTheDocument();
  });
});
