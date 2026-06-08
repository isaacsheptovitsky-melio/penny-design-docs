import { SimpleGrid } from '@chakra-ui/react';
import { addDays, createDate, formatDateTime, subDays } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';

import { Calendar } from './Calendar';

const selectedDate = createDate('2021-11-15');

const calendarLegendPropsType = `{
  label: string;
  date?: string;
  testId?: string;
  variant?: 'primary' | 'secondary' | 'today';
}[]`;

const meta: Meta<typeof Calendar> = {
  title: 'Selection & Inputs Components/Calendar',
  component: Calendar,
  parameters: {
    date: createDate('2022-11-15'),
  },
  argTypes: {
    onSelect: {
      control: false,
      action: 'select',
      description: 'Callback to call when a date is selected',
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
    footer: {
      control: false,
      description: 'Any free-content to be displayed below the calendar (instead of the "Replace Me" section)',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
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
    legendWidth: {
      control: 'select',
      description: 'Decides the width of the legend items.',
      options: ['fit-content', 'full'],
      table: {
        defaultValue: { summary: 'fit-content' },
        type: { summary: 'fit-content | full' },
        category: 'props',
      },
    },
    selectedDateAriaLabel: {
      control: 'text',
      description: 'The `aria-label` of the selected date in date picker calendar.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    currentDateAriaLabel: {
      control: 'text',
      description: 'The `aria-label` of the current date (today) in date picker calendar.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
  },
  args: {
    selectedDate,
    secondarySelectedDate: addDays(selectedDate, 7),
    isDisabled: false,
    footer: <Storybook.ContentPlaceholder borderRadius="global.50" />,
    showToday: false,
    legendItems: [],
    weekDays: [1, 2, 3, 4, 5],
    legendWidth: 'fit-content',
  },
};
export default meta;

export const Main: StoryObj<typeof Calendar> = {
  render: ({ onSelect, selectedDate, ...args }) => {
    const [selectedValue, setSelectedValue] = useState(selectedDate);

    return <Calendar {...args} onSelect={setSelectedValue} selectedDate={selectedValue} />;
  },
};

export const Disabled: StoryObj<typeof Calendar> = {
  render: (args) => <Calendar {...args} isDisabled />,
};

export const MinAndMaxDate: StoryObj<typeof Calendar> = {
  render: (args) => {
    const secondarySelectedDate = addDays(selectedDate, 1);
    const minDate = subDays(selectedDate, 3);
    const maxDate = addDays(selectedDate, 4);

    return (
      <SimpleGrid columns={2}>
        <Group variant="vertical">
          <Text>Min Date</Text>
          <Calendar
            {...args}
            weekDays={[0, 1, 2, 3, 4, 5, 6]}
            onSelect={() => null}
            selectedDate={selectedDate}
            secondarySelectedDate={secondarySelectedDate}
            minDate={minDate}
          />
        </Group>
        <Group variant="vertical">
          <Text>Max Date</Text>
          <Calendar
            {...args}
            weekDays={[0, 1, 2, 3, 4, 5, 6]}
            onSelect={() => null}
            selectedDate={selectedDate}
            secondarySelectedDate={secondarySelectedDate}
            maxDate={maxDate}
          />
        </Group>
      </SimpleGrid>
    );
  },
};

export const WithLegend: StoryObj<typeof Calendar> = {
  render: (args) => {
    const secondarySelectedDate = addDays(selectedDate, 1);
    const date = formatDateTime(secondarySelectedDate);

    return (
      <Calendar
        {...args}
        weekDays={[0, 1, 2, 3, 4, 5, 6]}
        onSelect={() => null}
        selectedDate={selectedDate}
        secondarySelectedDate={secondarySelectedDate}
        legendItems={[
          { label: 'Deducted', date: formatDateTime(selectedDate) },
          { label: 'Bill due', date, variant: 'secondary' },
          { label: 'Today', date: formatDateTime(createDate('2022-11-15')), variant: 'today' },
        ]}
      />
    );
  },
};

export const ShowToday: StoryObj<typeof Calendar> = {
  render: ({ selectedDate, secondarySelectedDate, ...args }) => <Calendar {...args} showToday />,
};

export const WithDisabledDates: StoryObj<typeof Calendar> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<Date | undefined>(selectedDate);
    const shouldDisableDate = (date: Date) => date.getDay() === 3;

    return (
      <Calendar
        {...args}
        onSelect={setSelectedValue}
        selectedDate={selectedValue}
        weekDays={[0, 1, 2, 3, 4, 5, 6]}
        shouldDisableDate={shouldDisableDate}
      />
    );
  },
};
