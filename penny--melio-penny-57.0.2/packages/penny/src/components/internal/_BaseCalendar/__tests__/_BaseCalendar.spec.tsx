/* eslint-disable max-lines */
import { createDate, isValidDate, parseDateISO } from '@melio/penny-utils';
import { within } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { _BaseCalendar, type _BaseCalendarProps } from '..';
import { renderCalendar } from './test.utils';

validateComponent<_BaseCalendarProps>(_BaseCalendar, '_BaseCalendar', {
  props: { secondarySelectedDate: createDate(), onSelect: () => null, selectedDate: createDate() },
  defaultDataTestId: 'base-calendar',
  componentParts: [
    'header',
    'header-previous-month-button',
    'header-year-selection-open-trigger',
    'header-next-month-button',
    'month-grid',
  ],
});

describe('_BaseCalendar', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(createDate('2021-11-15').getTime());
  });
  it('opens the calendar on today on demand', () => {
    const { getByTestId, getByText, getAllByRole } = renderCalendar(<_BaseCalendar onSelect={vi.fn()} showToday />);

    const todayTestId = 'base-calendar-day-15';
    const todayCell = getByTestId(todayTestId);

    expect(getByText('November 2021')).toBeInTheDocument();
    expect(within(todayCell).getByTestId('today-marker')).toBeInTheDocument();

    // checks that only the current day has the aria-current attribute.
    getAllByRole('gridcell').forEach((cell: HTMLElement) => {
      if (cell.getAttribute('data-testid') === todayTestId) {
        expect(cell).toHaveAttribute('aria-current', 'date');
      } else {
        expect(cell).not.toHaveAttribute('aria-current');
      }
    });
  });

  it('opens the calendar on selected date', () => {
    const { getByText, getAllByRole } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-12-02')} />
    );

    const selectedDateTestId = 'base-calendar-day-2';

    expect(getByText('December 2021')).toBeInTheDocument();

    // checks that only the selected date cell has the correct attributes.
    getAllByRole('gridcell').forEach((cell: HTMLElement) => {
      if (!cell.getAttribute('data-testid')) return;

      if (cell.getAttribute('data-testid') === selectedDateTestId) {
        expect(cell).toHaveAttribute('aria-selected', 'true');
      } else {
        expect(cell).toHaveAttribute('aria-selected', 'false');
      }
    });
  });

  it("opens the calendar on min date's month if selected date is before the min date ", () => {
    const selectedDate = createDate('2021-11-15');
    const minDate = createDate('2021-12-15');
    const { getByText, getByRole, getAllByRole } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} showToday minDate={minDate} selectedDate={selectedDate} />
    );

    // opens on min date's month
    expect(getByText('December 2021')).toBeInTheDocument();
    expect(getByRole('button', { name: /^Previous month/ })).toBeDisabled();

    // all cells are disabled
    const decemberCells = getAllByRole('gridcell').filter((cell) => Boolean(cell.getAttribute('data-testid')));
    decemberCells.forEach((cell: HTMLElement) => {
      expect(cell).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('Applies selectedDateAriaLabel on the selected date', () => {
    const selectedDateAriaLabel = 'selected due date';
    const { getByText, getAllByRole } = renderCalendar(
      <_BaseCalendar
        onSelect={vi.fn()}
        selectedDate={createDate('2021-12-02')}
        selectedDateAriaLabel={selectedDateAriaLabel}
      />
    );

    const selectedDateTestId = 'base-calendar-day-2';

    expect(getByText('December 2021')).toBeInTheDocument();
    const selectedCell = getAllByRole('gridcell').find(
      (cell: HTMLElement) => cell.getAttribute('data-testid') === selectedDateTestId
    );
    expect(selectedCell).toHaveAttribute('aria-selected', 'true');
    expect(selectedCell?.children[0]).toHaveAttribute('aria-label', '2nd December 2021 selected due date');
  });

  it('applies secondaryDateAriaLabel on the selected date', () => {
    const secondaryDateAriaLabel = 'secondary selected due date';
    vi.useFakeTimers().setSystemTime(createDate('2021-12-02').getTime());
    const { getByText, getAllByRole } = renderCalendar(
      <_BaseCalendar
        onSelect={vi.fn()}
        secondarySelectedDate={createDate('2021-12-02')}
        secondaryDateAriaLabel={secondaryDateAriaLabel}
      />
    );

    const secondaryDateTestId = 'base-calendar-day-2';

    expect(getByText('December 2021')).toBeInTheDocument();
    const selectedCell = getAllByRole('gridcell').find(
      (cell: HTMLElement) => cell.getAttribute('data-testid') === secondaryDateTestId
    );
    expect(selectedCell).toHaveAttribute('data-secondary-selected-date', 'true');
    expect(selectedCell?.children[0]).toHaveAttribute('aria-label', '2nd December 2021 secondary selected due date');
  });

  it('Applies currentDateAriaLabel on the current date', () => {
    const currentDateAriaLabel = 'current due date';
    const { getByText, getAllByRole } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} currentDateAriaLabel={currentDateAriaLabel} />
    );

    const selectedDateTestId = 'base-calendar-day-15';

    expect(getByText('November 2021')).toBeInTheDocument();
    const selectedCell = getAllByRole('gridcell').find(
      (cell: HTMLElement) => cell.getAttribute('data-testid') === selectedDateTestId
    );
    expect(selectedCell).toHaveAttribute('aria-current', 'date');
    expect(selectedCell?.children[0]).toHaveAttribute('aria-label', '15th November 2021 current due date');
  });

  it('opens the calendar on today if selected date is not provided and marks the provided secondary selected date', async () => {
    const { getByText, getAllByRole, getByRole, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} secondarySelectedDate={createDate('2021-12-09')} />
    );

    expect(getByText('November 2021')).toBeInTheDocument();

    // check if in the current month has selected-date or secondary selected date.
    getAllByRole('gridcell').forEach((cell: HTMLElement) => {
      if (!cell.getAttribute('data-testid')) return;

      expect(cell).toHaveAttribute('data-secondary-selected-date', 'false');
      expect(cell).toHaveAttribute('aria-selected', 'false');
    });

    await user.click(getByRole('button', { name: 'Next month' }));

    expect(getByText('December 2021')).toBeInTheDocument();

    const secondarySelectedDateTestId = 'base-calendar-day-9';

    // checks that only the secondary selected date has the data-secondary-selected-date attribute set to true.
    getAllByRole('gridcell').forEach((cell: HTMLElement) => {
      if (!cell.getAttribute('data-testid')) return;

      expect(cell).toHaveAttribute('aria-selected', 'false');

      if (cell.getAttribute('data-testid') === secondarySelectedDateTestId) {
        expect(cell).toHaveAttribute('data-secondary-selected-date', 'true');
      } else {
        expect(cell).toHaveAttribute('data-secondary-selected-date', 'false');
      }
    });
  });

  it('opens the calendar on today if selected date is not provided and min date is before today', async () => {
    const minDate = createDate('2021-10-15');
    const { getByText, getByTestId, user, getByRole, getAllByRole } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} showToday minDate={minDate} />
    );

    // opens on today
    expect(getByText('November 2021')).toBeInTheDocument();
    expect(getByTestId('base-calendar-day-15')).toHaveAttribute('aria-current', 'date');

    await user.click(getByRole('button', { name: /Previous month/ }));
    expect(getByText('October 2021')).toBeInTheDocument();
    expect(getByRole('button', { name: /^Previous month/ })).toBeDisabled();

    const octoberCells = getAllByRole('gridcell').filter((cell) => Boolean(cell.getAttribute('data-testid')));
    octoberCells.forEach((cell: HTMLElement) => {
      const isDisabled = Number(cell.getAttribute('data-timestamp')) < minDate.getTime();
      if (isDisabled) {
        expect(cell).toHaveAttribute('aria-disabled', 'true');
      } else {
        expect(cell).toHaveAttribute('aria-disabled', 'false');
      }
    });
  });

  it('calendar opens on current month and enables next-month navigation when minDate is in the future', () => {
    const minDate = createDate('2021-12-15');
    const { getByText, getByTestId, getByRole } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} showToday minDate={minDate} />
    );

    // calendar opens on the current month
    expect(getByText('November 2021')).toBeInTheDocument();
    expect(getByTestId('base-calendar-day-15')).toHaveAttribute('aria-current', 'date');

    // all days in current month are disabled (before minDate)
    expect(getByTestId('base-calendar-day-14')).toHaveAttribute('aria-disabled', 'true');
    expect(getByTestId('base-calendar-day-15')).toHaveAttribute('aria-disabled', 'true');
    expect(getByTestId('base-calendar-day-16')).toHaveAttribute('aria-disabled', 'true');

    // the user can navigate to the next month to reach the minDate
    expect(getByRole('button', { name: /Next month/ })).not.toBeDisabled();
    expect(getByRole('button', { name: /^Previous month/ })).toBeDisabled();
  });

  it('click on date fires `onSelect` callback', async () => {
    const handleSelect = vi.fn();

    const { getByTestId, user } = renderCalendar(<_BaseCalendar onSelect={handleSelect} />);

    await user.click(getByTestId('base-calendar-day-17'));
    expect(handleSelect).toHaveBeenCalledWith(createDate('2021-11-17'));
  });

  it("click on disabled date (e.g weekends) doesn't fire `onSelect` callback", async () => {
    const handleSelect = vi.fn();

    const { getByTestId, user } = renderCalendar(<_BaseCalendar onSelect={handleSelect} weekDays={[1, 2, 3, 4, 5]} />);

    const saturdayDateTestId = getByTestId('base-calendar-day-14');

    expect(saturdayDateTestId).toHaveAttribute('aria-disabled', 'true');
    await user.click(saturdayDateTestId);
    expect(handleSelect).toHaveBeenCalledTimes(0);
  });

  it('shows disabled dates according to the provided min/max dates', () => {
    const minDate = createDate('2021-11-10');
    const maxDate = createDate('2021-11-20');

    const { getAllByRole } = renderCalendar(<_BaseCalendar onSelect={vi.fn()} minDate={minDate} maxDate={maxDate} />);

    // check if the dates before the min date and after the max date are disabled.
    getAllByRole('gridcell').forEach((cell: HTMLElement) => {
      if (!cell.getAttribute('data-testid')) return;
      const cellDate = parseDateISO(cell.getAttribute('data-timestamp') ?? '');
      if (!isValidDate(cellDate)) return;

      if (cellDate <= minDate || cellDate >= maxDate) {
        expect(cell).toHaveAttribute('aria-disabled', 'true');
      } else {
        expect(cell).toHaveAttribute('aria-disabled', 'false');
      }
    });
  });

  describe('when disabled dates', () => {
    it('should set aria-disabled as true', () => {
      const disabledDay = 15;
      const shouldDisableDate = (date: Date) => date.getDate() === disabledDay;
      const { getByTestId } = renderCalendar(
        <_BaseCalendar
          onSelect={vi.fn()}
          selectedDate={createDate('2021-11-10')}
          shouldDisableDate={shouldDisableDate}
        />
      );

      expect(getByTestId('base-calendar-day-15')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not fire onSelect on click', async () => {
      const onSelect = vi.fn();
      const disabledDay = 15;
      const shouldDisableDate = (date: Date) => date.getDate() === disabledDay;
      const { getByTestId, user } = renderCalendar(
        <_BaseCalendar onSelect={onSelect} shouldDisableDate={shouldDisableDate} />
      );

      await user.click(getByTestId('base-calendar-day-15'));
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  it('next month button should be disabled if it leads to a month beyond the max date', async () => {
    const handleSelect = vi.fn();

    const maxDate = createDate('2021-11-20');

    const { getByTestId, user } = renderCalendar(<_BaseCalendar onSelect={handleSelect} maxDate={maxDate} />);

    const nextMonthAction = getByTestId('base-calendar-header-next-month-button');
    expect(nextMonthAction).toBeDisabled();
    expect(nextMonthAction).toHaveAccessibleName('Next month is not available');

    // clicks on date after max date
    await user.click(getByTestId('base-calendar-day-21'));
    expect(handleSelect).toHaveBeenCalledTimes(0);

    // clicks on date before max date
    await user.click(getByTestId('base-calendar-day-19'));
    expect(handleSelect).toHaveBeenCalledWith(createDate('2021-11-19'));
  });

  it('previous month button should be disabled if it leads to a month beyond the min date', async () => {
    const handleSelect = vi.fn();

    const minDate = createDate('2021-11-10');

    const { getByTestId, user } = renderCalendar(<_BaseCalendar onSelect={handleSelect} minDate={minDate} />);

    const prevMonthAction = getByTestId('base-calendar-header-previous-month-button');
    expect(prevMonthAction).toBeDisabled();
    expect(prevMonthAction).toHaveAccessibleName('Previous month is not available');

    // clicks on date before min date
    await user.click(getByTestId('base-calendar-day-9'));
    expect(handleSelect).toHaveBeenCalledTimes(0);

    // clicks on date after min date
    await user.click(getByTestId('base-calendar-day-11'));
    expect(handleSelect).toHaveBeenCalledWith(createDate('2021-11-11'));
  });

  it("doesn't invoke the year selection when `disableYearSelection` is true", async () => {
    const handleSelect = vi.fn();

    const { user, getByText, queryByTestId } = renderCalendar(
      <_BaseCalendar selectedDate={createDate('2021-11-11')} onSelect={handleSelect} disableYearSelection />
    );

    await user.click(getByText('November 2021'));
    expect(queryByTestId('year-selection-list')).not.toBeInTheDocument();
  });
});
