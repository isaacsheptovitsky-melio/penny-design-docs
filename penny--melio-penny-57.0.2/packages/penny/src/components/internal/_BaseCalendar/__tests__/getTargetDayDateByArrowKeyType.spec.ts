import { createDate } from '@melio/penny-utils';
import { expect } from 'vitest';

import { type ArrowKeyType } from '../hooks';
import { getTargetDayDateByArrowKeyType } from '../utilities';

describe('getTargetDayDateByArrowKeyType', () => {
  const date = createDate('2021-11-15');
  const weekDaysWithoutSaturdayAndSunday = [1, 2, 3, 4, 5];
  it("returns the next date when, passing 'ArrowRight' arrow key type", () => {
    const result = getTargetDayDateByArrowKeyType('ArrowRight' as ArrowKeyType, date);
    expect(result).toStrictEqual(createDate('2021-11-16'));
  });
  it("returns the previous date, when passing 'ArrowLeft' arrow key type", () => {
    const result = getTargetDayDateByArrowKeyType('ArrowLeft' as ArrowKeyType, date);
    expect(result).toStrictEqual(createDate('2021-11-14'));
  });
  it("returns the date of the same day of the next week, when passing 'ArrowDown' arrow key type", () => {
    const result = getTargetDayDateByArrowKeyType('ArrowDown' as ArrowKeyType, date);
    expect(result).toStrictEqual(createDate('2021-11-22'));
  });
  it("returns the date of the same day of the previous week, when passing 'ArrowUp' arrow key type", () => {
    const result = getTargetDayDateByArrowKeyType('ArrowUp' as ArrowKeyType, date);
    expect(result).toStrictEqual(createDate('2021-11-08'));
  });
  it("returns the date of the first day of the week, when passing 'Home' key type", () => {
    const saturday = createDate('2021-11-20');
    // verify that the day is Saturday
    expect(saturday.getDay()).toBe(6);
    const result = getTargetDayDateByArrowKeyType('Home' as ArrowKeyType, saturday);

    // date of the first day of the week
    const sunday = createDate('2021-11-14');
    // verify that the day is Sunday
    expect(sunday.getDay()).toBe(0);
    expect(result).toStrictEqual(sunday);
  });
  it("returns the date of the first day of the week according to the 'weekDays', when passing 'Home' key type", () => {
    const friday = createDate('2021-11-19');
    // verify that the day is Saturday
    expect(friday.getDay()).toBe(5);
    const result = getTargetDayDateByArrowKeyType('Home' as ArrowKeyType, friday, weekDaysWithoutSaturdayAndSunday);

    // date of the first day of the week
    const monday = createDate('2021-11-15');
    // verify that the day is Monday
    expect(monday.getDay()).toBe(1);
    expect(result).toStrictEqual(monday);
  });
  it("returns the date of the last day of the week, when passing 'End' key type", () => {
    const sunday = createDate('2021-11-14');
    // verify that the day is Saturday
    expect(sunday.getDay()).toBe(0);
    const result = getTargetDayDateByArrowKeyType('End' as ArrowKeyType, sunday);

    // calculate the date of the last day of the week
    const saturday = createDate('2021-11-20');
    // verify that the day is Saturday
    expect(saturday.getDay()).toBe(6);
    expect(result).toStrictEqual(saturday);
  });
  it("returns the date of the last day of the week according to the 'weekDays', when passing 'End' key type", () => {
    const monday = createDate('2021-11-15');
    // verify that the day is Saturday
    expect(monday.getDay()).toBe(1);
    const result = getTargetDayDateByArrowKeyType('End' as ArrowKeyType, monday, weekDaysWithoutSaturdayAndSunday);

    // calculate the date of the last day of the week
    const friday = createDate('2021-11-19');
    // verify that the day is Friday
    expect(friday.getDay()).toBe(5);
    expect(result).toStrictEqual(friday);
  });
  it("returns the date of the same day on the next month, when passing 'PageUp' key type", () => {
    const result = getTargetDayDateByArrowKeyType('PageUp' as ArrowKeyType, date);
    expect(result).toStrictEqual(createDate('2021-12-15'));
  });
  it("returns the date of the same day on the previous month, when passing 'PageUp' key type", () => {
    const result = getTargetDayDateByArrowKeyType('PageDown' as ArrowKeyType, date);
    expect(result).toStrictEqual(createDate('2021-10-15'));
  });
  it("returns the date of the same day on the next year, when passing 'PageUp + Shift' key type", () => {
    const result = getTargetDayDateByArrowKeyType('PageUp + Shift' as ArrowKeyType, date);
    expect(result).toStrictEqual(createDate('2022-11-15'));
  });
  it("returns the date of the same day on the previous year, when passing 'PageDown + Shift' key type", () => {
    const result = getTargetDayDateByArrowKeyType('PageDown + Shift' as ArrowKeyType, date);
    expect(result).toStrictEqual(createDate('2020-11-15'));
  });
});
