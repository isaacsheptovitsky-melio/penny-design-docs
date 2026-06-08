import { createDate } from '@melio/penny-utils';
import { expect } from 'vitest';

import { _BaseCalendar } from '../_BaseCalendar';
import { renderCalendar } from './test.utils';

describe('_BaseCalendar.year selection - keyboard navigation', () => {
  const spyScrollTo = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(createDate('2021-11-15').getTime());
    Object.defineProperty(global.window.HTMLElement.prototype, 'scrollTo', { value: spyScrollTo });
    spyScrollTo.mockClear();
  });

  it("pressing 'Enter' on the year selection button should open/close the year selection popup.", async () => {
    const { getByRole, queryByTestId, getByLabelText, getByTestId, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={5} />
    );

    const yearSelectionLabel = 'Change month or year';
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');

    getByRole('button', { name: yearSelectionLabel }).focus();
    // press 'Enter' to open the year selection popup
    await user.keyboard('{Enter}');
    expect(getByTestId('base-calendar-year-selection')).toBeInTheDocument();
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'true');

    // press 'Enter' to close the year selection popup
    await user.keyboard('{Enter}');
    expect(queryByTestId('base-calendar-year-selection')).not.toBeInTheDocument();
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');
  });

  it("pressing 'Space' on the year selection button should open/close the year selection popup.", async () => {
    const { getByRole, queryByTestId, getByLabelText, getByTestId, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={5} />
    );

    const yearSelectionLabel = 'Change month or year';
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');

    getByRole('button', { name: yearSelectionLabel }).focus();

    // press 'Space' to open the year selection popup
    await user.keyboard(' ');
    expect(getByTestId('base-calendar-year-selection')).toBeInTheDocument();
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'true');

    // press 'Enter' to close the year selection popup
    await user.keyboard(' ');
    expect(queryByTestId('base-calendar-year-selection')).not.toBeInTheDocument();
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');
  });

  it("pressing 'Escape' should close the year selection popup", async () => {
    const { getByRole, getByLabelText, queryByTestId, getByTestId, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={5} />
    );

    const yearSelectionLabel = 'Change month or year';
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');

    // opens the year selection popup
    await user.click(getByRole('button', { name: yearSelectionLabel }));
    expect(getByTestId('base-calendar-year-selection')).toBeInTheDocument();

    getByRole('button', { name: yearSelectionLabel }).focus();

    // press 'Escape' to close the year selection popup
    await user.keyboard('{Escape}');
    expect(queryByTestId('base-calendar-year-selection')).not.toBeInTheDocument();
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');
  });

  it('navigate between years items in year selection popup', async () => {
    const { getByRole, getByLabelText, getByTestId, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={5} />
    );

    const yearSelectionLabel = 'Change month or year';
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');

    // opens the year selection popup
    await user.click(getByRole('button', { name: yearSelectionLabel }));
    expect(getByTestId('base-calendar-year-selection')).toBeInTheDocument();

    getByRole('button', { name: yearSelectionLabel }).focus();

    await user.tab();
    expect(getByLabelText('Year 2021')).toHaveFocus();
    expect(getByLabelText('Year 2021')).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{ArrowDown}');
    expect(getByLabelText('Year 2022')).toHaveFocus();
    expect(getByLabelText('Year 2022')).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard('{ArrowDown}');
    expect(getByLabelText('Year 2023')).toHaveFocus();
    expect(getByLabelText('Year 2023')).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard('{Enter}');
    expect(getByLabelText('Year 2023')).toHaveAttribute('aria-expanded', 'true');
  });
  it('navigate between months items in expanded year in year selection popup', async () => {
    const { getByRole, getByLabelText, getByTestId, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={5} />
    );

    const yearSelectionLabel = 'Change month or year';
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');

    // opens the year selection popup
    await user.click(getByRole('button', { name: yearSelectionLabel }));
    expect(getByTestId('base-calendar-year-selection')).toBeInTheDocument();

    getByRole('button', { name: yearSelectionLabel }).focus();

    await user.tab();
    expect(getByLabelText('Year 2021')).toHaveFocus();
    expect(getByLabelText('Year 2021')).toHaveAttribute('aria-expanded', 'true');
    await user.tab();
    expect(getByLabelText('Month November')).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(getByLabelText('Month August')).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(getByLabelText('Month July')).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(getByLabelText('Month October')).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(getByLabelText('Month November')).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(getByLabelText('Month December')).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(getByLabelText('Month December')).toHaveFocus();
  });
  it("can't navigate to disabled month in expanded year", async () => {
    const { getByRole, getByLabelText, getByTestId, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} maxDate={createDate('2021-11-30')} yearsRange={5} />
    );

    const yearSelectionLabel = 'Change month or year';
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');

    // opens the year selection popup
    await user.click(getByRole('button', { name: yearSelectionLabel }));
    expect(getByTestId('base-calendar-year-selection')).toBeInTheDocument();

    getByRole('button', { name: yearSelectionLabel }).focus();

    await user.tab();
    expect(getByLabelText('Year 2021')).toHaveFocus();
    expect(getByLabelText('Year 2021')).toHaveAttribute('aria-expanded', 'true');
    await user.tab();
    expect(getByLabelText('Month November')).toHaveFocus();
    expect(getByLabelText('Month December')).toHaveAttribute('aria-disabled', 'true');
    await user.keyboard('{ArrowRight}');
    // stays on the same month
    expect(getByLabelText('Month November')).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(getByLabelText('Month August')).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(getByLabelText('Month September')).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    // stays on the same month
    expect(getByLabelText('Month September')).toHaveFocus();
  });
  it("pressing 'Enter' on month change the calendar month presentation to the selected month", async () => {
    const { getByRole, getByLabelText, getByTestId, getByText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={5} />
    );

    expect(getByText('November 2021')).toBeInTheDocument();
    const yearSelectionLabel = 'Change month or year';
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'false');

    // opens the year selection popup
    await user.click(getByRole('button', { name: yearSelectionLabel }));
    expect(getByTestId('base-calendar-year-selection')).toBeInTheDocument();

    getByRole('button', { name: yearSelectionLabel }).focus();

    await user.tab();
    expect(getByLabelText('Year 2021')).toHaveFocus();
    expect(getByLabelText('Year 2021')).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}');
    expect(getByLabelText('Year 2018')).toHaveFocus();
    expect(getByLabelText('Year 2018')).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard('{Enter}');
    expect(getByLabelText('Year 2018')).toHaveAttribute('aria-expanded', 'true');
    await user.tab();
    expect(getByLabelText('Month January')).toHaveFocus();
    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}');
    expect(getByLabelText('Month April')).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(getByText('April 2018')).toBeInTheDocument();
  });
});
