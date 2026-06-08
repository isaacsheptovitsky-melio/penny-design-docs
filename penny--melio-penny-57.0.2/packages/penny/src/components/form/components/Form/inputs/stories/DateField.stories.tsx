/* eslint-disable @typescript-eslint/no-deprecated */
import { Box } from '@chakra-ui/react';
import { addDays, createDate, formatDateTime, useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Button } from '@/components/action/Button';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { dateValidationReason, type DateValidationReasonKey } from '@/components/selectionAndInputs/DateField';
import { commonFormFieldArgs, commonFormFieldControls } from '@/test-utils/stories.utils';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Form } from '../..';

const calendarLegendPropsType = `{
  label: string;
  date?: string;
  testId?: string;
  variant?: 'primary' | 'secondary' | 'today';
}[]`;

/**
 * **Validation Behavior**
 * The `DateField` component performs built-in date validation **only when the input is typeable**, triggering the
 * `onDateValidationError` prop if any of the following conditions are met:
 *
 * - **Invalid Date Format** (`INVALID_FORMAT`): Triggered if the entered date does not match the expected format.
 * - **Dates Before 1900** (`UNSUPPORTED_YEAR`): Triggered if the entered date is earlier than January 1, 1900.
 * - **Dates Not in Range** (`OUT_OF_RANGE`): Triggered if the date falls outside the range defined by `minDate` or `maxDate`.
 *
 * When a validation error occurs, the `onChange` callback is called with `null`, ensuring that only valid date values
 * are passed to the component.
 *
 * **Using useMelioForm with defaultValues**
 *
 * When setting `defaultValues` in `useMelioForm`, make sure to configure the following:
 * - `selectedDate` – Initialize the state with the provided value and update it in the `onChange` callback.
 * - `value` – Set the correct form value.
 * - `onChange` – Update both the `selectedDate` state and the form value.
 *
 * See the example code in the stories.
 */

const meta: Meta<typeof Form.DateField> = {
  title: 'Internal Components/Form Fields/Date Field',
  component: Form.DateField,
  parameters: {
    docs: { source: { type: 'code' } },
    a11y: {
      // TODO: https://meliorisk.atlassian.net/browse/ME-109859 (aria-dialog-name)
      test: 'todo',
    },
  },
  argTypes: {
    ...commonFormFieldControls,
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
      description: 'The format of the date. (shows for typable mode when focused)',
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
    autoComplete: commonFormFieldControls['autoComplete'],
    disableYearSelection: {
      control: 'boolean',
      description: "Disables the Calander's year selection.",
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    onDateValidationError: {
      control: false,
      action: 'onDateValidationError',
      description:
        'Function called when the input date is invalid. It provides a validation reason (`"INVALID_FORMAT"` or `"UNSUPPORTED_YEAR"`) or `null` if the date is valid.',
      table: {
        type: { summary: '(reason: "INVALID_FORMAT" | "UNSUPPORTED_YEAR" | null) => void' },
        category: 'events',
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
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'date-field' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    value: createDate('2028-02-09'),
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
    showToday: true,
    defaultIsOpen: false,
    isOpen: undefined,
    hideClear: false,
    isTypable: false,
    onChange: undefined,
    onSelectDate: undefined,
    onOpenChange: undefined,
    labelProps: { label: 'Birthday' },
    helperTextProps: { label: 'We want to know when to give you a present.' },
    isLoading: false,
    ...commonFormFieldArgs,
    size: 'large',
    disableYearSelection: false,
    shouldTrapFocus: true,
  },
};
export default meta;

export const Main: StoryObj<typeof Form.DateField> = {
  render: (args) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { main: createDate('2028-02-09') as Date | null | undefined },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('main'));

    return (
      <Form>
        <Form.DateField
          {...registerField('main')}
          value={getValues('main')}
          {...args}
          selectedDate={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('main', date);
          }}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Date picker' }));
  },
};

export const OpenProgrammatically: StoryObj<typeof Form.DateField> = {
  render: (args) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { programmatically: createDate('2028-02-09') as Date | null | undefined },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('programmatically'));

    const ref = useRef<HTMLButtonElement>(null);

    return (
      <Group variant="vertical">
        <Form>
          <Form.DateField
            {...registerField('programmatically')}
            {...args}
            toggleDatePickerRef={ref}
            selectedDate={selectedDate}
            value={getValues('programmatically')}
            onChange={(date) => {
              setSelectedDate(date);
              setValue('programmatically', date);
            }}
          />
        </Form>
        <Button onClick={() => ref.current?.click()} label="Open Calendar" />
      </Group>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.click(within(canvasElement).getByText('Open Calendar'));
  },
};

