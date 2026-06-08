import { createDate, noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { screen, userEvent, within } from 'storybook/test';

import { Calendar } from './Calendar';

const selectedDate = createDate('2021-11-15');

const meta: Meta<typeof Calendar> = {
  title: 'Chromatic/Calendar',
  component: Calendar,
};
export default meta;

export const YearSelection: StoryObj<typeof Calendar> = {
  render: () => <Calendar onSelect={noop} selectedDate={selectedDate} data-testid="calendar-with-year-selection" />,
  play: async () => {
    const calendar = screen.getByTestId('calendar-with-year-selection');
    const yearSelectionTrigger = within(calendar).getByTestId(
      'calendar-with-year-selection-header-year-selection-open-trigger'
    );

    await userEvent.click(yearSelectionTrigger);
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};
