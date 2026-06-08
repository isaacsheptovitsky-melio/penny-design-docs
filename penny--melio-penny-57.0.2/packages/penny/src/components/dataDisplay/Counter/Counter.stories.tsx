import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { statuses } from '../../internal/_BaseBadge';
import { Text } from '../Text';
import { Counter } from './Counter';

const meta: Meta<typeof Counter> = {
  title: 'Data Display Components/Counter',
  component: Counter,
  argTypes: {
    number: {
      control: 'number',
      type: { required: true, name: 'number' },
      description: 'The number in the Counter.',
      table: { type: { summary: 'number' }, category: 'props' },
    },
    status: {
      control: 'select',
      type: { required: true, name: 'string' },
      description: 'The status of the Counter.',
      options: statuses,
      table: {
        defaultValue: {
          summary: 'warning',
        },
        type: {
          summary: getUnionTypeSummary(statuses),
        },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'counter' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    status: 'warning',
    number: 99,
    'data-testid': 'counter',
  },
};
export default meta;

export const Main: StoryObj<typeof Counter> = {};

export const Statuses: StoryObj<typeof Counter> = {
  render: (args) => (
    <SimpleGrid columns={6} gap="xs" alignItems="center">
      <Text textStyle="body3Semi">Warning</Text>
      <Text textStyle="body3Semi">Critical</Text>
      <Text textStyle="body3Semi">Success</Text>
      <Text textStyle="body3Semi">Neutral</Text>
      <Text textStyle="body3Semi">Brand</Text>
      <Text textStyle="body3Semi">Informative</Text>
      <Counter {...args} status="warning" number={2} />
      <Counter {...args} status="critical" number={3} />
      <Counter {...args} status="success" number={4} />
      <Counter {...args} status="neutral" number={5} />
      <Counter {...args} status="brand" number={6} />
      <Counter {...args} status="informative" number={7} />
    </SimpleGrid>
  ),
};

/**
 * When the number is above the maximum digits displayed - the largest number that can be displayed is shown with a `+` sign.
 */
export const LargeNumber: StoryObj<typeof Counter> = {
  render: (args) => <Counter {...args} status="warning" number={200} />,
};
