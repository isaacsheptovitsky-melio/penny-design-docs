import { createDate } from '@melio/penny-utils';
import { expect } from 'vitest';

import { _BaseCalendar } from '../_BaseCalendar';
import { renderCalendar } from './test.utils';

describe('_BaseCalendar.YearSelection', () => {
  const spyScrollTo = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(createDate('2021-11-15').getTime());
    Object.defineProperty(global.window.HTMLElement.prototype, 'scrollTo', { value: spyScrollTo });
    spyScrollTo.mockClear();
  });

  it('opens the year selection on the current year', async () => {
    const { getByTestId, getByLabelText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={2} showToday />
    );
    const yearSelectionTrigger = getByTestId('base-calendar-header-year-selection-open-trigger');

    await user.click(yearSelectionTrigger);

    expect(getByTestId('base-calendar-year-selection')).toBeInTheDocument();
    const yearSelectionItem = getByLabelText('Year 2021');
    expect(yearSelectionItem).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens the year selection on the year of the selected date', async () => {
    const { getByTestId, getByLabelText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={2} showToday selectedDate={createDate('2019-11-15')} />
    );
    const yearSelectionTrigger = getByTestId('base-calendar-header-year-selection-open-trigger');

    await user.click(yearSelectionTrigger);

    expect(getByTestId('base-calendar-year-selection')).toBeInTheDocument();
    const yearSelectionItem = getByLabelText('Year 2019');
    expect(yearSelectionItem).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles the year selection', async () => {
    const { getByTestId, getByRole, queryByTestId, getByLabelText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={2} />
    );

    const yearSelectionLabel = 'Change month or year';
    await user.click(getByRole('button', { name: yearSelectionLabel }));

    const yearSelection = getByTestId('base-calendar-year-selection');

    expect(yearSelection).toBeInTheDocument();
    expect(getByLabelText(yearSelectionLabel)).toHaveAttribute('aria-expanded', 'true');

    await user.click(getByRole('button', { name: yearSelectionLabel }));

    expect(queryByTestId('base-calendar-year-selection')).not.toBeInTheDocument();
  });

  it('click on month from the same year sets the active month according to the selection', async () => {
    const { getByTestId, getByText, getByLabelText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={2} showToday />
    );
    const yearSelectionTrigger = getByTestId('base-calendar-header-year-selection-open-trigger');

    await user.click(yearSelectionTrigger);
    expect(getByLabelText('Year 2021')).toHaveAttribute('aria-expanded', 'true');

    await user.click(getByLabelText('Month September'));

    expect(getByText('September 2021')).toBeInTheDocument();
  });

  it('click on different year and month sets the active month according to the selection', async () => {
    const { getByTestId, getByText, getByLabelText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={2} showToday />
    );
    const yearSelectionTrigger = getByTestId('base-calendar-header-year-selection-open-trigger');

    await user.click(yearSelectionTrigger);
    expect(getByLabelText('Year 2021')).toHaveAttribute('aria-expanded', 'true');

    // select year
    await user.click(getByLabelText('Year 2022'));
    expect(getByLabelText('Year 2021')).toHaveAttribute('aria-expanded', 'false');
    expect(getByLabelText('Year 2022')).toHaveAttribute('aria-expanded', 'true');

    // select month
    await user.click(getByLabelText('Month September'));

    expect(getByText('September 2022')).toBeInTheDocument();
  });

  it('highlights the correct active month on the current year.', async () => {
    const { getByTestId, getByLabelText, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} yearsRange={2} showToday />
    );
    const yearSelectionTrigger = getByTestId('base-calendar-header-year-selection-open-trigger');

    await user.click(yearSelectionTrigger);
    expect(getByLabelText('Year 2021')).toHaveAttribute('aria-expanded', 'true');
    expect(getByLabelText('Month November')).toHaveAttribute('data-active', 'true');

    // click on different year
    await user.click(getByLabelText('Year 2022'));
    expect(getByLabelText('Month November')).not.toHaveAttribute('data-active');
  });

  it('shows 100 years items before and after the current year by default', async () => {
    const currentYear = 2021;
    const { getByTestId, getAllByTestId, user } = renderCalendar(<_BaseCalendar onSelect={vi.fn()} showToday />);
    const yearSelectionTrigger = getByTestId('base-calendar-header-year-selection-open-trigger');

    await user.click(yearSelectionTrigger);
    const years = getAllByTestId('base-calendar-year-selection-list-item');
    expect(years).toHaveLength(201);
    expect(years[0]).toHaveTextContent(`${currentYear - 100}`);
    expect(years[years.length - 1]).toHaveTextContent(`${currentYear + 100}`);
  });

  it('shows 2 years items before and after the current year according to the given years range', async () => {
    const currentYear = 2021;
    const { getByTestId, getAllByTestId, user } = renderCalendar(
      <_BaseCalendar onSelect={vi.fn()} showToday yearsRange={2} />
    );
    const yearSelectionTrigger = getByTestId('base-calendar-header-year-selection-open-trigger');

    await user.click(yearSelectionTrigger);
    const years = getAllByTestId('base-calendar-year-selection-list-item');
    expect(years).toHaveLength(5);
    expect(years[0]).toHaveTextContent(`${currentYear - 2}`);
    expect(years[years.length - 1]).toHaveTextContent(`${currentYear + 2}`);
  });

  it('shows years items and months before the current year according to the given min date', async () => {
    const currentYear = 2021;
    const minDateMonth = 8;
    const { getByTestId, getAllByTestId, user } = renderCalendar(
      <_BaseCalendar
        onSelect={vi.fn()}
        showToday
        yearsRange={2}
        minDate={createDate(`${currentYear}-0${minDateMonth}-15`)}
      />
    );
    const yearSelectionTrigger = getByTestId('base-calendar-header-year-selection-open-trigger');

    await user.click(yearSelectionTrigger);
    const years = getAllByTestId('base-calendar-year-selection-list-item');
    expect(years).toHaveLength(3);
    expect(years[0]).toHaveTextContent(`${currentYear}`);

    const months = getAllByTestId(/^base-calendar-year-selection-list-item-month-/);
    months.forEach((month, index) => {
      expect(month).toHaveAttribute('aria-disabled', index + 1 < minDateMonth ? 'true' : 'false');
    });
  });

  it('shows years items and months after the current year according to the given max date', async () => {
    const currentYear = 2021;
    const maxDateMonth = 8;
    const { getByTestId, getAllByTestId, user } = renderCalendar(
      <_BaseCalendar
        onSelect={vi.fn()}
        showToday
        yearsRange={2}
        maxDate={createDate(`${currentYear}-0${maxDateMonth}-15`)}
      />
    );
    const yearSelectionTrigger = getByTestId('base-calendar-header-year-selection-open-trigger');

    await user.click(yearSelectionTrigger);
    const years = getAllByTestId('base-calendar-year-selection-list-item');
    expect(years).toHaveLength(3);
    expect(years[years.length - 1]).toHaveTextContent(`${currentYear}`);

    const months = getAllByTestId(/^base-calendar-year-selection-list-item-month-/);
    months.forEach((month, index) => {
      expect(month).toHaveAttribute('aria-disabled', index + 1 > maxDateMonth ? 'true' : 'false');
    });
  });
});
