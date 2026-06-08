import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { FormField } from '@/components/form/components/FormField';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Selection & Inputs Components/Text Area',
  component: TextArea,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    isEditable: {
      control: 'boolean',
      description: 'Sets the field as editable.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Sets the field as disabled.',
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
    isViewMode: {
      control: 'boolean',
      description: 'Sets the field as view-mode.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    value: {
      control: 'text',
      description: 'The display value of the text area.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for when there is no value.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    footer: {
      control: 'object',
      description: 'An object of the text-area footer checkbox.',
      table: {
        type: {
          summary: `Pick<CheckboxProps, 'isDisabled' | 'isIndeterminate' | 'isInvalid' | 'isReadOnly' | 'label'>`,
        },
        category: 'props',
      },
    },
    numberOfRows: {
      control: 'number',
      description: 'Number of rows in the text area.',
      table: { defaultValue: { summary: '4' }, type: { summary: 'number' }, category: 'props' },
    },
    maxChars: {
      control: 'number',
      description: 'The maximum length (in characters) of the text area.',
      table: {
        type: { summary: 'number' },
        category: 'props',
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Set the trigger to be focused on mount.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'text-area-input' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    placeholder: 'Placeholder',
    isEditable: true,
    isReadOnly: false,
    isDisabled: false,
    isLoading: false,
    isViewMode: false,
    footer: undefined,
    numberOfRows: undefined,
    maxChars: undefined,
    autoFocus: false,
    value: undefined,
    'data-testid': 'text-area-input',
  },
};
export default meta;

export const Main: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
};

/**
 * If you wish to limit the number of characters that can be entered into the text area, you can use the `maxChars` prop. <br />
 * If you want to have a visual indicator of the char count, use TextArea inside a [FormField](?path=/story/form-form-field--with-max-chars). <br />
 * on this example, Max Chars is 10
 */
export const MaxChars: StoryObj<typeof TextArea> = {
  args: {
    ...Main.args,
    maxChars: 10,
  },
  render: (args) => <TextArea {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Invalid: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} isInvalid />,
};

export const Disabled: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} isDisabled />,
};

export const ReadOnly: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} isReadOnly />,
};

export const Loading: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} isLoading />,
};

export const ViewMode: StoryObj<typeof TextArea> = {
  render: (args) => {
    const items = [
      { label: 'With value', component: <TextArea {...args} isViewMode value="Nina Tomeii" onChange={noop} /> },
      {
        label: 'Without value (with placeholder)',
        component: <TextArea {...args} isViewMode placeholder="John Smith" />,
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const NotEditable: StoryObj<typeof TextArea> = {
  render: (args) => {
    const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et t aliquip ex ea commodo consequat.`;

    return <TextArea {...args} placeholder={longText} isEditable={false} />;
  },
  parameters: { chromatic: { delay: 1000 } },
};

export const NotEditableWithFooter: StoryObj<typeof TextArea> = {
  render: (args) => {
    const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et t aliquip ex ea commodo consequat.`;
    return (
      <TextArea
        {...args}
        isEditable={false}
        placeholder={longText}
        footer={{ label: 'I’ve read and agree to the Credit Key Business Loan Agreement.' }}
      />
    );
  },
};

export const WithFormField: StoryObj<typeof TextArea> = {
  render: (args) => (
    <FormField
      labelProps={{
        label: 'Comment',
        id: 'comment',
      }}
      helperText="What are your thoughts"
      render={(props) => <TextArea {...args} {...props} />}
    />
  ),
};
