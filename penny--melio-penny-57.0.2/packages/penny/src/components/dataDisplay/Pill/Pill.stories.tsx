import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { statuses } from '@/components/internal/_BaseBadge';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { Avatar } from '../Avatar';
import { BrandSymbol } from '../BrandSymbol';
import { FlagIcon } from '../FlagIcon';
import { StatusIndicator } from '../StatusIndicator';
import { Pill } from './Pill';
import type { PillProps } from './Pill.types';

const meta: Meta<typeof Pill> = {
  title: 'Data Display Components/Pill',
  component: Pill,
  argTypes: {
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The label on the pill.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    'aria-label': {
      control: 'text',
      description: 'Dedicated label for screen-readers (used for accessibility).',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    status: {
      control: 'select',
      type: { required: true, name: 'string' },
      description: 'The type of the pill.',
      options: statuses,
      table: {
        type: {
          summary: getUnionTypeSummary(statuses),
        },
        category: 'props',
      },
    },
    type: {
      description: 'The type of the pill.',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | tertiary' },
        category: 'props',
      },
    },
    isDisabled: {
      description: 'Determines if the pill is disabled.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isReadOnly: {
      description: 'Determines if the pill is read-only.',
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
      table: { type: { summary: 'string' }, defaultValue: { summary: 'pill' }, category: 'tests' },
    },
  },
  args: {
    status: 'warning',
    label: 'Pill',
    type: 'primary',
    isDisabled: false,
    isReadOnly: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Pill> = {
  render: ({ type, status, isDisabled, isReadOnly, ...args }) => {
    const tertiaryStatus =
      type === 'tertiary'
        ? { leftElement: <StatusIndicator status={status} isDisabled={isDisabled} isReadOnly={isReadOnly} /> }
        : {};
    return (
      <Pill {...args} type={type} status={status} isReadOnly={isReadOnly} isDisabled={isDisabled} {...tertiaryStatus} />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Types: StoryObj<typeof Pill> = {
  render: () => {
    const items = [
      { label: 'Primary', component: <Pill type="primary" status="success" label="Primary" /> },
      { label: 'Secondary', component: <Pill type="secondary" status="success" label="Secondary" /> },
      {
        label: 'Tertiary',
        component: (
          <Pill type="tertiary" status="success" label="Tertiary" leftElement={<StatusIndicator status="success" />} />
        ),
      },
    ];
    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};
export const Disabled: StoryObj<typeof Pill> = {
  render: () => {
    const items = [
      { label: 'Primary', component: <Pill type="primary" status="success" label="Primary" isDisabled /> },
      { label: 'Secondary', component: <Pill type="secondary" status="success" label="Secondary" isDisabled /> },
      {
        label: 'Tertiary',
        component: (
          <Pill
            type="tertiary"
            status="success"
            label="Tertiary"
            isDisabled
            leftElement={<StatusIndicator status="success" isDisabled />}
          />
        ),
      },
    ];
    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};

export const Readonly: StoryObj<typeof Pill> = {
  render: () => {
    const items = [
      { label: 'Primary', component: <Pill type="primary" status="success" label="Primary" isReadOnly /> },
      { label: 'Secondary', component: <Pill type="secondary" status="success" label="Secondary" isReadOnly /> },
      {
        label: 'Tertiary',
        component: (
          <Pill
            type="tertiary"
            status="success"
            label="Tertiary"
            isReadOnly
            leftElement={<StatusIndicator status="success" isReadOnly />}
          />
        ),
      },
    ];
    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};

export const Statuses: StoryObj<typeof Pill> = {
  render: () => {
    const types = ['primary', 'secondary', 'tertiary'] as const;
    const statuses = ['warning', 'critical', 'success', 'neutral', 'brand', 'informative'] as const;

    const getItems = (status: PillProps['status']) =>
      types.map((type, index) => ({
        component: (
          <Pill
            key={index}
            type={type}
            status={status}
            label={status}
            {...(type === 'tertiary' && { leftElement: <StatusIndicator status={status} /> })}
          />
        ),
      }));

    return (
      <Group variant="vertical">
        {statuses.map((status, index) => (
          <Storybook.Row key={`${status}-${index}`} items={getItems(status)} />
        ))}
      </Group>
    );
  },
};

export const LeftAndRightElements: StoryObj<typeof Pill> = {
  render: () => {
    const items = [
      {
        component: (
          <Pill type="tertiary" status="neutral" label="Status" leftElement={<StatusIndicator status="neutral" />} />
        ),
      },
      {
        component: (
          <Pill
            type="secondary"
            status="neutral"
            label="Robin the Dog"
            leftElement={<Avatar size="extra-small" src="/assets/Robin.jpeg" name="Robin the Dog" />}
          />
        ),
      },
      {
        component: (
          <Pill
            type="secondary"
            status="neutral"
            label="Google"
            leftElement={<BrandSymbol size="extra-small" type="google" />}
          />
        ),
      },
      {
        component: (
          <Pill
            type="secondary"
            status="neutral"
            label="USA"
            leftElement={<FlagIcon size="extra-small" countryCode="US" />}
          />
        ),
      },
      {
        component: (
          <Pill
            type="secondary"
            status="neutral"
            label="Label"
            leftElement={<Icon size="extra-small" type="bank" color="inherit" />}
          />
        ),
      },
      {
        component: (
          <Pill
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
