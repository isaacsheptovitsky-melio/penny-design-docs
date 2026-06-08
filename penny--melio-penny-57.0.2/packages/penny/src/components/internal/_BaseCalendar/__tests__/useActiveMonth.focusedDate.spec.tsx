import { createDate, isEqualDates } from '@melio/penny-utils';
import { act } from '@testing-library/react';
import { expect } from 'vitest';

import { getDays, renderUseCalendar } from './test.utils';

describe('useActiveMonth - focusedDate', () => {
  it('focusedDate is undefined by default', () => {
    const { focusedDate } = renderUseCalendar().result.current;

    expect(focusedDate).toBeUndefined();
  });
  it("'focusedDate' should be equal to the given date on call to 'getClosestDateToFocus'", () => {
    vi.useFakeTimers().setSystemTime(createDate('2021-11-15').getTime());

    const targetDate = createDate('2021-11-16');

    const { result } = renderUseCalendar();

    expect(result.current.focusedDate).toBeUndefined();
    // act `getClosestDateToFocus` with targetDate to focus
    act(() => result.current.getClosestDateToFocus(targetDate));
    expect(result.current.focusedDate).toEqual(targetDate);
  });
  it("'focusedDate' should be equal to the date of the next day after the given disabled date when 'getClosestDateToFocus' is called.", () => {
    const today = createDate('2021-11-15');
    vi.useFakeTimers().setSystemTime(today.getTime());
    const targetDate = createDate('2021-11-20');
    // the target date is Saturday
    expect(targetDate.getDay()).toBe(6);

    const { result } = renderUseCalendar({ weekDays: [0, 1, 2, 3, 4, 5] });
    // set current as focus
    act(() => result.current.setFocusedDate(today));

    // act `getClosestDateToFocus` with targetDate to focus
    act(() => result.current.getClosestDateToFocus(targetDate));
    const targetDateInDays = result.current.weeks.flat().find((day) => day && isEqualDates(day?.date, targetDate));
    // check that the target day is disabled (weekend)
    expect(targetDateInDays?.isDisabled).toBeTruthy();
    const { focusedDate } = result.current;
    // the returned focusedDate is Sunday because the given targetDate is Saturday
    expect(focusedDate?.getDay()).toBe(0);
    expect(focusedDate).toEqual(createDate('2021-11-21'));
  });
  it("'focusedDate' should be equal to the date of the previous day before the given disabled date when 'getClosestDateToFocus' is called.", () => {
    const today = createDate('2021-11-15');
    vi.useFakeTimers().setSystemTime(today.getTime());
    const targetDate = createDate('2021-11-13');
    // the target date is Saturday
    expect(targetDate.getDay()).toBe(6);

    const { result } = renderUseCalendar({ weekDays: [0, 1, 2, 3, 4, 5] });
    // set current as focus
    act(() => result.current.setFocusedDate(today));

    // act `getClosestDateToFocus` with targetDate to focus
    act(() => result.current.getClosestDateToFocus(targetDate));
    const targetDateInDays = result.current.weeks.flat().find((day) => day && isEqualDates(day?.date, targetDate));
    // check that the target day is disabled (weekend)
    expect(targetDateInDays?.isDisabled).toEqual(true);
    const { focusedDate } = result.current;
    // the returned focusedDate is Friday because the given targetDate is Saturday
    expect(focusedDate?.getDay()).toBe(5);
    expect(focusedDate).toEqual(createDate('2021-11-12'));
  });
  it("'focusedDate' should be equal to the date of the next day of the next month after the given disabled date when 'getClosestDateToFocus' is called.", () => {
    const today = createDate('2021-10-30');
    vi.useFakeTimers().setSystemTime(today.getTime());
    // the current date is Saturday
    expect(today.getDay()).toBe(6);
    const targetDate = createDate('2021-10-31');
    // the target date is Sunday
    expect(targetDate.getDay()).toBe(0);

    const { result } = renderUseCalendar({ weekDays: [1, 2, 3, 4, 5, 6] });
    // set current as focus
    act(() => result.current.setFocusedDate(today));
    expect(result.current.activeMonth).toEqual({
      date: createDate('2021-10-15'),
      month: 9,
      year: 2021,
    });

    const targetDateInDays = result.current.weeks.flat().find((day) => day && isEqualDates(day?.date, targetDate));
    // check that the target day is disabled (weekend)
    expect(targetDateInDays?.isDisabled).toEqual(true);
    // act `getClosestDateToFocus` with targetDate to focus
    act(() => result.current.getClosestDateToFocus(targetDate));
    const { focusedDate } = result.current;
    // the returned focusedDate is Monday because the given targetDate is Sunday
    expect(focusedDate?.getDay()).toBe(1);
    expect(focusedDate).toEqual(createDate('2021-11-01'));

    // the active month changed to November
    expect(result.current.activeMonth).toEqual({
      date: createDate('2021-11-15'),
      month: 10,
      year: 2021,
    });
  });
  it("'focusedDate' should be equal to the date of the previous day of the previous month before the given disabled date when 'getClosestDateToFocus' is called", () => {
    const today = createDate('2021-08-02');
    vi.useFakeTimers().setSystemTime(today.getTime());
    // the current date is Monday
    expect(today.getDay()).toBe(1);
    const targetDate = createDate('2021-08-01');
    // the target date is Sunday
    expect(targetDate.getDay()).toBe(0);

    const { result } = renderUseCalendar({ weekDays: [1, 2, 3, 4, 5, 6] });
    // set current as focus
    act(() => result.current.setFocusedDate(today));
    expect(result.current.activeMonth).toEqual({
      date: createDate('2021-08-15'),
      month: 7,
      year: 2021,
    });

    const targetDateInDays = result.current.weeks.flat().find((day) => day && isEqualDates(day?.date, targetDate));
    // check that the target day is disabled (weekend)
    expect(targetDateInDays?.isDisabled).toEqual(true);
    // act `getClosestDateToFocus` with targetDate to focus
    act(() => result.current.getClosestDateToFocus(targetDate));
    const { focusedDate } = result.current;
    // the returned focusedDate is Saturday because the given targetDate is Sunday
    expect(focusedDate?.getDay()).toBe(6);
    expect(focusedDate).toEqual(createDate('2021-07-31'));

    // the active month changed to November
    expect(result.current.activeMonth).toEqual({
      date: createDate('2021-07-15'),
      month: 6,
      year: 2021,
    });
  });
  it('after selecting a date and navigating to the next month through the days, the focusable date should be updated according to the month', () => {
    const today = createDate('2021-11-30');
    vi.useFakeTimers().setSystemTime(today.getTime());

    const { result } = renderUseCalendar();
    expect(result.current.focusableDate).toEqual(createDate('2021-11-01'));
    expect(result.current.focusedDate).toBeUndefined();

    const dateToSelect = createDate('2021-11-26');
    const newDayToSelect = getDays(result.current.weeks).find((day) => day && isEqualDates(day.date, dateToSelect));
    act(() => newDayToSelect?.selectDay());

    expect(result.current.focusedDate).toBeUndefined();
    expect(result.current.focusableDate).toEqual(dateToSelect);

    const dateToFocusNextMonth = createDate('2021-12-01');
    act(() => result.current.getClosestDateToFocus(dateToFocusNextMonth));
    expect(result.current.focusableDate).toEqual(dateToFocusNextMonth);
  });
});
