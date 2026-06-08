import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import React, { type ChangeEvent, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { FormField } from '@/components/form/components/FormField';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { SecuredTextField } from './SecuredTextField';

const maskPropsType = `
type Mask = Array<string | RegExp> | false;

type MaskProps = {
  mask: Mask | ((value: string) => Mask);
  guide?: boolean;
  placeholderChar?: string;
  keepCharPositions?: boolean;
  showMask?: boolean;
}`;

const meta: Meta<typeof SecuredTextField> = {
  title: 'Selection & Inputs Components/Secured Text Field',
  component: SecuredTextField,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the field.',
      table: { category: 'props', type: { summary: 'string' } },
    },
    onChange: {
      control: false,
      action: 'change',
      description: 'The callback invoked when the input is changed.',
      table: { category: 'events', type: { summary: 'ChangeEventHandler<HTMLInputElement>' } },
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'The size of the field.',
      table: { defaultValue: { summary: 'large' }, type: { summary: 'small | large' }, category: 'props' },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Set the input to be focused on mount.',
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
    isTextVisible: {
      control: 'boolean',
      description: 'Decides if the value in the input is visible or masked.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    disableToggle: {
      control: 'boolean',
      description: 'Hides the toggle button that toggles the visibility of the input value.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    type: {
      control: 'text',
      description:
        "The input type. For optimal security, and to prompt the 'save password' dialog, use the 'password' type.",
      table: { defaultValue: { summary: 'text' }, type: { summary: 'string' }, category: 'props' },
    },
    getToggleVisibilityAriaLabel: {
      control: false,
      description: 'A function that returns the aria-label for the toggle visibility button.',
      table: { category: 'accessibility', type: { summary: '(isTextVisible: boolean) => string' } },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'secured-text-field' }, type: { summary: 'string' }, category: 'tests' },
    },
    autoComplete: commonFormFieldControls['autoComplete'],
  },
  args: {
    value: '3sR2FRx!mn3KzQVz',
    onChange: noop,
    type: undefined,
    placeholder: 'e.g, ••••••••',
    size: 'large',
    autoFocus: false,
    disableToggle: false,
    isTextVisible: false,
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
    isViewMode: false,
    isInvalid: false,
    viewModePlaceholder: undefined,
    'data-testid': 'secured-text-field',
  },
};
export default meta;

export const Main: StoryObj<typeof SecuredTextField> = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <SecuredTextField {...args} value={value} onChange={onChange} />;
  },
};

export const Sizes: StoryObj<typeof SecuredTextField> = {
  render: (args) => {
    const items = [
      {
        label: 'Small',
        component: <SecuredTextField {...args} size="small" />,
      },
      {
        label: 'Large',
        component: <SecuredTextField {...args} size="large" />,
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" justifyContent="flex-start" />;
  },
};

export const Invalid: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    isInvalid: true,
  },
  render: (args) => <SecuredTextField {...args} />,
};

export const Disabled: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    isDisabled: true,
  },
  render: (args) => <SecuredTextField {...args} />,
};

export const ViewMode: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    isViewMode: true,
  },
  render: (args) => <SecuredTextField {...args} />,
};

export const ReadOnly: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    isReadOnly: true,
  },
  render: (args) => <SecuredTextField {...args} />,
};

export const Loading: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    isLoading: true,
  },
  render: (args) => <SecuredTextField {...args} />,
};

export const Placeholder: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    value: undefined,
  },
  render: (args) => {
    const items = [
      {
        label: 'Placeholder',
        component: <SecuredTextField {...args} />,
      },
      {
        label: 'View-mode Placeholder',
        component: <SecuredTextField {...args} isViewMode viewModePlaceholder="No password provided" />,
      },
    ];

    return (
      <Storybook.Row
        items={items}
        alignItems="stretch"
        alignCompLabel="vertical"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
};

export const WithoutToggle: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    value: '3sR2FRx!mn3KzQVz',
    disableToggle: true,
  },
  render: (args) => <SecuredTextField {...args} />,
};

export const TextVisibleByDefault: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    value: '3sR2FRx!mn3KzQVz',
    isTextVisible: true,
  },
  render: (args) => <SecuredTextField {...args} />,
};

export const PasswordTypeField: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    value: '3sR2FRx!mn3KzQVz',
    isTextVisible: true,
    type: 'password',
  },
  render: (args) => <SecuredTextField {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const CustomAriaLabel: StoryObj<typeof SecuredTextField> = {
  args: {
    ...Main.args,
    getToggleVisibilityAriaLabel: (isTextVisible: boolean) => `Click to ${isTextVisible ? 'hide' : 'show'} password`,
  },
  render: (args) => <SecuredTextField {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithFormField: StoryObj<typeof SecuredTextField> = {
  render: (args) => (
    <FormField
      labelProps={{
        label: 'Password',
        id: 'password',
      }}
      helperText="Must have at least 6 characters."
      render={(props) => <SecuredTextField {...args} {...props} />}
    />
  ),
};
