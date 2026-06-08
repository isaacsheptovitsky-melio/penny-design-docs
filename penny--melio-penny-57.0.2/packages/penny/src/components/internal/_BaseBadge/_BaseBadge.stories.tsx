import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';

import { getUnionTypeSummary } from '../../../test-utils/storybook.utils';
import { Avatar, BrandSymbol, FlagIcon, StatusIndicator } from '../../dataDisplay';
import { _BaseBadge as BaseBadge } from './_BaseBadge';
import { statuses } from './_BaseBadge.types';

const meta: Meta<typeof BaseBadge> = {
  title: 'Internal Components/Base Badge',
  component: BaseBadge,
  argTypes: {
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The text in the badge.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    type: {
      description: 'The type of the badge.',
      control: 'select',
      options: ['primary', 'status', 'tertiary'],
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: "'primary' | 'secondary' | 'tertiary'" },
        category: 'props',
      },
    },
    status: {
      control: 'select',
      type: { required: true, name: 'string' },
      description: 'The status of the badge.',
      options: statuses,
      table: {
        defaultValue: {
          summary: "'warning'",
        },
        type: {
          summary: getUnionTypeSummary(statuses),
        },
        category: 'props',
      },
    },
    isDisabled: {
      description: 'Determines if the component is disabled.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isReadOnly: {
      description: 'Determines if the component is read-only.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    leftElement: {
      control: false,
      description: 'An element to be displayed on the left side of the label.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    rightElement: {
      control: false,
      description: 'An element to be displayed on the right side of the label.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: "'base-badge-${status}'" }, category: 'tests' },
    },
  },
  args: {
    status: 'warning',
    label: '_BaseBadge',
    type: 'primary',
    isDisabled: false,
    isReadOnly: false,
  },
};
export default meta;

export const Main: StoryObj<typeof BaseBadge> = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Disabled: StoryObj<typeof BaseBadge> = {
  render: (args) => (
    <Group>
      <BaseBadge {...args} isDisabled status="success" label="Success" />
      <BaseBadge
        {...args}
        isDisabled
        type="tertiary"
        label="Status"
        leftElement={<StatusIndicator status={args.status} isDisabled />}
      />
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Readonly: StoryObj<typeof BaseBadge> = {
  render: (args) => (
    <Group>
      <BaseBadge {...args} isReadOnly status="success" label="Success" />
      <BaseBadge
        {...args}
        isReadOnly
        type="tertiary"
        label="Status"
        leftElement={<StatusIndicator status={args.status} isReadOnly />}
      />
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Statuses: StoryObj<typeof BaseBadge> = {
  render: () => (
    <Group alignItems="center" variant="vertical">
      <BaseBadge status="warning" label="Warning" />
      <BaseBadge status="critical" label="Critical" />
      <BaseBadge status="success" label="Success" />
      <BaseBadge status="neutral" label="Neutral" />
      <BaseBadge status="brand" label="Promotional" />
      <BaseBadge status="informative" label="Informative" />
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LeftAndRightElements: StoryObj<typeof BaseBadge> = {
  render: () => {
    const items = [
      {
        component: (
          <BaseBadge
            type="tertiary"
            status="neutral"
            label="Status"
            leftElement={<StatusIndicator status="neutral" />}
          />
        ),
      },
      {
        component: (
          <BaseBadge
            type="secondary"
            status="neutral"
            label="Robin the Dog"
            leftElement={<Avatar size="extra-small" src="/assets/Robin.jpeg" name="Robin the Dog" />}
          />
        ),
      },
      {
        component: (
          <BaseBadge
            type="secondary"
            status="neutral"
            label="Google"
            leftElement={<BrandSymbol size="extra-small" type="google" />}
          />
        ),
      },
      {
        component: (
          <BaseBadge
            type="secondary"
            status="neutral"
            label="USA"
            leftElement={<FlagIcon size="extra-small" countryCode="US" />}
          />
        ),
      },
      {
        component: (
          <BaseBadge
            type="secondary"
            status="neutral"
            label="Label"
            leftElement={<Icon size="extra-small" type="bank" color="inherit" />}
          />
        ),
      },
      {
        component: (
          <BaseBadge
            type="secondary"
            status="neutral"
            label="Label"
            rightElement={<Icon size="extra-small" type="chevron-right" color="inherit" />}
          />
        ),
      },
    ];
    return <Storybook.Row items={items} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
