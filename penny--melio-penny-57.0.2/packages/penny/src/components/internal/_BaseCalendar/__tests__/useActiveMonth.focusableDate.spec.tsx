import { addDays, createDate, flatten, isEqual, isSameDay, subDays } from '@melio/penny-utils';
import { act } from '@testing-library/react';
import { expect } from 'vitest';

import { getDays, renderUseCalendar } from './test.utils';

describe('useCalendar - focusableDate', () => {
  const secondarySelectedDate = createDate('2021-11-21');
  const selectedDate = subDays(secondarySelectedDate, 7);
  const defaultProps = { secondarySelectedDate, selectedDate };

  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(createDate('2021-11-15').getTime());
  });

  it('`focusableDate` should be equal to the provided `selectedDate`', () => {
    const { focusableDate } = renderUseCalendar({ selectedDate }).result.current;
    expect(focusableDate).toEqual(selectedDate);
  });
  it('`focusableDate` should be equal to the provided `secondarySelectedDate` when `selectedDate` is not provided', () => {
    const { focusableDate } = renderUseCalendar({ secondarySelectedDate }).result.current;
    expect(focusableDate).toEqual(secondarySelectedDate);
  });
  it('when `selectedDate` and `secondarySelectedDate` provided the `focusableDate` should be equal to the `selectedDay`', () => {
    const currentSelectedDate = createDate('2021-11-26');
    const { focusableDate } = renderUseCalendar({
      secondarySelectedDate,
      selectedDate: currentSelectedDate,
    }).result.current;

    expect(focusableDate).toEqual(currentSelectedDate);
  });
  it('when `selectedDate` and `secondarySelectedDate`, and `selectedDate` provided is disabled the `focusableDate` should be equal to the closest day to the provided selected date', () => {
    const currentSelectedDate = createDate('2021-11-27');
    const { focusableDate } = renderUseCalendar({
      secondarySelectedDate,
      selectedDate: currentSelectedDate,
      weekDays: [0, 1, 2, 3, 4, 5],
    }).result.current;

    // the selectedDate is disabled, so the focusableDate should be the closest available date.
    expect(focusableDate).toEqual(addDays(currentSelectedDate, 1));
  });
  it('when `selectedDate` and `secondarySelectedDate` the `focusableDate` should by equal to the first available date of the month', () => {
    const { focusableDate } = renderUseCalendar().result.current;
    expect(focusableDate).toEqual(createDate('2021-11-01'));
  });
  it('when `selectedDate` is disabled the `focusableDate` should by equal to the forward available date', () => {
    const currentSelectedDate = createDate('2021-11-14');

    const { focusableDate, weeks } = renderUseCalendar({ selectedDate: currentSelectedDate, weekDays: [1, 2, 3, 4, 5] })
      .result.current;

    flatten(weeks).forEach((day) => {
      if (day && isSameDay(day.date, currentSelectedDate)) {
        expect(day.isDisabled).toBeTruthy();
        expect(day.isSelected).toBeTruthy();
      }
    });

    // the selectedDate is disabled, so the focusableDate should be the next available date.
    expect(focusableDate).toEqual(createDate('2021-11-15'));
  });
  it('when `secondarySelectedDate` is disabled the `focusableDate` should by equal to the forward available date', () => {
    const { focusableDate, weeks } = renderUseCalendar({ secondarySelectedDate, minDate: createDate('2021-11-23') })
      .result.current;

    flatten(weeks).forEach((day) => {
      if (day && isSameDay(day.date, secondarySelectedDate)) {
        expect(day.isDisabled).toBeTruthy();
        expect(day.isSecondarySelectedDate).toBeTruthy();
      }
    });

    // the secondarySelectedDate is disabled, so the focusableDate should be the next available date.
    expect(focusableDate).toEqual(createDate('2021-11-23'));
  });
  it('focusableDate updates when moving to next month', () => {
    const { result } = renderUseCalendar(defaultProps);

    expect(result.current.hasNextMonth).toBeTruthy();
    expect(result.current.activeMonth).toEqual({ date: createDate('2021-11-15'), month: 10, year: 2021 });

    act(() => result.current.goToNextMonth());

    expect(result.current.activeMonth).toEqual({ date: createDate('2021-12-15'), month: 11, year: 2021 });
    expect(result.current.focusableDate).toEqual(createDate('2021-12-01'));
  });
  it('focusableDate updates when moving to previous month', () => {
    const { result } = renderUseCalendar(defaultProps);

    expect(result.current.hasNextMonth).toBeTruthy();
    expect(result.current.activeMonth).toEqual({ date: createDate('2021-11-15'), month: 10, year: 2021 });

    act(() => result.current.goToPreviousMonth());

    expect(result.current.activeMonth).toEqual({ date: createDate('2021-10-15'), month: 9, year: 2021 });
    expect(result.current.focusableDate).toEqual(createDate('2021-10-31'));
  });
  it('focusableDate updates when selecting day', () => {
    const onSelect = vi.fn();
    const { result } = renderUseCalendar({ ...defaultProps, onSelect });

    expect(result.current.activeMonth).toEqual({ date: createDate('2021-11-15'), month: 10, year: 2021 });
    expect(result.current.focusableDate).toEqual(defaultProps.selectedDate);
    act(() => result.current.goToNextMonth());
    expect(result.current.focusableDate).toEqual(createDate('2021-12-01'));

    const newDayToSelect = getDays(result.current.weeks).find(
      (day) => day && isEqual(day.date, createDate('2021-12-20'))
    );

    act(() => newDayToSelect?.selectDay());
    expect(onSelect).toHaveBeenCalledWith(newDayToSelect?.date);
    expect(result.current.focusableDate).toEqual(newDayToSelect?.date);
  });
});
