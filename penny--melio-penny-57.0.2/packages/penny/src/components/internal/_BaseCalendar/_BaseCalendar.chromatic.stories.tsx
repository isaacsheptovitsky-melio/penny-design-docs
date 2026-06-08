import { addDays, createDate, noop, subDays } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { screen, userEvent, within } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { _BaseCalendar } from './_BaseCalendar';

const selectedDate = createDate('2021-11-15');

const meta: Meta<typeof _BaseCalendar> = {
  title: 'Chromatic/Base Calendar',
  component: _BaseCalendar,
  parameters: {
    date: createDate('2022-11-15'),
  },
  decorators: [
    (Story) => (
      <Storybook.Container position="relative" width="fit-content">
        {Story()}
      </Storybook.Container>
    ),
  ],
};
export default meta;

export const YearSelection: StoryObj<typeof _BaseCalendar> = {
  render: () => (
    <_BaseCalendar
      onSelect={noop}
      selectedDate={selectedDate}
      data-testid="base-calendar-with-year-selection"
      yearsRange={2}
    />
  ),
  play: async () => {
    const calendar = screen.getByTestId('base-calendar-with-year-selection');
    const yearSelectionTrigger = within(calendar).getByTestId(
      'base-calendar-with-year-selection-header-year-selection-open-trigger'
    );

    await userEvent.click(yearSelectionTrigger);
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const YearSelectionMinDate: StoryObj<typeof _BaseCalendar> = {
  render: () => {
    const minDate = subDays(selectedDate, 3);
    return (
      <_BaseCalendar
        onSelect={noop}
        minDate={minDate}
        selectedDate={selectedDate}
        data-testid="base-calendar-with-year-selection-min-date"
        yearsRange={2}
      />
    );
  },
  play: async () => {
    const calendar = screen.getByTestId('base-calendar-with-year-selection-min-date');
    const yearSelectionTrigger = within(calendar).getByTestId(
      'base-calendar-with-year-selection-min-date-header-year-selection-open-trigger'
    );

    await userEvent.click(yearSelectionTrigger);
    screen.getByTestId('base-calendar-with-year-selection-min-date-year-selection-list').scrollTop = 50;
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const YearSelectionMaxDate: StoryObj<typeof _BaseCalendar> = {
  render: () => {
    const maxDate = addDays(selectedDate, 4);
    return (
      <_BaseCalendar
        onSelect={noop}
        maxDate={maxDate}
        selectedDate={selectedDate}
        data-testid="base-calendar-with-year-selection-max-date"
        yearsRange={2}
      />
    );
  },
  play: async () => {
    const calendar = screen.getByTestId('base-calendar-with-year-selection-max-date');
    const yearSelectionTrigger = within(calendar).getByTestId(
      'base-calendar-with-year-selection-max-date-header-year-selection-open-trigger'
    );

    await userEvent.click(yearSelectionTrigger);
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const ShowTodayAndSelectedAndSecondarySelected: StoryObj<typeof _BaseCalendar> = {
  render: () => {
    const newSelectedDate = createDate('2022-11-16');
    const newSecondaryDate = addDays(newSelectedDate, 1);
    return (
      <_BaseCalendar
        onSelect={noop}
        selectedDate={newSelectedDate}
        secondarySelectedDate={newSecondaryDate}
        showToday
        yearsRange={2}
      />
    );
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const ShowTodayAsDisabled: StoryObj<typeof _BaseCalendar> = {
  render: () => <_BaseCalendar onSelect={noop} showToday weekDays={[4, 5, 6]} yearsRange={2} />,
};

export const ShowTodayAsSelected: StoryObj<typeof _BaseCalendar> = {
  render: () => {
    const todaySelectedDate = createDate('2022-11-15');
    return <_BaseCalendar onSelect={noop} selectedDate={todaySelectedDate} showToday yearsRange={2} />;
  },
};

export const ShowTodayAsSecondarySelected: StoryObj<typeof _BaseCalendar> = {
  render: () => {
    const todaySecondarySelected = createDate('2022-11-15');
    return <_BaseCalendar onSelect={noop} secondarySelectedDate={todaySecondarySelected} showToday yearsRange={2} />;
  },
};

export const DayIsSelectedAndSecondarySelected: StoryObj<typeof _BaseCalendar> = {
  render: () => (
    <_BaseCalendar onSelect={noop} selectedDate={selectedDate} secondarySelectedDate={selectedDate} yearsRange={2} />
  ),
};
