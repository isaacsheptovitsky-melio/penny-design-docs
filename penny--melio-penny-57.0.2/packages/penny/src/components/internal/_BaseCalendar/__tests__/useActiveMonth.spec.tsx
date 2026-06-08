import { createDate, subDays } from '@melio/penny-utils';
import { act } from '@testing-library/react';
import { expect } from 'vitest';

import { renderUseCalendar } from './test.utils';

describe('useActiveMonth', () => {
  const secondarySelectedDate = createDate('2021-11-22');
  const selectedDate = subDays(secondarySelectedDate, 7);
  const defaultProps = { selectedDate, secondarySelectedDate };

  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(createDate('2021-11-15').getTime());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('has the date, month and year', () => {
    const { activeMonth } = renderUseCalendar(defaultProps).result.current;

    expect(activeMonth).toEqual({
      date: createDate('2021-11-15'),
      month: 10,
      year: 2021,
    });
  });
  it('gets the activeMonth according to the `minDate` and the `weekDays`', () => {
    const { activeMonth } = renderUseCalendar({
      ...defaultProps,
      minDate: createDate('2022-04-30'),
      weekDays: [1, 2, 3, 4, 5],
    }).result.current;

    expect(activeMonth).toEqual({
      date: createDate('2022-05-15'),
      month: 4,
      year: 2022,
    });
  });
  it('gets the activeMonth according to the `minDate` and `selectedDate`', () => {
    const { activeMonth } = renderUseCalendar({
      ...defaultProps,
      minDate: createDate('2022-04-30'),
      selectedDate: createDate('2022-05-08'),
    }).result.current;

    expect(activeMonth).toEqual({
      date: createDate('2022-05-15'),
      month: 4,
      year: 2022,
    });
  });
  it('gets the activeMonth according to the `minDate`', () => {
    const { activeMonth } = renderUseCalendar({ ...defaultProps, minDate: createDate('2022-04-30') }).result.current;

    expect(activeMonth).toEqual({
      date: createDate('2022-04-15'),
      month: 3,
      year: 2022,
    });
  });

  it('calendar opens the current month and enables next-month navigation when no selectedDate is provided and minDate is in the future', () => {
    const { activeMonth, hasNextMonth } = renderUseCalendar({
      secondarySelectedDate,
      minDate: createDate('2021-12-15'),
    }).result.current;

    expect(activeMonth).toEqual({
      date: createDate('2021-11-15'),
      month: 10,
      year: 2021,
    });
    expect(hasNextMonth).toBe(true);
  });

  it('calendar opens on current month and enables previous-month navigation when no selectedDate is provided and minDate is in the past', () => {
    const { activeMonth, hasPreviousMonth } = renderUseCalendar({
      secondarySelectedDate,
      minDate: createDate('2021-10-15'),
    }).result.current;

    expect(activeMonth).toEqual({
      date: createDate('2021-11-15'),
      month: 10,
      year: 2021,
    });
    expect(hasPreviousMonth).toBe(true);
  });

  describe('navigate months', () => {
    it('updates when moving to next month', () => {
      const { result } = renderUseCalendar(defaultProps);

      expect(result.current.hasNextMonth).toBeTruthy();
      act(() => result.current.goToNextMonth());
      expect(result.current.activeMonth).toEqual({
        date: createDate('2021-12-15'),
        month: 11,
        year: 2021,
      });
    });
    it('updates when moving to previous month', () => {
      const { result } = renderUseCalendar(defaultProps);

      expect(result.current.hasPreviousMonth).toBeTruthy();
      act(() => result.current.goToPreviousMonth());
      expect(result.current.activeMonth).toEqual({
        date: createDate('2021-10-15'),
        month: 9,
        year: 2021,
      });
    });
  });
});
