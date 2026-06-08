import { Box } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Foundations/Spinner [new]',
  component: Spinner,
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'inverse'],
      description: 'The variant of the spinner.',
      table: {
        category: 'props',
        defaultValue: { summary: 'neutral' },
        type: {
          summary: getUnionTypeSummary(['neutral', 'brand', 'inverse']),
        },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Sets the width and height of the spinner.',
      table: {
        category: 'props',
        defaultValue: { summary: 'medium' },
        type: {
          summary: `${getUnionTypeSummary(['small', 'medium'])} | number`,
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Determines if the spinner is disabled.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    screenReaderText: {
      control: 'text',
      description: 'Visually hidden label for assistive tech.',
      table: {
        category: 'props',
        defaultValue: { summary: 'Loading' },
        type: {
          summary: 'string | null',
        },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        category: 'tests',
        defaultValue: { summary: 'spinner' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    variant: 'neutral',
    size: 'medium',
    disabled: false,
    'data-testid': 'spinner',
    screenReaderText: 'Loading',
  },
};

export default meta;

export const Main: StoryObj<typeof Spinner> = {
  render: (args) => <Spinner {...args} />,
};

export const Variants: StoryObj<typeof Spinner> = {
  render: () => (
    <Group spacing="xxl" alignItems="flex-start">
      <Group variant="vertical" alignItems="center">
        <Text>Neutral</Text>
        <Box p="m">
          <Spinner variant="neutral" />
        </Box>
      </Group>

      <Group variant="vertical" alignItems="center">
        <Text>Brand</Text>
        <Box p="m">
          <Spinner variant="brand" />
        </Box>
      </Group>

      <Group variant="vertical" alignItems="center">
        <Text>Inverse</Text>
        <Box p="m" backgroundColor="global.brand.700">
          <Spinner variant="inverse" />
        </Box>
      </Group>
    </Group>
  ),
};

export const Sizes: StoryObj<typeof Spinner> = {
  render: () => (
    <Group spacing="xxl" alignItems="flex-start">
      <Group variant="vertical" alignItems="center">
        <Text>Small</Text>
        <Spinner size="small" />
      </Group>

      <Group variant="vertical" alignItems="center">
        <Text>Medium</Text>
        <Spinner size="medium" />
      </Group>

      <Group variant="vertical" alignItems="center">
        <Text>Custom Size</Text>
        <Spinner size={64} />
      </Group>
    </Group>
  ),
};

export const Disabled: StoryObj<typeof Spinner> = {
  render: (args) => <Spinner {...args} disabled />,
};
