import { createDate, getDay, getMonth, subDays } from '@melio/penny-utils';
import { expect } from 'vitest';

import { type DayOfWeek } from '../hooks';
import { getDays, getMonthDays, renderUseCalendar } from './test.utils';

describe('useMonth', () => {
  const secondarySelectedDate = createDate('2021-11-22');
  const selectedDate = subDays(secondarySelectedDate, 7);
  const defaultProps = { selectedDate, secondarySelectedDate };

  it('contains all weeks in the given month', () => {
    const { weeks } = renderUseCalendar(defaultProps).result.current;

    expect(weeks).toHaveLength(5);
  });
  it('has days in the right day-week index', () => {
    expect.assertions(30);
    const { weeks } = renderUseCalendar(defaultProps).result.current;

    weeks.forEach((week) =>
      week.forEach((day, i) => {
        if (day) {
          expect(getDay(day.date)).toEqual(i);
        }
      })
    );
  });
  it('contains only days within the active month', () => {
    expect.assertions(30);
    const { weeks, activeMonth } = renderUseCalendar(defaultProps).result.current;

    getDays(weeks).forEach((day) => {
      expect(getMonth(day.date)).toEqual(activeMonth.month);
    });
  });

  describe('weekDays', () => {
    it('disabled week days not within the inclusive weekDays list', () => {
      const weekDays = [1, 2, 3] as DayOfWeek[];
      const disabledDays = getMonthDays({ ...defaultProps, weekDays }).reduce((count, { date, isDisabled }) => {
        expect(isDisabled).toBe(!weekDays.includes(getDay(date) as DayOfWeek));

        return count + (isDisabled ? 1 : 0);
      }, 0);

      expect(disabledDays).toEqual(16);
    });
  });
});
