import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';

import { Text } from '../Text';
import { Currency } from './Currency';

const meta: Meta<typeof Currency> = {
  title: 'Data Display Components/Currency',
  component: Currency,
  argTypes: {
    value: {
      control: 'number',
      description: 'The value of the currency.',
      type: { required: true, name: 'string' },
      table: { category: 'props' },
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Determines the size of the currency text.',
      table: { category: 'props', defaultValue: { summary: 'small' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'inverse'],
      description: 'Determines the color of the currency text.',
      table: { category: 'props', defaultValue: { summary: 'default' }, type: { summary: 'default | inverse' } },
    },
    currency: {
      control: 'text',
      description: 'Sets the currency type of the input.',
      table: { defaultValue: { summary: 'USD' }, type: { summary: 'string' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'currency' },
        category: 'tests',
      },
    },
  },
  args: {
    value: 1200,
    size: 'small',
    variant: 'default',
    currency: 'USD',
  },
};
export default meta;

export const Main: StoryObj<typeof Currency> = {
  render: (args) => (
    <Storybook.Container
      bgColor={args.variant === 'inverse' ? 'semantic.surface.inverse' : undefined}
      padding="xs"
      borderRadius="global.100"
    >
      <Currency {...args} />
    </Storybook.Container>
  ),
};

export const Sizes: StoryObj<typeof Currency> = {
  render: (args) => (
    <Group variant="vertical" hasDivider>
      <Group>
        <Text>Small</Text>
        <Currency {...args} size="small" value={1234.56} />
      </Group>
      <Group alignItems="baseline">
        <Text>Large</Text>
        <Currency size="large" value={1234.56} />
      </Group>
    </Group>
  ),
};

export const Variations: StoryObj<typeof Currency> = {
  render: (args) => (
    <Group variant="vertical" hasDivider>
      <Group alignItems="center">
        <Text>Default</Text>
        <Currency {...args} size="large" value={1234.56} />
      </Group>
      <Group alignItems="center">
        <Text>Inverse</Text>
        <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" borderRadius="global.100">
          <Currency {...args} size="large" value={1234.56} variant="inverse" />
        </Storybook.Container>
      </Group>
    </Group>
  ),
};
