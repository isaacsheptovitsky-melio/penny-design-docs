import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { FormField } from '@/components/form/components/FormField';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { type RadioOption } from '../Radio/Radio.types';
import { RadioGroup } from './RadioGroup';

const radioOptionType = `{
  value: string;
  label?: ReactNode;
  mainLabelProps?: {
    label: string;
    secondaryLabel?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    pillProps?: {
      status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
      label: string;
      type?: 'primary' | 'secondary' | 'status';
      } | {
      status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
      label: string;
      type?: 'primary' | 'secondary' | 'status';
    }[]];
    tooltipProps?: Pick<TooltipProps, 'content'> & { triggerStatus?: _IconIndicatorProps['variant'] };
    variant?: 'default' | 'bold';
  };
  descriptionProps?: {
    label: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
  } & OneOrNone<{
    link: { label: string; href: string };
    action: {
      label: string;
      onClick: MouseEventHandler;
      'data-testid'?: string;
    };
  }>;
  disabled?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  isReadOnly?: boolean;
  id?: string;
}[]`;

const options: RadioOption[] = [
  {
    mainLabelProps: { label: 'Main label' },
    value: '1',
  },
  {
    mainLabelProps: { label: 'Main label' },
    value: '2',
  },
  {
    mainLabelProps: { label: 'Main label' },
    value: '3',
  },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Selection & Inputs Components/Radio Group',
  component: RadioGroup,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    value: {
      description: 'Selected value',
      control: 'text',
      type: { name: 'string', required: true },
      table: { type: { summary: 'string' }, category: 'props' },
    },
    options: {
      description: 'Sets the radio buttons and their description.',
      table: { type: { summary: 'RadioOption[]', detail: radioOptionType }, category: 'props' },
      type: { name: 'other', value: 'RadioOption[]', required: true },
    },
    variant: {
      control: 'select',
      description: 'Sets the layout of the options.',
      options: ['horizontal', 'vertical'],
      table: {
        type: { summary: 'horizontal | vertical' },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the radio group is disabled.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Determines if the radio group is invalid.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isViewMode: commonFormFieldControls['isViewMode'],
    placeholder: commonFormFieldControls['placeholder'],
    onChange: {
      action: 'clicked',
      description: 'Handles the change event from the radio group.',
      table: {
        type: { summary: 'ChangeEventHandler<HTMLInputElement>' },
        category: 'events',
      },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the radio group is in read-only state.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for Radio group.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'radio-group' }, type: { summary: 'string' }, category: 'tests' },
    },
    name: {
      description:
        'Assigns a shared name to all radios in the group to enable proper keyboard navigation and assistive technology support.',
      control: 'text',
      table: { category: 'props', type: { summary: 'string' } },
    },
  },
  args: {
    value: '1',
    options,
    variant: undefined,
    isDisabled: false,
    isViewMode: false,
    isInvalid: false,
    onChange: noop,
    'data-testid': 'radio-group',
    placeholder: undefined,
    name: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof RadioGroup> = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue);
    return <RadioGroup {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

/**
 * Specify a variant (`horizontal` or `vertical`) to set the layout direction.<br>
 * If no variant is specified: the layout on desktop defaults to `horizontal` and on mobile defaults to `vertical`.
 */
export const Variants: StoryObj<typeof RadioGroup> = {
  render: ({ value: initialValue, ...args }) => {
    const [valueHorizontal, setValueHorizontal] = useState(initialValue);
    const [valueVertical, setValueVertical] = useState(initialValue);
    const items = [
      {
        label: 'Horizontal',
        component: (
          <RadioGroup
            {...args}
            value={valueHorizontal}
            onChange={(e) => setValueHorizontal(e.target.value)}
            options={options}
            variant="horizontal"
          />
        ),
      },
      {
        label: 'Vertical',
        component: (
          <RadioGroup
            {...args}
            value={valueVertical}
            onChange={(e) => setValueVertical(e.target.value)}
            options={options}
            variant="vertical"
          />
        ),
      },
    ];

    return <Storybook.Row alignCompLabel="vertical" alignItems="flex-start" items={items} />;
  },
};

export const WithBadgeAndIconAndDescription: StoryObj<typeof RadioGroup> = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue);

    const options: RadioOption[] = [
      {
        mainLabelProps: { label: 'Main label', tooltipProps: { content: 'Hi you!' } },
        value: '1',
        descriptionProps: { label: 'Description text' },
      },
      {
        mainLabelProps: { label: 'Main label', pillProps: { label: 'Badge', status: 'brand' } },
        value: '2',
        descriptionProps: { label: 'Description text' },
      },
      {
        mainLabelProps: {
          label: 'Main label',
          pillProps: { label: 'Badge', status: 'brand' },
          tooltipProps: { content: 'Hi again!' },
        },
        value: '3',
        descriptionProps: { label: 'Description text' },
      },
      {
        mainLabelProps: {
          label: 'Main label',
          pillProps: { label: 'Badge', status: 'brand' },
          tooltipProps: { content: "You're the best!", triggerStatus: 'warning' },
        },
        value: '4',
        descriptionProps: {
          label: 'Slightly longer description',
          // eslint-disable-next-line no-alert
          action: { label: 'With CTA', onClick: () => alert('description action') },
        },
      },
    ];

    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={options}
        variant="vertical"
      />
    );
  },
};

