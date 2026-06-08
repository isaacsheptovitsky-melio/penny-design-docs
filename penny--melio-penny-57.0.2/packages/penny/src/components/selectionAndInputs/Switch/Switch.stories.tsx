import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { FormField } from '@/components/form/components/FormField';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Selection & Inputs Components/Switch',
  component: Switch,
  argTypes: {
    label: {
      control: 'text',
      name: 'label',
      description: 'The label next to the switch.',
      table: {
        category: 'props',
        type: {
          summary: 'string',
        },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'The size of the switch.',
      table: {
        defaultValue: { summary: 'large' },
        type: { summary: 'small | large' },
        category: 'props',
      },
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Determines if the switch should take the full width of its container.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onChange: {
      action: 'clicked',
      table: { type: { summary: '(isChecked: boolean) => void' }, category: 'events' },
      description: 'Handles the onChange event from the switch.',
    },
    defaultIsChecked: {
      control: 'boolean',
      description: 'The default value of the switch.',
      table: {
        defaultValue: { summary: 'false' },
        category: 'props',
        type: {
          summary: 'boolean',
        },
      },
    },
    value: {
      control: 'boolean',
      description: 'The value of the switch.',
      table: {
        category: 'props',
        type: {
          summary: 'boolean',
        },
      },
    },
    isReadOnly: {
      description: 'Sets the switch as read-only.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the switch is disabled.',
      table: {
        defaultValue: { summary: 'false' },
        category: 'props',
        type: {
          summary: 'boolean',
        },
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
      table: {
        defaultValue: { summary: COMPONENTS_DEFAULT_TEST_IDS.SWITCH },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    label: 'Label',
    size: 'large',
    defaultIsChecked: false,
    isDisabled: false,
    isReadOnly: false,
    isFullWidth: false,
    autoFocus: false,
    'data-testid': COMPONENTS_DEFAULT_TEST_IDS.SWITCH,
  },
};
export default meta;

export const Main: StoryObj<typeof Switch> = {
  render: (args) => <Switch {...args} />,
};

export const Checked: StoryObj<typeof Switch> = {
  render: () => <Switch defaultIsChecked label="On" />,
};

export const FullWidth: StoryObj<typeof Switch> = {
  render: () => <Switch isFullWidth label="On" />,
};

export const Sizes: StoryObj<typeof Switch> = {
  render: () => (
    <Group spacing="m">
      <Group variant="vertical">
        <Text as="h2" textStyle="heading4">
          Small
        </Text>
        <Switch size="small" />
      </Group>
      <Group variant="vertical">
        <Text as="h2" textStyle="heading4">
          Large
        </Text>
        <Switch size="large" />
      </Group>
    </Group>
  ),
};

export const Disabled: StoryObj<typeof Switch> = {
  render: () => (
    <Group>
      <Switch defaultIsChecked isDisabled label="checked" />
      <Switch isDisabled label="unchecked" />
    </Group>
  ),
};

export const ReadOnly: StoryObj<typeof Switch> = {
  render: () => (
    <Group>
      <Switch defaultIsChecked label="checked" isReadOnly />
      <Switch label="unchecked" isReadOnly />
    </Group>
  ),
};

export const WithFormField: StoryObj<typeof Switch> = {
  render: (args) => (
    <FormField
      labelProps={{
        label: 'Terms and conditions',
        id: 'terms-and-conditions',
      }}
      helperText="Please check the box if you accept the terms"
      render={({ isLoading, isInvalid, isViewMode, ...props }) => <Switch {...args} {...props} label="I agree!" />}
    />
  ),
};

export const Controlled: StoryObj<typeof Switch> = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <Group variant="vertical" width="fit-content">
        <Switch value={isChecked} onChange={setIsChecked} />
        <Button label="Toggle" onClick={() => setIsChecked(!isChecked)} />
      </Group>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
