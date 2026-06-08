import { addDays, createDate, type DateTimeFormat, formatDateRange, formatDateTime, noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { InputType } from 'storybook/internal/csf';

import { Card } from '@/components/containers/cards/Card/Card';
import { Group } from '@/components/containers/Group/Group';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { Icon } from '@/components/foundations/Icon/Icon';
import type { FloatingCalendarProps } from '@/components/selectionAndInputs/FloatingCalendar/FloatingCalendar.types';
import {
  extractComponentSource,
  fullScreenChromaticDecorator,
  isUsingVisualTesting,
} from '@/test-utils/storybook.utils';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableDateCell } from '../TableDateCell/TableDateCell';
import { ControlledWithFooterActionsExample } from './examples/DateCell.examples';
import DateCellExamples from './examples/DateCell.examples?raw';

const isVisualTesting = isUsingVisualTesting();

const calendarLegendPropsType = `{
  label: string;
  date?: string;
  testId?: string;
  variant?: 'primary' | 'secondary' | 'today';
}[]`;

const tableDateCellArgTypes: Record<string, InputType> = {
  onSelect: {
    control: false,
    description: 'The callback function for selecting a date.',
    table: {
      category: 'events',
      type: {
        summary: "FloatingCalendarProps['onSelect']",
      },
    },
  },
  value: {
    control: 'date',
    description:
      'Current selected date is determined based on whether the calendar is <b>controlled</b> or <b>uncontrolled</b>.<br />When is <b>controlled</b>, the selected date will be the value displayed in the input field. <br />When is <b>uncontrolled</b>, it will default to a specified value.',
    table: {
      category: 'props',
      type: {
        summary: "FloatingCalendar['value']",
      },
    },
  },
  displayValue: {
    control: false,
    description:
      'This may be used to render custom content inside the cell instead of the `value` which is displayed by default.',
    table: {
      category: 'props',
      type: {
        summary: 'ReactNode',
      },
    },
  },
  placeholder: {
    control: 'text',
    description: 'The text that is shown when no selected date is passed.',
    table: {
      category: 'props',
      type: { summary: 'string' },
      required: true,
    },
  },
  isReadOnly: {
    control: 'boolean',
    description: 'Sets the cell as read-only.',
    table: {
      category: 'props',
    },
  },
};

