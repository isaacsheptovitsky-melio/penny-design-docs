import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { FormField } from '@/components/form/components/FormField';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { PhoneField } from './PhoneField';

const meta: Meta<typeof PhoneField> = {
  title: 'Selection & Inputs Components/Phone Field',
  component: PhoneField,
  parameters: { docs: { source: { type: 'code' } } },
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
    autoComplete: {
      ...commonFormFieldControls['autoComplete'],
      table: { type: { summary: 'string' }, category: 'props', defaultValue: { summary: 'tel' } },
    },
  },
  args: {
    size: 'large',
    autoFocus: false,
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
    isViewMode: false,
    isInvalid: false,
    viewModePlaceholder: undefined,
    placeholder: '(555) 123-4567',
  },
};
export default meta;

export const Main: StoryObj<typeof PhoneField> = {
  render: (args) => <PhoneField {...args} />,
};

export const Sizes: StoryObj<typeof PhoneField> = {
  render: (args) => {
    const items = [
      { label: 'Small', component: <PhoneField {...args} size="small" /> },
      { label: 'Large', component: <PhoneField {...args} size="large" /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};

export const Invalid: StoryObj<typeof PhoneField> = {
  render: (args) => {
    const [value, setValue] = useState<string>('5551231234');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return <PhoneField {...args} isInvalid onChange={onChange} value={value} />;
  },
};

export const Disabled: StoryObj<typeof PhoneField> = {
  render: (args) => {
    const items = [
      { label: 'With value', component: <PhoneField {...args} isDisabled value="5551231234" onChange={noop} /> },
      { label: 'Without value (with placeholder)', component: <PhoneField {...args} isDisabled /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const ViewMode: StoryObj<typeof PhoneField> = {
  render: (args) => {
    const items = [
      { label: 'With value', component: <PhoneField {...args} isViewMode value="5551231234" onChange={noop} /> },
      { label: 'Without value (with placeholder)', component: <PhoneField {...args} isViewMode /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const ReadOnly: StoryObj<typeof PhoneField> = {
  render: (args) => {
    const items = [
      { label: 'With value', component: <PhoneField {...args} isReadOnly value="5551231234" onChange={noop} /> },
      { label: 'Without value (with placeholder)', component: <PhoneField {...args} isReadOnly /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const Loading: StoryObj<typeof PhoneField> = {
  render: (args) => <PhoneField {...args} isLoading />,
};

export const Placeholder: StoryObj<typeof PhoneField> = {
  render: (args) => {
    const items = [
      { label: 'Placeholder', component: <PhoneField {...args} /> },
      {
        label: 'View-mode Placeholder',
        component: <PhoneField {...args} viewModePlaceholder="No phone provided" isViewMode />,
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const WithFormField: StoryObj<typeof PhoneField> = {
  render: (args) => (
    <FormField
      labelProps={{
        label: 'Phone number',
        id: 'phone-number',
      }}
      helperText="Will be used for spam messages."
      render={(props) => <PhoneField {...args} {...props} />}
    />
  ),
};
