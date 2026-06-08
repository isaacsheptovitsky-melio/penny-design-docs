import { addDays, createDate, formatDateTime, noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Button } from '@/components/action/Button';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { FormField } from '@/components/form/components/FormField';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { DateField } from './DateField';

const calendarLegendPropsType = `{
  label: string;
  date?: string;
  testId?: string;
  variant?: 'primary' | 'secondary' | 'today';
}[]`;
/**
 * **Validation Behavior**
 * The `DateField` component performs built-in date validation **only when the input is typable**, triggering the
 * `onDateValidationError` prop if any of the following conditions are met:
 *
 * - **Invalid Date Format** (`INVALID_FORMAT`): Triggered if the entered date does not match the expected format.
 * - **Dates Before 1900** (`UNSUPPORTED_YEAR`): Triggered if the entered date is earlier than January 1, 1900.
 * - **Dates Not in Range** (`OUT_OF_RANGE`): Triggered if the date falls outside the range defined by `minDate` or `maxDate`.
 *
 * When a validation error occurs, the `onChange` callback is called with `null`, ensuring that only valid date values
 * are passed to the component.
 *
 *
 * **Note:**
 * The **format** prop only affects the input when the field is typable.
 * When the field is not typable or when the input loses focus (on blur), the date will always be formatted as **'MMM d, yyyy'** (e.g., Apr 28, 2025), regardless of the format prop.
 */

