import { addDays, createDate, subDays } from '@melio/penny-utils';
import { expect } from 'vitest';

import { renderUseCalendar } from './test.utils';

describe('useYears', () => {
  const selectedDate = createDate('2002-05-08');

  it('contains 100 years before and after the given selectedDate by default', () => {
    const { years, activeMonth } = renderUseCalendar({ selectedDate }).result.current;
    const yearsArray = Object.keys(years);

    expect(yearsArray).toHaveLength(201);
    // first and last year
    expect(yearsArray[0]).toEqual(`${activeMonth.year - 100}`);
    expect(yearsArray[yearsArray.length - 1]).toEqual(`${activeMonth.year + 100}`);
  });
  it("gets years according to the 'yearsRange'", () => {
    const { years, activeMonth } = renderUseCalendar({ selectedDate, yearsRange: 2 }).result.current;
    const yearsArray = Object.keys(years);

    expect(yearsArray).toHaveLength(5);
    // first and last year
    expect(yearsArray[0]).toEqual(`${activeMonth.year - 2}`);
    expect(yearsArray[yearsArray.length - 1]).toEqual(`${activeMonth.year + 2}`);
  });
  it("disabled years and months before to the 'minDate'", () => {
    const minDate = subDays(selectedDate, 5);
    const { years, activeMonth } = renderUseCalendar({ selectedDate, yearsRange: 2, minDate }).result.current;
    const yearsArray = Object.keys(years);

    yearsArray.forEach((year) => {
      if (Number(year) < activeMonth.year) {
        expect(years[Number(year)]?.isDisabled).toBeTruthy();
      } else {
        expect(years[Number(year)]?.isDisabled).toBeFalsy();
        if (Number(year) === activeMonth.year) {
          const yearItem = years[Number(year)];
          yearItem?.months.forEach((month, i) => {
            if (activeMonth.month <= i) {
              expect(month.isDisabled).toBeFalsy();
            } else {
              expect(month.isDisabled).toBeTruthy();
            }
          });
        }
      }
    });
  });
  it("disabled years and months after to the 'maxDate'", () => {
    const maxDate = addDays(selectedDate, 5);
    const { years, activeMonth } = renderUseCalendar({ selectedDate, yearsRange: 2, maxDate }).result.current;
    const yearsArray = Object.keys(years);

    yearsArray.forEach((year) => {
      if (Number(year) > activeMonth.year) {
        expect(years[Number(year)]?.isDisabled).toBeTruthy();
      } else {
        expect(years[Number(year)]?.isDisabled).toBeFalsy();
        if (Number(year) === activeMonth.year) {
          const yearItem = years[Number(year)];
          yearItem?.months.forEach((month, i) => {
            if (activeMonth.month >= i) {
              expect(month.isDisabled).toBeFalsy();
            } else {
              expect(month.isDisabled).toBeTruthy();
            }
          });
        }
      }
    });
  });
  it('disables the correct months if the `maxDate` is in the next year', () => {
    const maxDate = createDate('2003-05-08');
    const { years, activeMonth } = renderUseCalendar({ selectedDate, yearsRange: 2, maxDate }).result.current;

    expect(years).toHaveProperty('2003');

    years[2003]?.months.forEach((month, i) => {
      if (activeMonth.month >= i) {
        expect(month.isDisabled).toBeFalsy();
      } else {
        expect(month.isDisabled).toBeTruthy();
      }
    });
  });
});