export const Sizes: StoryObj<typeof Form.DateField> = {
  render: (args) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: {
        small: createDate('2028-02-09') as Date | null | undefined,
        large: createDate('2028-02-09') as Date | null | undefined,
      },
      onSubmit: () => null,
    });

    const [smallSelectedDate, setSmallSelectedDate] = useState(getValues('small'));
    const [largeSelectedDate, setLargeSelectedDate] = useState(getValues('large'));

    const items = [
      {
        label: 'Small',
        component: (
          <Form>
            <Form.DateField
              {...registerField('small')}
              {...args}
              size="small"
              selectedDate={smallSelectedDate}
              value={getValues('small')}
              onChange={(date) => {
                setSmallSelectedDate(date);
                setValue('small', date);
              }}
            />
          </Form>
        ),
      },
      {
        label: 'Large',
        component: (
          <Form>
            <Form.DateField
              {...registerField('large')}
              {...args}
              size="large"
              selectedDate={largeSelectedDate}
              value={getValues('large')}
              onChange={(date) => {
                setLargeSelectedDate(date);
                setValue('large', date);
              }}
            />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const Invalid: StoryObj<typeof Form.DateField> = {
  render: ({ value, ...args }) => {
    const { registerField, setError, getValues, setValue } = useMelioForm({
      defaultValues: { invalid: createDate('9834-12-23') as Date | null | undefined },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('invalid'));

    useEffect(() => {
      setError('invalid', { message: "Wait, you're not born yet." });
    }, [setError]);

    return (
      <Form>
        <Form.DateField
          {...registerField('invalid')}
          {...args}
          selectedDate={selectedDate}
          value={getValues('invalid')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('invalid', date);
          }}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const Disabled: StoryObj<typeof Form.DateField> = {
  render: ({ value, ...args }) => {
    const { registerField } = useMelioForm({
      defaultValues: { disabled: null, disabledWithValue: createDate('2028-02-09') },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.DateField {...registerField('disabled')} {...args} isDisabled />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.DateField {...registerField('disabledWithValue')} {...args} isDisabled />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
};

export const ViewMode: StoryObj<typeof Form.DateField> = {
  render: ({ value, ...args }) => {
    const { registerField } = useMelioForm({
      defaultValues: { viewMode: null, viewModeWithValue: createDate('2028-02-09') },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.DateField {...registerField('viewMode')} {...args} isViewMode />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.DateField {...registerField('viewModeWithValue')} {...args} isViewMode />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
};

export const ReadOnly: StoryObj<typeof Form.DateField> = {
  render: ({ value, ...args }) => {
    const { registerField } = useMelioForm({
      defaultValues: { readOnly: null, readOnlyWithValue: createDate('2028-02-09') },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.DateField {...registerField('readOnly')} {...args} isReadOnly />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.DateField {...registerField('readOnlyWithValue')} {...args} isReadOnly />,
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
};

export const Loading: StoryObj<typeof Form.DateField> = {
  render: ({ value, ...args }) => {
    const { registerField } = useMelioForm({
      defaultValues: { loading: null, loadingWithValue: createDate('2028-02-09') },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.DateField {...registerField('loading')} {...args} isLoading />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.DateField {...registerField('loadingWithValue')} {...args} isLoading />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
};

export const HideClear: StoryObj<typeof Form.DateField> = {
  args: {
    ...Main.args,
    hideClear: true,
  },
  render: (args) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { hideClear: createDate('2028-02-09') as Date | null | undefined },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('hideClear'));

    return (
      <Form>
        <Form.DateField
          {...registerField('hideClear')}
          {...args}
          selectedDate={selectedDate}
          value={getValues('hideClear')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('hideClear', date);
          }}
        />
      </Form>
    );
  },
};

export const WithDifferentFormat: StoryObj<typeof Form.DateField> = {
  args: {
    ...Main.args,
    format: 'dd/MM/yyyy',
  },
  render: (args) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { format: createDate('2028-02-09') as Date | null | undefined },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('format'));

    return (
      <Form>
        <Form.DateField
          {...registerField('format')}
          {...args}
          isTypable
          selectedDate={selectedDate}
          value={getValues('format')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('format', date);
          }}
        />
      </Form>
    );
  },
};

export const Typable: StoryObj<typeof Form.DateField> = {
  args: {
    ...Main.args,
    isTypable: true,
  },
  render: ({ value: _, onChange: __, ...args }) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { typable: createDate('2028-02-09') as Date | null | undefined },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('typable'));

    return (
      <Form>
        <Form.DateField
          {...registerField('typable')}
          {...args}
          selectedDate={selectedDate}
          value={getValues('typable')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('typable', date);
          }}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithLabelTooltip: StoryObj<typeof Form.DateField> = {
  render: (args) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { main: createDate('2028-02-09') as Date | null | undefined },
      onSubmit: () => null,
    });
    const [selectedDate, setSelectedDate] = useState(getValues('main'));
    const labelWithTooltip = {
      label: 'Birthday',
      tooltipProps: {
        content: (
          <>
            <Box as="span" display="inline-flex" textStyle="body4Semi">
              Title
            </Box>
            Label
          </>
        ),
      },
    };

    return (
      <Form>
        <Form.DateField
          {...registerField('main')}
          {...args}
          aria-label={undefined}
          labelProps={labelWithTooltip as TypographyLabelProps}
          selectedDate={selectedDate}
          value={getValues('main')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('main', date);
          }}
        />
      </Form>
    );
  },
  play: async ({ canvasElement }) => userEvent.hover(within(canvasElement).getByTestId('label-tooltip-trigger')),
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.DateField> = {
  render: ({ isRequired, ...args }) => {
    type FormFields = { optional: Date | null | undefined; required: Date | null | undefined };

    const schema = yup.object().shape({
      optional: yup.date(),
      required: yup.date().required(),
    }) as SchemaOf<FormFields>;

    const { registerField, getValues, setValue } = useMelioForm<FormFields>({
      schema,
      defaultValues: {
        required: createDate('2028-02-09'),
        optional: createDate('2028-02-09'),
      },
      onSubmit: () => null,
    });

    const [optionalSelectedDate, setOptionalSelectedDate] = useState(getValues('optional'));
    const [requiredSelectedDate, setRequiredSelectedDate] = useState(getValues('required'));

    const items = [
      {
        label: 'Required',
        component: (
          <Form>
            <Form.DateField
              {...registerField('required')}
              {...args}
              selectedDate={requiredSelectedDate}
              value={getValues('required')}
              onChange={(date) => {
                setRequiredSelectedDate(date);
                setValue('required', date);
              }}
            />
          </Form>
        ),
      },
      {
        label: 'Optional',
        component: (
          <Form>
            <Form.DateField
              {...registerField('optional')}
              {...args}
              selectedDate={optionalSelectedDate}
              value={getValues('optional')}
              onChange={(date) => {
                setOptionalSelectedDate(date);
                setValue('optional', date);
              }}
            />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.DateField> = {
  render: ({ showOptionalIndicator, ...args }) => {
    type FormFields = { optional: Date | null | undefined };

    const schema = yup.object().shape({
      optional: yup.date(),
    }) as SchemaOf<FormFields>;

    const { registerField, getValues, setValue } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: createDate('2028-02-09') },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('optional'));

    return (
      <Form>
        <Form.DateField
          {...registerField('optional')}
          {...args}
          selectedDate={selectedDate}
          value={getValues('optional')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('optional', date);
          }}
        />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const Placeholder: StoryObj<typeof Form.DateField> = {
  render: ({ value, ...args }) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Group variant="vertical">
        <Storybook.Row
          items={[
            {
              label: 'Default',
              component: (
                <Form>
                  <Form.DateField {...registerField('default')} {...args} />
                </Form>
              ),
            },
            {
              label: 'View-mode Placeholder',
              component: (
                <Form>
                  <Form.DateField
                    {...registerField('viewModePlaceholder')}
                    {...args}
                    viewModePlaceholder="No date provided"
                    isViewMode
                  />
                </Form>
              ),
            },
          ]}
          alignCompLabel="vertical"
          alignItems="stretch"
          flexBasis={0}
        />
        <Storybook.Row
          items={[
            {
              label: 'Typable with default format',
              component: (
                <Form>
                  <Form.DateField {...registerField('defaultFormat')} {...args} isTypable />
                </Form>
              ),
            },
            {
              label: 'Typable with format: "dd/MM/yyyy"',
              component: (
                <Form>
                  <Form.DateField {...registerField('differentFormat')} {...args} isTypable format="dd/MM/yyyy" />
                </Form>
              ),
            },
          ]}
          alignCompLabel="vertical"
          alignItems="stretch"
          flexBasis={0}
        />
      </Group>
    );
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const WithMinAndMaxDates: StoryObj<typeof Form.DateField> = {
  render: (args) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { minAndMax: createDate('2028-02-09') as Date | null | undefined },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('minAndMax'));

    return (
      <Form>
        <Form.DateField
          {...registerField('minAndMax')}
          {...args}
          minDate={createDate('2028-02-06')}
          maxDate={createDate('2028-02-12')}
          selectedDate={selectedDate}
          value={getValues('minAndMax')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('minAndMax', date);
          }}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  name: 'With Min and Max Dates',
};

export const OnlyTuesdays: StoryObj<typeof Form.DateField> = {
  render: ({ value, ...args }) => {
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.DateField {...registerField('tuesdays')} {...args} weekDays={[2]} />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithLegends: StoryObj<typeof Form.DateField> = {
  render: ({ value, ...args }) => {
    const defaultSelectedDate = createDate('2028-03-07');
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { legends: defaultSelectedDate as Date | null | undefined },
      onSubmit: () => null,
    });
    const secondarySelectedDate = addDays(defaultSelectedDate, 1);
    const date = formatDateTime(secondarySelectedDate);
    const [selectedDate, setSelectedDate] = useState(getValues('legends'));

    return (
      <Form>
        <Form.DateField
          {...registerField('legends')}
          {...args}
          secondarySelectedDate={secondarySelectedDate}
          legendItems={[
            { label: 'Legend 1', date: formatDateTime(selectedDate) },
            { label: 'Legend 2', date, variant: 'secondary' },
            { label: 'Today', date: formatDateTime(createDate('2028-03-01')), variant: 'today' },
          ]}
          selectedDate={selectedDate}
          value={getValues('legends')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('legends', date);
          }}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithFooter: StoryObj<typeof Form.DateField> = {
  render: (args) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { footer: createDate('2028-02-09') as Date | null | undefined },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('footer'));

    return (
      <Form>
        <Form.DateField
          {...registerField('footer')}
          {...args}
          footer={<Storybook.ContentPlaceholder />}
          selectedDate={selectedDate}
          value={getValues('footer')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('footer', date);
          }}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Date picker' }));
  },
};

/**
 * Here's an example of a `DateField` calendar with a footer that contains actions and full control over the open state and selected date.
 */
export const Controlled: StoryObj<typeof Form.DateField> = {
  render: (args) => {
    const { registerField, setValue, getValues } = useMelioForm({
      defaultValues: { controlled: args.value },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('controlled'));
    const [isOpen, setIsOpen] = useState(false);

    const onOpenChange = (open: boolean) => {
      // Sync selected date with the value each time the calendar is opened.
      if (open) setSelectedDate(getValues('controlled'));

      setIsOpen(open);
    };

    const saveSelectedDate = () => {
      setValue('controlled', selectedDate);
      onOpenChange(false);
    };

    return (
      <Form>
        <Form.DateField
          {...args}
          {...registerField('controlled')}
          value={getValues('controlled')}
          onChange={(date) => setValue('controlled', date)}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          footer={
            <Container paddingX="m" paddingY="m">
              <Group justifyContent="space-between">
                <Button variant="tertiary" size="small" label="Close" onClick={() => onOpenChange(false)} />
                <Button variant="primary" size="small" label="Apply" onClick={saveSelectedDate} />
              </Group>
            </Container>
          }
        />
      </Form>
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
export const ControlledAndTypable: StoryObj<typeof Form.DateField> = {
  render: ({ value, onChange: _, ...args }) => {
    const { registerField, setValue, getValues, setError, clearErrors } = useMelioForm({
      defaultValues: { controlledAndTypable: value },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('controlledAndTypable'));
    const [isOpen, setIsOpen] = useState(false);

    const onOpenChange = (open: boolean) => {
      // Sync selected date with the value each time the calendar is opened.
      if (open) setSelectedDate(getValues('controlledAndTypable'));

      setIsOpen(open);
    };

    const saveSelectedDate = () => {
      setValue('controlledAndTypable', selectedDate);
      onOpenChange(false);
    };

    const onDateValidationError = (reason?: DateValidationReasonKey) => {
      if (reason) setError('controlledAndTypable', { message: dateValidationReason[reason] });
      else clearErrors();
    };
    return (
      <Form>
        <Form.DateField
          {...args}
          {...registerField('controlledAndTypable')}
          value={getValues('controlledAndTypable')}
          onChange={(date) => setValue('controlledAndTypable', date)}
          isTypable
          onDateValidationError={onDateValidationError}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          minDate={createDate('2028-02-06')}
          maxDate={createDate('2028-02-12')}
          footer={
            <Container paddingX="m" paddingY="m">
              <Group justifyContent="space-between">
                <Button variant="tertiary" size="small" label="Close" onClick={() => onOpenChange(false)} />
                <Button variant="primary" size="small" label="Apply" onClick={saveSelectedDate} />
              </Group>
            </Container>
          }
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  name: 'Controlled and Typable',
};

/**
 For accessibility reasons, you should describe the date format when the field is type-able.
 */
export const TypableHelperText: StoryObj<typeof Form.DateField> = {
  render: ({ value, ...args }) => {
    const { registerField, getValues, setValue } = useMelioForm({
      defaultValues: { default: createDate('2028-02-09') as Date | null | undefined },
      onSubmit: () => null,
    });

    const [selectedDate, setSelectedDate] = useState(getValues('default'));

    return (
      <Form>
        <Form.DateField
          {...registerField('default')}
          {...args}
          isTypable
          helperTextProps={{
            label: (
              <>
                <VisuallyHidden>date format: MM/DD/YYYY</VisuallyHidden>
                {args.helperTextProps?.label}
              </>
            ),
          }}
          selectedDate={selectedDate}
          value={getValues('default')}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('default', date);
          }}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.DateField ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.DateField> = {
  render: (args) => {
    const [isFieldHidden, setIsFieldHidden] = useBoolean(true);
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });

    return (
      <Group variant="vertical">
        <Storybook.Container maxWidth="150px">
          <Button label={`${isFieldHidden ? 'Show' : 'Hide'} Field`} onClick={setIsFieldHidden.toggle} />
        </Storybook.Container>
        <Form>
          {/* Field with isHidden prop, hidden from UI but still exists in the DOM */}
          <Form.DateField {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.DateField {...registerField('field2')} {...args} />}
        </Form>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