const meta: Meta<typeof DateField> = {
  title: 'Selection & Inputs Components/Date Field',
  component: DateField,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'The size of the field.',
      table: { defaultValue: { summary: 'large' }, type: { summary: 'small | large' }, category: 'props' },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Set the input field to be focused on mount.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Sets the field as disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isViewMode: {
      control: 'boolean',
      description: 'Sets the field as view-mode.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Sets the field as read-only.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Sets the field in loading state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Sets the field in invalid state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for when there is no value.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    viewModePlaceholder: {
      control: 'text',
      description: 'The placeholder text for when there is no value and the field is in view-only mode.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    value: {
      control: 'date',
      description: 'The value of the input field.',
      table: { type: { summary: 'Date | null' }, category: 'props' },
    },
    selectedDate: {
      control: 'date',
      description: 'If set, will mark the selected date in the calendar without changing the value of the input field.',
      table: { type: { summary: 'Date | null' }, category: 'props' },
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
    weekDays: {
      control: 'inline-check',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'Sets which week days to enable for selection.',
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
    defaultIsOpen: {
      control: 'boolean',
      description: 'If set, the calendar is open by default.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    showToday: {
      control: 'boolean',
      description: "If set, today's date is highlighted.",
      table: {
        defaultValue: { summary: 'true' },
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
    hideClear: {
      control: 'boolean',
      description: 'Disables the option to clear the input.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isOpen: {
      control: false,
      description:
        'Determines if the calendar is open and should be used in conjunction with `onOpenChange`. <br /> If `isOpen` is set, the calendar will be controlled by the parent component. <br /> If `isOpen` is not set, the calendar will be uncontrolled and will manage its own state.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    isTypable: {
      control: 'boolean',
      description: 'If set, allows typing in the input field.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    format: {
      control: 'select',
      options: ['MM/dd/yyyy', 'dd/MM/yyyy'],
      description: 'Specifies the input format for the date when users can manually type it.',
      table: {
        defaultValue: { summary: 'MM/dd/yyyy' },
        type: { summary: 'MM/dd/yyyy | dd/MM/yyyy' },
        category: 'props',
      },
    },
    toggleDatePickerRef: {
      description: 'Ref for the toggle date-picker button.',
      table: { type: { summary: 'Ref<HTMLButtonElement | null>' }, category: 'props' },
    },
    toggleDatePickerAriaLabel: {
      control: 'text',
      description: 'The aria-label for the toggle date-picker button.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Date picker' }, category: 'accessibility' },
    },
    toggleDatePickerAriaLabelledBy: {
      control: 'text',
      description:
        'A space-separated list of element IDs whose associated labels should be read when the button is focused.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    clearDateAriaLabel: {
      control: 'text',
      description: 'The aria-label for the clear date button.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Clear date' }, category: 'accessibility' },
    },
    dialogAriaLabel: {
      control: 'text',
      description: 'The aria-label for the calendar dialog.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'date-field' }, type: { summary: 'string' }, category: 'tests' },
    },
    footer: {
      control: false,
      description: 'Any free-content to be displayed below the calendar (instead of the "Replace Me" section).',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    onChange: {
      action: 'onChange',
      description: 'Function called when the date changes.',
      table: { type: { summary: '(value?: Date | null) => void' }, category: 'events' },
    },
    onOpenChange: {
      control: false,
      description:
        'Function called when the calendar is opened or closed and should be used in conjunction with `isOpen`. <br /> If `isOpen` is set, this function should be used to manage the state of the calendar.',
      table: { type: { summary: '(isOpen: boolean) => void' }, category: 'events' },
    },
    onSelectDate: {
      control: false,
      action: 'onSelect',
      description: 'Function called when a new date is selected or cleared.',
      table: { type: { summary: '(date?: Date | null) => void' }, category: 'events' },
    },
    onDateValidationError: {
      control: false,
      action: 'onDateValidationError',
      description:
        'Function called when the input date is invalid ("INVALID_FORMAT" | "UNSUPPORTED_YEAR" | "OUT_OF_RANGE"). It provides a validation reason.',
      table: {
        type: { summary: '(reason: "INVALID_FORMAT" | "UNSUPPORTED_YEAR" | "OUT_OF_RANGE") => void' },
        category: 'events',
      },
    },
    autoComplete: commonFormFieldControls['autoComplete'],
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
    disableYearSelection: {
      control: 'boolean',
      description: "Disables the Calander's year selection.",
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
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
  },
  args: {
    value: undefined,
    selectedDate: undefined,
    secondarySelectedDate: undefined,
    minDate: undefined,
    maxDate: undefined,
    legendItems: undefined,
    legendWidth: 'fit-content',
    weekDays: [1, 2, 3, 4, 5],
    format: 'MM/dd/yyyy',
    placeholder: undefined,
    viewModePlaceholder: undefined,
    size: 'large',
    showToday: true,
    defaultIsOpen: false,
    isOpen: undefined,
    hideClear: false,
    isTypable: false,
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
    isViewMode: false,
    isInvalid: false,
    onChange: undefined,
    onSelectDate: undefined,
    onOpenChange: undefined,
    autoFocus: false,
    disableYearSelection: false,
    shouldTrapFocus: true,
    'data-testid': 'date-field',
    dialogAriaLabel: 'Example calendar dialog',
    'aria-label': 'Date field',
  },
};
export default meta;

export const Main: StoryObj<typeof DateField> = {
  render: (args) => <DateField {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const OpenProgrammatically: StoryObj<typeof DateField> = {
  render: (args) => {
    const ref = useRef<HTMLButtonElement>(null);

    return (
      <Group variant="vertical">
        <DateField {...args} toggleDatePickerRef={ref} />
        <Button onClick={() => ref.current?.click()} label="Open Calendar" />
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Sizes: StoryObj<typeof DateField> = {
  render: (args) => {
    const items = [
      { label: 'Small', component: <DateField {...args} size="small" /> },
      { label: 'Large', component: <DateField {...args} size="large" /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Invalid: StoryObj<typeof DateField> = {
  render: (args) => <DateField {...args} isInvalid onChange={noop} value={createDate('2028-02-09')} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Disabled: StoryObj<typeof DateField> = {
  render: (args) => {
    const items = [
      {
        label: 'With value',
        component: <DateField {...args} isDisabled value={createDate('2028-02-09')} onChange={noop} />,
      },
      { label: 'Without value', component: <DateField {...args} isDisabled /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ViewMode: StoryObj<typeof DateField> = {
  render: (args) => {
    const items = [
      {
        label: 'With value',
        component: <DateField {...args} isViewMode value={createDate('2028-02-09')} onChange={noop} />,
      },
      { label: 'Without value', component: <DateField {...args} isViewMode /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ReadOnly: StoryObj<typeof DateField> = {
  render: (args) => {
    const items = [
      {
        label: 'With value',
        component: <DateField {...args} isReadOnly value={createDate('2028-02-09')} onChange={noop} />,
      },
      { label: 'Without value', component: <DateField {...args} isReadOnly /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Loading: StoryObj<typeof DateField> = {
  args: {
    ...Main.args,
    isLoading: true,
  },
  render: (args) => <DateField {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const HideClear: StoryObj<typeof DateField> = {
  args: {
    ...Main.args,
    hideClear: true,
  },
  render: (args) => <DateField {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 For accessibility reasons, you should describe the date format when the field is type-able.
 */
export const Typable: StoryObj<typeof DateField> = {
  render: ({ value: defaultValue, ...args }) => {
    const [value, setValue] = useState(defaultValue);

    return (
      <>
        <DateField {...args} isTypable aria-describedby="desc-id1" value={value} onChange={setValue} />
        <VisuallyHidden id="desc-id1">date format: MM/DD/YYYY</VisuallyHidden>
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Placeholder: StoryObj<typeof DateField> = {
  render: (args) => (
    <Group variant="vertical">
      <Storybook.Row
        items={[
          {
            label: 'Default',
            component: <DateField {...args} />,
          },
          {
            label: 'View-mode Placeholder',
            component: <DateField {...args} viewModePlaceholder="No date provided" isViewMode />,
          },
        ]}
        alignCompLabel="vertical"
        alignItems="strech"
        flexBasis={0}
      />
      <Storybook.Row
        items={[
          {
            label: 'Typable with default format',
            component: <DateField {...args} isTypable />,
          },
          {
            label: 'Typable with format: "dd/MM/yyyy"',
            component: <DateField {...args} isTypable format="dd/MM/yyyy" />,
          },
        ]}
        alignCompLabel="vertical"
        alignItems="strech"
        flexBasis={0}
      />
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithMinAndMaxDates: StoryObj<typeof DateField> = {
  args: {
    ...Main.args,
    minDate: createDate('2028-02-06'),
    maxDate: createDate('2028-02-12'),
  },
  render: (args) => <DateField {...args} />,
  name: 'With Min and Max Dates',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const OnlyTuesdays: StoryObj<typeof DateField> = {
  args: {
    ...Main.args,
    weekDays: [2],
  },
  render: (args) => <DateField {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithLegends: StoryObj<typeof DateField> = {
  render: (args) => {
    const selectedDate = createDate('2028-03-07');
    const secondarySelectedDate = addDays(selectedDate, 1);
    const date = formatDateTime(secondarySelectedDate);

    return (
      <DateField
        {...args}
        value={selectedDate}
        secondarySelectedDate={secondarySelectedDate}
        legendItems={[
          { label: 'Primary', date: formatDateTime(selectedDate) },
          { label: 'Secondary', date, variant: 'secondary' },
          { label: 'Today', date: formatDateTime(createDate('2028-03-01')), variant: 'today' },
        ]}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithFooter: StoryObj<typeof DateField> = {
  args: {
    ...Main.args,
    footer: <Storybook.ContentPlaceholder />,
  },
  render: (args) => <DateField {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Here's an example of a `DateField` calendar with a footer that contains actions and full control over the open state and selected date.
 */
export const Controlled: StoryObj<typeof DateField> = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedDate, setSelectedDate] = useState(value);
    const [isOpen, setIsOpen] = useState(false);

    const onOpenChange = (open: boolean) => {
      // Sync selected date with the value each time the calendar is opened.
      if (open) setSelectedDate(value);

      setIsOpen(open);
    };

    const saveSelectedDate = () => {
      setValue(selectedDate);
      onOpenChange(false);
    };

    return (
      <DateField
        {...args}
        value={value}
        onChange={setValue}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        footer={
          <Container paddingX="s" paddingY="s">
            <Group justifyContent="space-between">
              <Button variant="tertiary" size="small" label="Close" onClick={() => onOpenChange(false)} />
              <Button variant="primary" size="small" label="Apply" onClick={saveSelectedDate} />
            </Group>
          </Container>
        }
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Here's another example of a `DateField` calendar with a footer that contains actions and full control over the open state and selected date.
 * This example also allows typing in the input field.
 */
export const ControlledAndTypable: StoryObj<typeof DateField> = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedDate, setSelectedDate] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const onOpenChange = (open: boolean) => {
      // Sync selected date with the value each time the calendar is opened.
      if (open) setSelectedDate(value);

      setIsOpen(open);
    };

    const saveSelectedDate = () => {
      setValue(selectedDate);
      onOpenChange(false);
    };

    return (
      <DateField
        {...args}
        isTypable
        value={value}
        onChange={setValue}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        footer={
          <Container paddingX="s" paddingY="s">
            <Group justifyContent="space-between">
              <Button variant="tertiary" size="small" label="Close" onClick={() => onOpenChange(false)} />
              <Button variant="primary" size="small" label="Apply" onClick={saveSelectedDate} />
            </Group>
          </Container>
        }
      />
    );
  },
  name: 'Controlled and Typable',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithFormField: StoryObj<typeof DateField> = {
  render: (args) => (
    <FormField
      labelProps={{
        label: 'Birthday',
        id: 'birthday',
      }}
      helperText="We want to know when to give you a present."
      render={(props) => <DateField {...args} {...props} />}
    />
  ),
};

/**
 * Here's an example of a `DateField` with custom disabled dates (all Wednesdays).
 */

export const WithDisabledDates: StoryObj<typeof DateField> = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    const shouldDisableDate = (date: Date) => date.getDay() === 3;

    return (
      <DateField
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue ?? null)}
        placeholder="Select a date"
        weekDays={[0, 1, 2, 3, 4, 5, 6]}
        shouldDisableDate={shouldDisableDate}
      />
    );
  },
};
