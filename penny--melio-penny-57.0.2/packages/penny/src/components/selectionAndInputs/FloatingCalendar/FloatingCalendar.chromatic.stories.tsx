import { createDate, formatDateTime, noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { screen, userEvent, within } from 'storybook/test';

import { Button } from '@/components/action/Button';
import { Icon } from '@/components/foundations/Icon';
import { fullScreenChromaticDecorator } from '@/test-utils/storybook.utils';

import { FloatingCalendar } from './FloatingCalendar';

const selectedDate = createDate('2021-11-15');

const meta: Meta<typeof FloatingCalendar> = {
  title: 'Chromatic/Floating Calendar',
  component: FloatingCalendar,
  decorators: [fullScreenChromaticDecorator],
};
export default meta;

export const YearSelection: StoryObj<typeof FloatingCalendar> = {
  render: ({ value, ...args }) => {
    const [selection, setSelection] = useState<Date | undefined>(selectedDate);

    const formattedValue = formatDateTime(selection);

    const handleSelect = (date: Date) => {
      setSelection(date);
    };

    const triggerComponent = (
      <Button
        variant="tertiary"
        size="large"
        leftElement={<Icon aria-hidden size="small" type="calendar" color="inherit" />}
        label={formattedValue ?? 'Please select'}
        data-testid="floating-calendar-trigger"
      />
    );
    return (
      <FloatingCalendar
        {...args}
        isOpen
        aria-label="pick date"
        trigger={triggerComponent}
        value={selection}
        onSelect={handleSelect}
        onOpenChange={noop}
        data-testid="floating-calendar-year-selection"
      />
    );
  },
  play: async () => {
    const calendar = screen.getByTestId('floating-calendar-year-selection');
    const yearSelectionTrigger = within(calendar).getByTestId('calendar-header-year-selection-open-trigger');

    await userEvent.click(yearSelectionTrigger, { delay: 1 });
  },
};