export const WithBadgeAndIcon: StoryObj<typeof RadioGroup> = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue);

    const options: RadioOption[] = [
      {
        mainLabelProps: { label: 'Main label', tooltipProps: { content: 'Hi you!' } },
        value: '1',
      },
      {
        mainLabelProps: { label: 'Main label', pillProps: { label: 'Badge', status: 'brand' } },
        value: '2',
      },
      {
        mainLabelProps: {
          label: 'Main label',
          pillProps: { label: 'Badge', status: 'brand' },
          tooltipProps: { content: 'Hi agin!' },
        },
        value: '3',
      },
    ];

    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={options}
        variant="horizontal"
      />
    );
  },
};

export const Disabled: StoryObj<typeof RadioGroup> = {
  render: (args) => {
    const items = [
      {
        label: 'Horizontal',
        component: <RadioGroup {...args} options={options} variant="horizontal" isDisabled />,
      },
      {
        label: 'Vertical',
        component: <RadioGroup {...args} options={options} variant="vertical" isDisabled />,
      },
    ];

    return <Storybook.Row alignCompLabel="vertical" alignItems="flex-start" items={items} />;
  },
};

export const SingleOptionDisabled: StoryObj<typeof RadioGroup> = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue);

    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={[
          {
            mainLabelProps: { label: 'Disabled main label' },
            value: 'disabled',
            disabled: true,
          },
          ...options,
        ]}
        variant="horizontal"
      />
    );
  },
};

export const ReadOnly: StoryObj<typeof RadioGroup> = {
  args: { isReadOnly: true },
  render: (args) => <RadioGroup {...args} />,
};

export const SingleOptionReadOnly: StoryObj<typeof RadioGroup> = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue);
    const readOnlyOptions = [
      {
        mainLabelProps: { label: 'Main label', isReadOnly: true },
        value: '1',
        isReadOnly: true,
      },
      {
        mainLabelProps: { label: 'Main label', isReadOnly: true },
        value: '2',
      },
      {
        mainLabelProps: { label: 'Main label', isReadOnly: true },
        value: '3',
      },
    ];
    return <RadioGroup {...args} value={value} onChange={(e) => setValue(e.target.value)} options={readOnlyOptions} />;
  },
};

export const Invalid: StoryObj<typeof RadioGroup> = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue);
    const options: RadioOption[] = [
      {
        mainLabelProps: { label: 'Main label' },
        value: '1',
      },
      {
        mainLabelProps: { label: 'Main label' },
        value: '2',
      },
      {
        mainLabelProps: { label: 'Main label' },
        value: '3',
      },
    ];

    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={options}
        isInvalid
        variant="horizontal"
      />
    );
  },
};

export const ViewMode: StoryObj<typeof RadioGroup> = {
  render: (args) => <RadioGroup {...args} isViewMode aria-label="label" />,
};

export const Placeholder: StoryObj<typeof RadioGroup> = {
  render: (args) => {
    const options: RadioOption[] = [
      {
        mainLabelProps: {},
        value: '1',
      },
    ];

    return <RadioGroup {...args} options={options} variant="horizontal" isViewMode placeholder="No option provided" />;
  },
};

export const CustomOptionContent: StoryObj<typeof RadioGroup> = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue);
    const options: RadioOption[] = [
      {
        label: <Storybook.ContentPlaceholder />,
        value: '1',
        ariaLabel: 'label-1',
      },
      {
        label: 'disabled',
        disabled: true,
        value: '2',
        ariaLabel: 'label-2',
      },
      {
        label: <Storybook.ContentPlaceholder isDisabled label="You need to handle the readOnly style yourself" />,
        ariaLabel: 'label-3',
        isReadOnly: true,
        value: '3',
      },
      {
        mainLabelProps: { label: 'Normal label' },
        value: '4',
        ariaLabel: 'label-4',
      },
    ];

    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="vertical"
        options={options}
      />
    );
  },
};

export const WithFormField: StoryObj<typeof RadioGroup> = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState<string | undefined>(initialValue);

    return (
      <FormField
        labelProps={{
          label: 'React skills',
          id: 'react-skills',
        }}
        helperText="This will help us determine your salary."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        render={({ isLoading, ...props }) => <RadioGroup {...args} {...props} value={value} />}
      />
    );
  },
};
