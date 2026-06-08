import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { FormField } from '@/components/form/components/FormField';
import { commonFormFieldControls, inputModeTypes } from '@/test-utils/stories.utils';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';
import { createNumberMask } from '@/utils/create-number-mask-utils';

import { TextField } from './TextField';

const maskPropsType = `
type Mask = Array<string | RegExp> | false;

type MaskProps = {
  mask: Mask | ((value: string) => Mask);
  guide?: boolean;
  placeholderChar?: string;
  keepCharPositions?: boolean;
  showMask?: boolean;
}`;

const meta: Meta<typeof TextField> = {
  title: 'Selection & Inputs Components/Text Field',
  component: TextField,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'The size of the field.',
      table: { defaultValue: { summary: 'large' }, type: { summary: 'small | large' }, category: 'props' },
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
    leftElement: {
      control: false,
      description: 'An element that appears as a prefix of the input.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    rightElement: {
      control: false,
      description: 'An element that appears as a suffix of the input.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
      description: 'value alignment.',
      table: { defaultValue: { summary: 'start' }, type: { summary: 'start | end' }, category: 'props' },
    },
    viewModePlaceholder: {
      control: 'text',
      description: 'The placeholder text for when there is no value and the field is in view-only mode.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Sets the field to be focused on mount.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    maskProps: {
      control: 'object',
      description:
        'Options for input masking.\n\nSee [text-mask](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) for more information.',
      table: {
        type: {
          summary: 'options',
          detail: maskPropsType,
        },
        category: 'props',
      },
    },
    maxChars: {
      control: 'number',
      description: 'The maximum length (in characters) of the text field.',
      table: {
        type: { summary: 'number' },
        category: 'props',
      },
    },
    autoComplete: commonFormFieldControls['autoComplete'],
    inputMode: {
      control: 'select',
      options: inputModeTypes,
      description:
        'Hints at the type of data that might be entered by the user while editing the element or its contents.',
      table: { type: { summary: getUnionTypeSummary(inputModeTypes) }, category: 'props' },
    },
  },
  args: {
    size: 'large',
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
    isViewMode: false,
    isInvalid: false,
    align: 'start',
    viewModePlaceholder: undefined,
    placeholder: 'John Smith',
    autoFocus: false,
    maxChars: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof TextField> = {
  render: (args) => <TextField {...args} />,
};

export const Sizes: StoryObj<typeof TextField> = {
  render: (args) => {
    const items = [
      { label: 'Small', component: <TextField {...args} size="small" /> },
      { label: 'Large', component: <TextField {...args} size="large" /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};

export const Invalid: StoryObj<typeof TextField> = {
  render: (args) => {
    const [value, setValue] = useState<string>('Robin The Dog');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <TextField {...args} isInvalid onChange={onChange} value={value} />;
  },
};

export const Disabled: StoryObj<typeof TextField> = {
  render: (args) => {
    const items = [
      { label: 'With value', component: <TextField {...args} isDisabled value="Nina Tomeii" onChange={noop} /> },
      { label: 'Without value (with placeholder)', component: <TextField {...args} isDisabled /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const Loading: StoryObj<typeof TextField> = {
  render: (args) => <TextField {...args} isLoading />,
};

export const ViewMode: StoryObj<typeof TextField> = {
  render: (args) => {
    const items = [
      { label: 'With value', component: <TextField {...args} isViewMode value="Nina Tomeii" onChange={noop} /> },
      { label: 'Without value (with placeholder)', component: <TextField {...args} isViewMode /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const ReadOnly: StoryObj<typeof TextField> = {
  render: (args) => {
    const items = [
      { label: 'With value', component: <TextField {...args} isReadOnly value="Nina Tomeii" onChange={noop} /> },
      { label: 'Without value (with placeholder)', component: <TextField {...args} isReadOnly /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const Placeholder: StoryObj<typeof TextField> = {
  render: (args) => {
    const items = [
      { label: 'Placeholder', component: <TextField {...args} /> },
      {
        label: 'View-mode Placeholder',
        component: <TextField {...args} viewModePlaceholder="No name provided" isViewMode />,
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const Masked: StoryObj<typeof TextField> = {
  render: (args) => (
    <TextField
      {...args}
      placeholder="MM/DD/YYYY"
      maskProps={{
        mask: [/[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/, '/', /[1-2]/, /\d/, /\d/, /\d/],
      }}
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * A mask that is added to the input value dynamically.
 */

export const DynamicMask: StoryObj<typeof TextField> = {
  render: (args) => {
    const mask = createNumberMask({
      suffix: '%',
      prefix: '',
      thousandsSeparatorSymbol: '',
    });

    return <TextField {...args} placeholder="100%" maskProps={{ mask }} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * If you wish to limit the number of characters that can be entered into the text field, you can use the `maxChars` prop. <br />
 * If you want to have a visual indicator of the char count, use TextField inside a [FormField](?path=/story/form-form-field--with-max-chars). <br />
 * on this example, Max Chars is 10
 */
export const MaxChars: StoryObj<typeof TextField> = {
  args: {
    ...Main.args,
    maxChars: 10,
  },
  render: (args) => <TextField {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Align: StoryObj<typeof TextField> = {
  render: (args) => <TextField {...args} align="end" />,
};

export const WithFormField: StoryObj<typeof TextField> = {
  render: (args) => (
    <FormField
      labelProps={{
        label: 'Full Name',
        id: 'full-name',
      }}
      helperText="Will be used as the name on checks."
      render={(props) => <TextField {...args} {...props} />}
    />
  ),
};

export const WithLeftAndRightElement: StoryObj<typeof TextField> = {
  render: (args) => {
    const items = [
      {
        label: 'Left Element',
        component: <TextField {...args} leftElement={<Storybook.ContentPlaceholder label="L" />} />,
      },
      {
        label: 'Right Element',
        component: <TextField {...args} rightElement={<Storybook.ContentPlaceholder label="R" />} />,
      },
    ];
    return <Storybook.Row items={items} />;
  },
};
