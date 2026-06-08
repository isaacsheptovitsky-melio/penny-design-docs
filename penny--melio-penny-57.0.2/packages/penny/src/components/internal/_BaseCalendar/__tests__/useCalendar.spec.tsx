import { addDays, createDate, isDateAfter, isDateBefore, isSameDay, subDays } from '@melio/penny-utils';
import { act } from '@testing-library/react';
import { expect } from 'vitest';

import { type DayType } from '../hooks';
import { getMonthDays } from './test.utils';

describe('useCalendar', () => {
  const secondarySelectedDate = createDate('2021-11-22');
  const selectedDate = subDays(secondarySelectedDate, 7);
  const defaultProps = { selectedDate, secondarySelectedDate };

  describe('minDate', () => {
    it('disabled days prior to minDate', () => {
      const minDate = subDays(selectedDate, 2);
      const disabledDays = getMonthDays({ ...defaultProps, minDate }).reduce((count, { date, isDisabled }) => {
        expect(isDisabled).toBe(isDateBefore(date, minDate));

        return count + (isDisabled ? 1 : 0);
      }, 0);

      expect(disabledDays).toEqual(12);
    });
  });

  describe('maxDate', () => {
    it('disabled days after to maxDate', () => {
      const maxDate = addDays(secondarySelectedDate, 2);
      const cal = getMonthDays({ ...defaultProps, maxDate });
      const disabledDays = cal.reduce((count, day) => {
        expect(day).toEqual({
          ...day,
          isDisabled: isDateAfter(day.date, maxDate),
        });

        return count + (day.isDisabled ? 1 : 0);
      }, 0);

      expect(disabledDays).toEqual(6);
    });
  });

  describe('selectedDate', () => {
    it('sets selectedDate as selected', () => {
      expect.assertions(1);
      getMonthDays(defaultProps).forEach(({ date, isSelected }) => {
        if (isSameDay(date, selectedDate)) {
          expect(isSelected).toBe(true);
        }
      });
    });
  });

  describe('secondarySelectedDate', () => {
    it('sets selectedDate as selected', () => {
      expect.assertions(1);
      getMonthDays(defaultProps).forEach(({ date, isSecondarySelectedDate }) => {
        if (isSameDay(date, secondarySelectedDate)) {
          expect(isSecondarySelectedDate).toBe(true);
        }
      });
    });
  });

  describe('date selection', () => {
    it('can select a date', () => {
      const onSelect = vi.fn();

      expect.assertions(1);
      const day = getMonthDays({ ...defaultProps, onSelect })[0] as DayType;

      act(() => day.selectDay());
      expect(onSelect).toHaveBeenCalledWith(day.date);
    });
  });
});
