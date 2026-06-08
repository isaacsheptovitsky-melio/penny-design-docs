import { SimpleGrid } from '@chakra-ui/react';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';

import { IconButton } from '../../action/IconButton';
import { Text } from '../Text';
import { StatusIndicator } from './StatusIndicator';

export const statuses = ['brand', 'critical', 'warning', 'success', 'informative', 'neutral', 'secondary'];

const meta: Meta<typeof StatusIndicator> = {
  title: 'Data Display Components/Status Indicator',
  component: StatusIndicator,
  argTypes: {
    status: {
      control: 'select',
      description: 'The status of the status indicator.',
      options: statuses,
      table: {
        defaultValue: {
          summary: 'brand',
        },
        type: {
          summary: statuses.join(' | '),
        },
        category: 'props',
      },
    },
    children: {
      control: false,
      description: 'The wrapped component with the status indicator.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    isDisabled: {
      description: 'Determines if the status indicator is disabled.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isReadOnly: {
      description: 'Determines if the status indicator is in read-only state.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: '[STATUS]-status-indicator' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    status: 'brand',
    isDisabled: false,
    isReadOnly: false,
    'data-testid': 'brand-status-indicator',
  },
};
export default meta;

export const Main: StoryObj<typeof StatusIndicator> = {};

export const AllStatuses: StoryObj<typeof StatusIndicator> = {
  render: (args) => (
    <Group variant="vertical">
      <Group alignItems="center">
        <StatusIndicator {...args} status="brand" />
        <Text>Brand</Text>
      </Group>
      <Group alignItems="center">
        <StatusIndicator {...args} status="critical" />
        <Text>Critical</Text>
      </Group>
      <Group alignItems="center">
        <StatusIndicator {...args} status="warning" />
        <Text>Warning</Text>
      </Group>
      <Group alignItems="center">
        <StatusIndicator {...args} status="success" />
        <Text>Success</Text>
      </Group>
      <Group alignItems="center">
        <StatusIndicator {...args} status="informative" />
        <Text>Informative</Text>
      </Group>
      <Group alignItems="center">
        <StatusIndicator {...args} status="neutral" />
        <Text>Neutral</Text>
      </Group>
      <Group alignItems="center">
        <StatusIndicator {...args} status="secondary" />
        <Text>Secondary</Text>
      </Group>
    </Group>
  ),
};

export const AllStatusesWithIcon: StoryObj<typeof StatusIndicator> = {
  render: (args) => (
    <SimpleGrid columns={2}>
      <Group variant="vertical">
        <Text>With Icon</Text>
        <Group alignItems="center">
          <StatusIndicator {...args} status="brand">
            <Icon type="filter" />
          </StatusIndicator>
          <Text>Brand</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="critical">
            <Icon type="refresh" />
          </StatusIndicator>
          <Text>Critical</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="warning">
            <Icon type="notification" />
          </StatusIndicator>
          <Text>Warning</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="success">
            <Icon type="wallet" />
          </StatusIndicator>
          <Text>Success</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="informative">
            <Icon type="info" />
          </StatusIndicator>
          <Text>Informative</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="neutral">
            <Icon type="chat-empty" />
          </StatusIndicator>
          <Text>Neutral</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="secondary">
            <Icon type="chat-empty" />
          </StatusIndicator>
          <Text>Secondary</Text>
        </Group>
      </Group>
      <Group variant="vertical">
        <Text>With ButtonIcon</Text>
        <Group alignItems="center">
          <StatusIndicator {...args} status="brand">
            <IconButton aria-label="filter" variant="naked" icon="filter" size="small" />
          </StatusIndicator>
          <Text>Brand</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="critical">
            <IconButton aria-label="refresh" variant="naked" icon="refresh" size="small" />
          </StatusIndicator>
          <Text>Critical</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="warning">
            <IconButton aria-label="notification" variant="naked" icon="notification" size="small" />
          </StatusIndicator>
          <Text>Warning</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="success">
            <IconButton aria-label="wallet" variant="naked" icon="wallet" size="small" />
          </StatusIndicator>
          <Text>Success</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="informative">
            <IconButton aria-label="Informative" variant="naked" icon="info" size="small" />
          </StatusIndicator>
          <Text>Informative</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="neutral">
            <IconButton aria-label="chat-empty" variant="naked" icon="chat-empty" size="small" />
          </StatusIndicator>
          <Text>Neutral</Text>
        </Group>
        <Group alignItems="center">
          <StatusIndicator {...args} status="secondary">
            <IconButton aria-label="chat-empty" variant="naked" icon="chat-empty" size="small" />
          </StatusIndicator>
          <Text>Secondary</Text>
        </Group>
      </Group>
    </SimpleGrid>
  ),
};

export const Disabled: StoryObj<typeof StatusIndicator> = {
  render: () => {
    const items = [
      { label: 'Disabled', component: <StatusIndicator status="brand" isDisabled /> },
      { label: 'Disabled - secondary', component: <StatusIndicator status="secondary" isDisabled /> },
      {
        label: 'Disabled with IconButton',
        component: (
          <StatusIndicator status="neutral" isDisabled>
            <IconButton aria-label="chat-empty" variant="naked" icon="chat-empty" size="small" isDisabled />
          </StatusIndicator>
        ),
      },
    ];

    return <Storybook.Row items={items} />;
  },
};

export const ReadOnly: StoryObj<typeof StatusIndicator> = {
  render: (args) => (
    <Group>
      <StatusIndicator {...args} isReadOnly />
      <StatusIndicator {...args} status="secondary" isReadOnly />
    </Group>
  ),
};
