import { createDate } from '@melio/penny-utils';
import { expect } from 'vitest';

import { _BaseCalendar } from '../_BaseCalendar';
import { renderCalendar } from './test.utils';

describe('_BaseCalendar - basic keyboard navigation', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(createDate('2021-11-15').getTime());
  });

  it("pressing 'Tab' should navigate to the next actionable element in the calendar", async () => {
    const { getByTestId, getByRole, user } = renderCalendar(<_BaseCalendar onSelect={vi.fn()} />);

    // tabbing between the actionable elements:
    await user.tab();
    expect(getByRole('button', { name: 'Previous month' })).toHaveFocus();
    await user.tab();
    expect(getByRole('button', { name: 'Change month or year' })).toHaveFocus();
    await user.tab();
    expect(getByRole('button', { name: 'Next month' })).toHaveFocus();
    await user.tab();
    expect(getByTestId('base-calendar-day-1')).toHaveFocus();

    // no more actionable elements so the focus go out of the calendar
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it("Pressing 'Shift + Tab' should navigate to the previous actionable element in the calendar", async () => {
    const { getByTestId, getByRole, user } = renderCalendar(<_BaseCalendar onSelect={vi.fn()} />);

    // To streamline the navigation process: focused this first cell as it is the last actionable element.
    getByTestId('base-calendar-day-1').focus();

    // tabbing between the actionable elements:
    await user.tab({ shift: true });
    expect(getByRole('button', { name: 'Next month' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(getByRole('button', { name: 'Change month or year' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(getByRole('button', { name: 'Previous month' })).toHaveFocus();

    // no more actionable elements so the focus go out of the calendar
    await user.tab({ shift: true });
    expect(document.body).toHaveFocus();
  });

  it("pressing 'Enter' on next/previous month button should change the calendar presentation to the next/previous month", async () => {
    vi.useFakeTimers().setSystemTime(createDate('2021-02-15').getTime());
    const { getByRole, getByText, user } = renderCalendar(<_BaseCalendar onSelect={vi.fn()} />);

    getByRole('button', { name: 'Previous month' }).focus();
    // press 'Enter' to change the month to the previous month
    await user.keyboard('{Enter}');

    expect(getByText('January 2021')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Previous month' })).toHaveFocus();
    // press 'Enter' to change the month to the previous month again
    await user.keyboard('{Enter}');
    expect(getByText('December 2020')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Previous month' })).toHaveFocus();

    getByRole('button', { name: 'Next month' }).focus();
    // press 'Enter' to change the month to the next month
    await user.keyboard('{Enter}');
    expect(getByText('January 2021')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Next month' })).toHaveFocus();
  });

  it("pressing 'Space' on next/previous month button should change the calendar presentation to the next/previous month", async () => {
    const { getByRole, getByText, user } = renderCalendar(<_BaseCalendar onSelect={vi.fn()} />);

    getByRole('button', { name: 'Next month' }).focus();
    // press 'Space' to change the month to the next month
    await user.keyboard(' ');

    expect(getByText('December 2021')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Next month' })).toHaveFocus();
    // press 'Space' to change the month to the next month again
    await user.keyboard(' ');
    expect(getByText('January 2022')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Next month' })).toHaveFocus();

    getByRole('button', { name: 'Previous month' }).focus();
    // press 'Space' to change the month to the previous month again
    await user.keyboard(' ');
    expect(getByText('December 2021')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Previous month' })).toHaveFocus();
  });

  it("pressing 'Enter' on a date cell should fire the 'onSelect' callback.", async () => {
    const handleSelect = vi.fn();
    const { getByTestId, user } = renderCalendar(<_BaseCalendar onSelect={handleSelect} />);

    getByTestId('base-calendar-day-17').focus();

    // press 'Enter' to select the date
    await user.keyboard('{Enter}');
    expect(handleSelect).toHaveBeenCalledWith(createDate('2021-11-17'));
  });

  it("pressing 'Space' on a date cell should fire the 'onSelect' callback", async () => {
    const handleSelect = vi.fn();
    const { getByTestId, user } = renderCalendar(<_BaseCalendar onSelect={handleSelect} />);
    getByTestId('base-calendar-day-17').focus();

    // press 'Space' to select the date
    await user.keyboard(' ');

    expect(handleSelect).toHaveBeenCalledWith(createDate('2021-11-17'));
  });

  it("when pressing 'Tab', the focusable day cell should be the provided selected date", async () => {
    const { getByTestId, getByRole, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-02')} />
    );

    const selectedDateCell = getByTestId('base-calendar-day-2');

    // To streamline the navigation process: focused this button as it is the last actionable element before the calendar grid.
    getByRole('button', { name: 'Next month' }).focus();

    expect(selectedDateCell).not.toHaveFocus();

    await user.tab();
    expect(selectedDateCell).toHaveFocus();
  });

  it("when pressing 'Tab', the focusable day cell should be the provided secondary selected date.", async () => {
    const { getByTestId, getByRole, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} secondarySelectedDate={createDate('2021-11-17')} />
    );
    const secondarySelectedDateCell = getByTestId('base-calendar-day-17');

    // To streamline the navigation process: focused this button as it is the last actionable element before the calendar grid.
    getByRole('button', { name: 'Next month' }).focus();

    expect(secondarySelectedDateCell).not.toHaveFocus();

    await user.tab();
    expect(secondarySelectedDateCell).toHaveFocus();
  });

  it("when pressing 'Tab', the focusable day cell should be the first day (not disabled, e.g., weekend) of the month if the selected date/secondary date is not provided", async () => {
    vi.useFakeTimers().setSystemTime(createDate('2021-08-15').getTime());

    const { getByTestId, getByRole, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} weekDays={[1, 2, 3, 4, 5]} />
    );
    expect(getByText('August 2021')).toBeInTheDocument();

    // it's Sunday, so it is disabled.
    const firstDayCell = getByTestId('base-calendar-day-1');
    expect(firstDayCell).toHaveAttribute('aria-disabled', 'true');

    const secondDayCell = getByTestId('base-calendar-day-2');

    // To streamline the navigation process: focused this button as it is the last actionable element before the calendar grid.
    getByRole('button', { name: 'Next month' }).focus();

    expect(secondDayCell).not.toHaveFocus();

    await user.tab();
    expect(secondDayCell).toHaveFocus();
  });

  it("when pressing 'Tab' after navigating to the previous month, the focusable day cell should be the last day of the month if the selected date/secondary date is not provided", async () => {
    const { getByTestId, getByRole, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} weekDays={[1, 2, 3, 4, 5]} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();

    await user.click(getByRole('button', { name: 'Previous month' }));
    expect(getByText('October 2021')).toBeInTheDocument();

    // it's Sunday, so it is disabled.
    const day31Cell = getByTestId('base-calendar-day-31');
    expect(day31Cell).toHaveAttribute('aria-disabled', 'true');
    // it's Saturday, so it is disabled.
    const day30Cell = getByTestId('base-calendar-day-30');
    expect(day30Cell).toHaveAttribute('aria-disabled', 'true');
    // it's Friday, so it is enabled.
    const day29Cell = getByTestId('base-calendar-day-29');
    expect(day29Cell).toHaveAttribute('aria-disabled', 'false');

    // To streamline the navigation process: focused this button as it is the last actionable element before the calendar grid.
    getByRole('button', { name: 'Next month' }).focus();

    expect(day30Cell).not.toHaveFocus();

    await user.tab();
    expect(day29Cell).toHaveFocus();
  });

  const filteredFocusableCells = (cells: HTMLElement[]) =>
    cells.filter((cell) => cell.getAttribute('tabindex') === '0');

  it("calendar's cells should contains only one focusable date (with tabindex = 0) and it should refer to the provided selected date ", () => {
    const selectedDate = createDate('2021-11-19');
    const { getAllByRole } = renderCalendar(<_BaseCalendar onSelect={vi.fn()} selectedDate={selectedDate} />);

    const focusableCells = filteredFocusableCells(getAllByRole('gridcell'));
    expect(focusableCells).toHaveLength(1);
    expect(focusableCells[0]).toHaveAttribute('data-testid', 'base-calendar-day-19');
  });
});