// TODO: argTypes should not shared between stories, using docgen will eliminate this need
// https://meliorisk.atlassian.net/browse/ME-1349
const datePickerArgTypes: Record<string, InputType> = {
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
  backButton: {
    control: 'object',
    description: "The back button's callback and label.",
    table: {
      category: 'props',
      type: {
        summary: '{onBack: VoidFunction; label: string;}',
      },
    },
  },
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
  showToday: {
    control: 'boolean',
    description: "Decides if to show a marker for today's date.",
    table: {
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
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
  isOpen: {
    control: false,
    description: 'Determines if the calendar is open, based on whether the date cell is <b>controlled</b>',
    table: {
      type: { summary: 'boolean' },
      category: 'props',
    },
  },
  onOpenChange: {
    control: false,
    description:
      'An event callback invoked when the open boolean state should change. <br /> `triggerEvent` is used to determine the source of the change in the open state. <br /> - `trigger`: The open state was changed by the trigger. <br /> - `outside`: The open state was changed by clicking outside the date picker. <br /> - `content`: The open state was changed by selecting a day.',
    table: {
      type: {
        summary: `(isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => void`,
        detail: `OpenChangeTriggerEvent = 'trigger' | 'outside' | 'content';`,
      },
      category: 'events',
    },
  },
  selectedDate: {
    control: 'date',
    description:
      'Set the selected date that will be displayed in the calendar for controlled mode, <b>not in the input field</b>.',
    table: { type: { summary: 'Date' }, category: 'props' },
  },
  footer: {
    control: false,
    description: 'Any free-content to be displayed below the calendar (instead of the "Replace Me" section)',
    table: { type: { summary: 'ReactNode' }, category: 'props' },
  },
  shouldTrapFocus: {
    control: 'boolean',
    description: 'If set, the focus will be trapped within the calendar.',
    table: {
      defaultValue: { summary: 'true' },
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
};

const meta: Meta<typeof TableDateCell> = {
  title: 'Table/Row Cells/Date Cell [pattern]',
  component: TableDateCell,
  decorators: [fullScreenChromaticDecorator],
  parameters: { docs: { source: { type: 'code' } }, date: createDate('2022-11-20') },
  argTypes: { ...tableDateCellArgTypes, ...datePickerArgTypes },
  args: {
    placeholder: 'N/A',
    showToday: !isVisualTesting,
    onOpenChange: undefined,
    shouldTrapFocus: true,
    legendWidth: 'fit-content',
    selectedDateAriaLabel: '',
    secondaryDateAriaLabel: '',
    currentDateAriaLabel: '',
  },
};
export default meta;

export const Main: StoryObj<typeof TableDateCell> = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<FloatingCalendarProps['value'] | undefined>(
      createDate('2022-11-20')
    );
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];
    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'select',
        header: 'Select',
        cell: () => (
          <TableDateCell {...args} value={selectedDate} onSelect={setSelectedDate} defaultIsOpen={isVisualTesting} />
        ),
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const Disabled: StoryObj<typeof TableDateCell> = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<FloatingCalendarProps['value'] | undefined>(
      createDate('2022-11-20')
    );
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'select',
        header: 'Select',
        cell: () => (
          <TableDateCell
            {...args}
            value={selectedDate}
            onSelect={setSelectedDate}
            defaultIsOpen={isVisualTesting}
            isDisabled
          />
        ),
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const WithLegends: StoryObj<typeof TableDateCell> = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<FloatingCalendarProps['value'] | undefined>(
      createDate('2022-11-20')
    );
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];
    const secondarySelectedDate = createDate('2022-11-29');

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'select',
        header: 'Select',
        cell: () => (
          <TableDateCell
            {...args}
            value={selectedDate}
            onSelect={setSelectedDate}
            legendItems={[
              { label: 'Due date', date: selectedDate && formatDateTime(selectedDate), variant: 'secondary' },
              { label: 'Selected', date: selectedDate && formatDateTime(addDays(selectedDate, 1)) },
              { label: 'Today', date: formatDateTime(createDate('2022-11-15')), variant: 'today' },
            ]}
            secondarySelectedDate={secondarySelectedDate}
            defaultIsOpen={isVisualTesting}
          />
        ),
        textAlign: 'start',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const ReadOnly: StoryObj<typeof TableDateCell> = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<FloatingCalendarProps['value'] | undefined>();
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'select-1',
        header: 'No value',
        cell: () => <TableDateCell {...args} value={selectedDate} onSelect={setSelectedDate} isReadOnly />,
        textAlign: 'start',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
      {
        id: 'select-2',
        header: 'With value',
        cell: () => <TableDateCell {...args} value={createDate('2022-11-20')} onSelect={setSelectedDate} isReadOnly />,
        textAlign: 'start',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const WithoutValue: StoryObj<typeof TableDateCell> = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<FloatingCalendarProps['value'] | undefined>();
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'select',
        header: 'Select',
        cell: () => <TableDateCell {...args} value={selectedDate} onSelect={setSelectedDate} />,
        textAlign: 'start',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const WithBackButton: StoryObj<typeof TableDateCell> = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<FloatingCalendarProps['value'] | undefined>(
      createDate('2022-11-20')
    );
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'select',
        header: 'Select',
        cell: () => (
          <TableDateCell
            {...args}
            value={selectedDate}
            onSelect={setSelectedDate}
            backButton={{ onBack: noop, label: 'Back' }}
            defaultIsOpen={isVisualTesting}
          />
        ),
        textAlign: 'start',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const OverrideDisplayValue: StoryObj<typeof TableDateCell> = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<FloatingCalendarProps['value'] | undefined>(
      createDate('2023-11-20')
    );
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];
    const secondarySelectedDate = (selectedDate && addDays(selectedDate, 7)) ?? '';
    const range = formatDateRange(selectedDate, secondarySelectedDate);
    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'select',
        header: 'Select',
        cell: () => (
          <TableDateCell
            {...args}
            value={selectedDate}
            displayValue={
              <Group spacing="s" alignItems="center">
                {range}
                <Tooltip content="This is a range date" shouldAddTriggerFocus>
                  <Icon type="info" size="small" color="default" />
                </Tooltip>
              </Group>
            }
            onSelect={setSelectedDate}
            defaultIsOpen={isVisualTesting}
          />
        ),
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

/**
 * Here's an example of a `DateCell` with a footer that contains actions and full control over the open state (Click on show code for reference).
 *
 * When the user clicks outside the DateCell, it closes by detecting the source of the trigger event.
 */
export const ControlledWithFooterActions: StoryObj<typeof TableDateCell> = {
  render: (args) => <ControlledWithFooterActionsExample {...args} />,
  parameters: {
    docs: { source: { code: extractComponentSource(DateCellExamples, 'ControlledWithFooterActionsExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Formats: StoryObj<typeof TableDateCell> = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<FloatingCalendarProps['value'] | undefined>(
      createDate('2023-11-20')
    );
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];
    const columns: TableColumnDef<{ amount: number }>[] = [
      'MMM d, yyyy',
      'EEE, MMM d, yyyy',
      'EEEE, MMM d, yyyy',
      'MM/dd/yyyy',
    ].map((format) => ({
      id: format,
      header: format,
      cell: () => (
        <TableDateCell {...args} value={selectedDate} onSelect={setSelectedDate} format={format as DateTimeFormat} />
      ),
      size: isUsingVisualTesting() ? 250 : 'm',
    }));

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

/**
 * Here's an example of a `TableDateCell` with custom disabled dates (all Wednesdays).
 */

export const WithDisabledDates: StoryObj<typeof TableDateCell> = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<FloatingCalendarProps['value'] | undefined>(
      createDate('2022-11-20')
    );
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];
    const shouldDisableDate = (date: Date) => date.getDay() === 3;

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'select',
        header: 'Select Date',
        cell: () => (
          <TableDateCell
            {...args}
            value={selectedDate}
            onSelect={setSelectedDate}
            weekDays={[0, 1, 2, 3, 4, 5, 6]}
            shouldDisableDate={shouldDisableDate}
            defaultIsOpen={isVisualTesting}
          />
        ),
        textAlign: 'start',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};
