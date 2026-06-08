import { addDays, createDate, formatDateTime, noop, subDays } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { _BaseCalendar } from './_BaseCalendar';

const selectedDate = createDate('2021-11-15');

const calendarLegendPropsType = `{
  label: string;
  date?: string;
  testId?: string;
  variant?: 'primary' | 'secondary' | 'today';
}[]`;

const meta: Meta<typeof _BaseCalendar> = {
  title: 'Internal Components/Base Calendar',
  component: _BaseCalendar,
  parameters: {
    date: createDate('2022-11-15'),
  },
  argTypes: {
    onSelect: {
      control: false,
      action: 'select',
      description: 'Callback to call when a date is selected.',
      table: {
        category: 'events',
        type: {
          summary: '(date: Date) => void',
        },
      },
    },
    weekDays: {
      control: 'inline-check',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'Decides what week days to enable for selection.',
      table: {
        defaultValue: { summary: '[1, 2, 3, 4, 5]' },
        type: { summary: 'Array<0 | 1 | 2 | 3 | 4 | 5 | 6>' },
        category: 'props',
      },
    },
    shouldDisableDate: {
      control: false,
      description: 'Callback to determine if a date should be disabled.',
      table: {
        type: { summary: '(date: Date) => boolean' },
        category: 'props',
      },
    },
    selectedDate: {
      description: 'Marks a primary selected date.',
      control: 'date',
      table: { type: { summary: 'Date' }, category: 'props' },
    },
    secondarySelectedDate: {
      control: 'date',
      description: 'Marks a secondary selected date.',
      table: { type: { summary: 'Date' }, category: 'props' },
    },
    minDate: {
      control: 'date',
      description: 'The minimum selectable date.',
      table: { type: { summary: 'Date' }, category: 'props' },
    },
    maxDate: {
      control: 'date',
      description: 'The maximum selectable date.',
      table: { type: { summary: 'Date' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Decides if the calendar is disabled.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    showToday: {
      control: 'boolean',
      description: "Decides if to show today's date.",
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    legendItems: {
      control: 'object',
      description: 'An array of the legends under the calendar.',
      table: {
        category: 'props',
        type: {
          summary: 'CalendarLegendProps[]',
          detail: calendarLegendPropsType,
        },
      },
    },
    yearsRange: {
      control: 'number',
      description:
        'The range of years to show in the year selection, the default is 100 ahead, and 100 before the current year (The years range is affected by the minDate and maxDate).',
      table: {
        defaultValue: { summary: '100' },
        type: { summary: 'number' },
        category: 'props',
      },
    },
    legendWidth: {
      control: 'select',
      description: 'Decides the width of the legend items.',
      options: ['fit-content', 'full'],
      table: {
        defaultValue: { summary: "'fit-content'" },
        type: { summary: "'fit-content' | 'full'" },
        category: 'props',
      },
    },
    disableYearSelection: {
      control: 'boolean',
      description: "Disables the Calander's year selection.",
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    selectedDateAriaLabel: {
      control: 'text',
      description: 'The `aria-label` of the selected date (current value) in date picker calendar.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    secondaryDateAriaLabel: {
      control: 'text',
      description: 'The `aria-label` of the secondary selected date in date picker calendar.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    currentDateAriaLabel: {
      control: 'text',
      description: 'The `aria-label` of the current date (today) in date picker calendar.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
  },
  args: {
    weekDays: [1, 2, 3, 4, 5],
    selectedDate,
    secondarySelectedDate: addDays(selectedDate, 7),
    isDisabled: false,
    showToday: false,
    legendItems: [],
    disableYearSelection: false,
    selectedDateAriaLabel: '',
    secondaryDateAriaLabel: '',
    currentDateAriaLabel: '',
  },
};
export default meta;

export const Main: StoryObj<typeof _BaseCalendar> = {
  render: ({ onSelect, selectedDate, ...args }) => {
    const [selectedValue, setSelectedValue] = useState(selectedDate);

    return (
      <Storybook.Container position="relative" width="min-content">
        <_BaseCalendar {...args} onSelect={setSelectedValue} selectedDate={selectedValue} />
      </Storybook.Container>
    );
  },
};

export const Disabled: StoryObj<typeof _BaseCalendar> = {
  render: (args) => (
    <Storybook.Container position="relative" width="min-content">
      <_BaseCalendar {...args} isDisabled />
    </Storybook.Container>
  ),
};

export const MinAndMaxDate: StoryObj<typeof _BaseCalendar> = {
  render: () => {
    const secondarySelectedDate = addDays(selectedDate, 1);
    const minDate = subDays(selectedDate, 3);
    const maxDate = addDays(selectedDate, 4);
    const items = [
      {
        label: 'Min Date',
        component: (
          <Storybook.Container position="relative" width="min-content">
            <_BaseCalendar
              weekDays={[0, 1, 2, 3, 4, 5, 6]}
              onSelect={() => null}
              selectedDate={selectedDate}
              secondarySelectedDate={secondarySelectedDate}
              minDate={minDate}
            />
          </Storybook.Container>
        ),
      },
      {
        label: 'Max Date',
        component: (
          <Storybook.Container position="relative" width="min-content">
            <_BaseCalendar
              weekDays={[0, 1, 2, 3, 4, 5, 6]}
              onSelect={() => null}
              selectedDate={selectedDate}
              secondarySelectedDate={secondarySelectedDate}
              maxDate={maxDate}
            />
          </Storybook.Container>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};

/**
 * Here's an example of how to use the `legendItems` prop, which is an array containing the legends for the calendar.
 *
 *  Additionally, the `legendWidth` prop is used to determine the width of the legend items:
 * - `fit-content`, the default value, will cause the legend items to hug the content
 * - `full` will make the legend items take equal width based on the items' length.
 */
export const WithLegend: StoryObj<typeof _BaseCalendar> = {
  render: () => {
    const secondarySelectedDate = addDays(selectedDate, 1);
    const date = formatDateTime(secondarySelectedDate);

    return (
      <Storybook.Container position="relative" width="min-content">
        <_BaseCalendar
          weekDays={[0, 1, 2, 3, 4, 5, 6]}
          onSelect={() => null}
          selectedDate={selectedDate}
          secondarySelectedDate={secondarySelectedDate}
          legendWidth="full"
          legendItems={[
            {
              label: 'Deducted',
              date: formatDateTime(selectedDate),
              variant: 'primary',
            },
            { label: 'Bill due', date, variant: 'secondary' },
            {
              label: 'Today - Is a very long text that should be truncated',
              date: formatDateTime(createDate('2022-11-15')),
              variant: 'today',
            },
          ]}
        />
      </Storybook.Container>
    );
  },
};

export const ShowToday: StoryObj<typeof _BaseCalendar> = {
  render: () => (
    <Storybook.Container position="relative" width="min-content">
      <_BaseCalendar onSelect={noop} showToday />
    </Storybook.Container>
  ),
};

/**
 * Here's an example of a `_BaseCalendar` with custom disabled dates (all Wednesdays).
 */

export const WithDisabledDates: StoryObj<typeof _BaseCalendar> = {
  render: () => {
    const shouldDisableDate = (date: Date) => date.getDay() === 3;

    return (
      <_BaseCalendar
        onSelect={() => null}
        selectedDate={selectedDate}
        weekDays={[0, 1, 2, 3, 4, 5, 6]}
        shouldDisableDate={shouldDisableDate}
      />
    );
  },
};
