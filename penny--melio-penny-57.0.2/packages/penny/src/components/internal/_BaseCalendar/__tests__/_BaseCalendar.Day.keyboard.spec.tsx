import { createDate } from '@melio/penny-utils';
import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { _BaseCalendar } from '..';
import { renderCalendar } from './test.utils';
describe('_BaseCalendar - Day arrow keys navigation', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(createDate('2021-11-15').getTime());
  });
  it('pressing arrow right should focus and navigate to the next day, skipping any disabled days', async () => {
    const { getByTestId, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-26')} weekDays={[1, 2, 3, 4, 5]} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();
    getByTestId('base-calendar-day-26').focus();
    // the 27th and 28th are disabled (weekend)
    expect(getByTestId('base-calendar-day-27')).toHaveAttribute('aria-disabled', 'true');
    expect(getByTestId('base-calendar-day-28')).toHaveAttribute('aria-disabled', 'true');
    await user.keyboard('{arrowright}');
    expect(getByTestId('base-calendar-day-29')).toHaveFocus();
    await user.keyboard('{arrowright}');
    // the last day of the month
    expect(getByTestId('base-calendar-day-30')).toHaveFocus();
    await user.keyboard('{arrowright}');

    // the first available day of the next month
    expect(getByText('December 2021')).toBeInTheDocument();
    await waitFor(() => expect(getByTestId('base-calendar-day-1')).toBeInTheDocument());
    expect(getByTestId('base-calendar-day-1')).toHaveFocus();
  });
  it('pressing arrow left should focus and navigate to the previous day, skipping any disabled days', async () => {
    const { getByTestId, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} weekDays={[1, 2, 3, 4, 5]} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();
    // the first day of the month
    getByTestId('base-calendar-day-1').focus();
    await user.keyboard('{arrowleft}');
    // the October 31th and 30th are disabled (weekend)
    expect(getByTestId('base-calendar-day-31')).toHaveAttribute('aria-disabled', 'true');
    expect(getByTestId('base-calendar-day-30')).toHaveAttribute('aria-disabled', 'true');
    // the first available day of the previous month
    expect(getByText('October 2021')).toBeInTheDocument();
    await waitFor(() => expect(getByTestId('base-calendar-day-29')).toBeInTheDocument());
    expect(getByTestId('base-calendar-day-29')).toHaveFocus();
  });
  it('pressing arrow up should focus and navigate to the same day of the previous week, skipping any disabled days', async () => {
    const { getByTestId, getByText, user } = renderCalendar(<_BaseCalendar onSelect={vi.fn()} />);
    expect(getByText('November 2021')).toBeInTheDocument();
    // the first day of the month
    getByTestId('base-calendar-day-1').focus();
    await user.keyboard('{arrowup}');
    // moving to the previous month
    expect(getByText('October 2021')).toBeInTheDocument();
    await waitFor(() => expect(getByTestId('base-calendar-day-25')).toBeInTheDocument());

    expect(getByTestId('base-calendar-day-25')).toHaveFocus();
    await user.keyboard('{arrowup}');
    expect(getByTestId('base-calendar-day-18')).toHaveFocus();
  });
  it('pressing arrow down should focus and navigate to the same day of the next week, skipping any disabled days', async () => {
    const { getByTestId, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-26')} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();
    getByTestId('base-calendar-day-26').focus();
    await user.keyboard('{arrowdown}');
    // moving to the next month
    expect(getByText('December 2021')).toBeInTheDocument();
    await waitFor(() => expect(getByTestId('base-calendar-day-3')).toBeInTheDocument());

    expect(getByTestId('base-calendar-day-3')).toHaveFocus();
    await user.keyboard('{arrowdown}');
    expect(getByTestId('base-calendar-day-10')).toHaveFocus();
  });
  it('pressing arrow down should focus and navigate to the same day of the next week, skipping any disabled days', async () => {
    const { getByTestId, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-26')} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();
    getByTestId('base-calendar-day-26').focus();
    await user.keyboard('{arrowdown}');
    // moving to the next month
    expect(getByText('December 2021')).toBeInTheDocument();
    await waitFor(() => expect(getByTestId('base-calendar-day-3')).toBeInTheDocument());

    expect(getByTestId('base-calendar-day-3')).toHaveFocus();
    await user.keyboard('{arrowdown}');
    expect(getByTestId('base-calendar-day-10')).toHaveFocus();
  });
  it("pressing 'home' should focus and navigate to the first day of the week, skipping any disabled days", async () => {
    const { getByTestId, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-26')} weekDays={[1, 2, 3, 4, 5]} />
    );
    getByTestId('base-calendar-day-26').focus();
    await user.keyboard('{home}');
    // moving to the first day of the week
    expect(getByTestId('base-calendar-day-22')).toHaveFocus();
  });
  it("pressing 'home' should focus and navigate to the last day of the week, skipping any disabled days", async () => {
    const { getByTestId, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-22')} weekDays={[1, 2, 3, 4, 5]} />
    );
    getByTestId('base-calendar-day-22').focus();
    await user.keyboard('{end}');
    // moving to the last day of the week
    expect(getByTestId('base-calendar-day-26')).toHaveFocus();
  });
  it("pressing 'pageUp' should focus and navigate to the same day of the week, skipping any disabled days", async () => {
    const { getByTestId, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-26')} weekDays={[1, 2, 3, 4, 5]} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();
    getByTestId('base-calendar-day-26').focus();
    await user.keyboard('{pageup}');
    // moving to the next month
    expect(getByText('December 2021')).toBeInTheDocument();
    // the 26rd is disabled (weekend) so it should skip it
    expect(getByTestId('base-calendar-day-26')).toHaveAttribute('aria-disabled', 'true');
    await waitFor(() => expect(getByTestId('base-calendar-day-27')).toBeInTheDocument());
    expect(getByTestId('base-calendar-day-27')).toHaveFocus();
  });
  it("pressing 'pageDown' should focus and navigate to the same day of the week, skipping any disabled days", async () => {
    const { getByTestId, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-23')} weekDays={[1, 2, 3, 4, 5]} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();
    getByTestId('base-calendar-day-23').focus();
    await user.keyboard('{pagedown}');
    // moving to the previous month
    expect(getByText('October 2021')).toBeInTheDocument();
    // the 23rd and 22nd are disabled (weekend) so it should skip it
    expect(getByTestId('base-calendar-day-23')).toHaveAttribute('aria-disabled', 'true');
    await waitFor(() => expect(getByTestId('base-calendar-day-22')).toBeInTheDocument());
    expect(getByTestId('base-calendar-day-22')).toHaveFocus();
  });
  it("pressing 'shift + pageUp' should focus and navigate to the same day of the week, skipping any disabled days", async () => {
    const { getByTestId, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-26')} weekDays={[1, 2, 3, 4, 5]} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();
    getByTestId('base-calendar-day-26').focus();
    await user.keyboard('{shift>}{pageup}');
    // moving to the next year
    expect(getByText('November 2022')).toBeInTheDocument();
    // the 26rd and 27th are disabled (weekend) so it should skip it
    expect(getByTestId('base-calendar-day-26')).toHaveAttribute('aria-disabled', 'true');
    expect(getByTestId('base-calendar-day-27')).toHaveAttribute('aria-disabled', 'true');
    await waitFor(() => expect(getByTestId('base-calendar-day-28')).toBeInTheDocument());

    expect(getByTestId('base-calendar-day-28')).toHaveFocus();
  });
  it("pressing 'shift + pageDown' should focus and navigate to the same day of the week, skipping any disabled days", async () => {
    const { getByTestId, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} selectedDate={createDate('2021-11-22')} weekDays={[1, 2, 3, 4, 5]} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();
    getByTestId('base-calendar-day-22').focus();
    await user.keyboard('{shift>}{pagedown}');
    // moving to the previous year
    expect(getByText('November 2020')).toBeInTheDocument();
    // the 22nd and 21st are disabled (weekend) so it should skip it
    expect(getByTestId('base-calendar-day-22')).toHaveAttribute('aria-disabled', 'true');
    expect(getByTestId('base-calendar-day-21')).toHaveAttribute('aria-disabled', 'true');
    await waitFor(() => expect(getByTestId('base-calendar-day-20')).toBeInTheDocument());

    expect(getByTestId('base-calendar-day-20')).toHaveFocus();
  });
  it("navigate to the next day in the next month using arrow keys, pressing 'Shift + Tab' or 'Tab' should focus on the correct actionable element.", async () => {
    const onSelect = vi.fn();
    const { getByTestId, getByRole, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={onSelect} selectedDate={createDate('2021-11-26')} weekDays={[1, 2, 3, 4, 5]} />
    );
    expect(getByText('November 2021')).toBeInTheDocument();
    // To streamline the navigation process: focused this button as actionable element.
    await user.tab();
    getByTestId('base-calendar-day-26').focus();
    // the 27th and 28th are disabled (weekend)
    await user.keyboard('{arrowright}');
    expect(getByTestId('base-calendar-day-29')).toHaveFocus();
    // selecting the 29th
    await user.keyboard('{Enter}');
    expect(getByTestId('base-calendar-day-29')).toHaveFocus();
    expect(onSelect).toHaveBeenCalledWith(createDate('2021-11-29'));
    await user.keyboard('{arrowright}{arrowright}');
    expect(getByText('December 2021')).toBeInTheDocument();
    await waitFor(() => expect(getByTestId('base-calendar-day-1')).toBeInTheDocument());

    expect(getByTestId('base-calendar-day-1')).toHaveFocus();
    // press 'shift + tab' to focus the previous actionable element
    await user.tab({ shift: true });
    // loss of focus from the calendar grid
    expect(getByTestId('base-calendar-day-1')).not.toHaveFocus();
    expect(getByRole('button', { name: 'Next month' })).toHaveFocus();
    // return focus to first calendar grid day.
    await user.tab();
    expect(getByTestId('base-calendar-day-1')).toHaveFocus();
    // jump 3 days forward using arrow keys (and skipping disabled weekend days)
    await user.keyboard('{arrowright}{arrowright}{arrowright}');
    expect(getByTestId('base-calendar-day-6')).toHaveFocus();
    // no more actionable elements so the focus go out of the calendar
    await user.tab();
    expect(getByTestId('base-calendar-day-6')).not.toHaveFocus();
    expect(document.body).toHaveFocus();
    await user.tab({ shift: true });
    expect(document.body).not.toHaveFocus();
    // returns focus to the first calendar grid day.
    expect(getByTestId('base-calendar-day-1')).toHaveFocus();
  });

  describe('when disabled dates', () => {
    it('should skip disabled dates', async () => {
      const disabledDays = [25, 26];
      const shouldDisableDate = (date: Date) => disabledDays.includes(date.getDate());
      const { getByTestId, user } = renderCalendar(
        <_BaseCalendar
          onSelect={vi.fn()}
          selectedDate={createDate('2021-11-24')}
          shouldDisableDate={shouldDisableDate}
        />
      );

      getByTestId('base-calendar-day-24').focus();
      await user.keyboard('{arrowright}');

      expect(getByTestId('base-calendar-day-27')).toHaveFocus();
    });

    it('should focus first non-disabled day when tabbing to calendar', async () => {
      const disabledDay = 1;
      const shouldDisableDate = (date: Date) => date.getDate() === disabledDay;
      const { getByTestId, user } = renderCalendar(
        <_BaseCalendar onSelect={vi.fn()} shouldDisableDate={shouldDisableDate} />
      );

      // move to the previous month
      await user.tab();
      // move to the month selector
      await user.tab();
      // move to the next month
      await user.tab();
      // move to the first day of the month
      await user.tab();

      const firstFocusable = getByTestId('base-calendar-day-2');
      expect(firstFocusable).toHaveFocus();
    });
  });
});
