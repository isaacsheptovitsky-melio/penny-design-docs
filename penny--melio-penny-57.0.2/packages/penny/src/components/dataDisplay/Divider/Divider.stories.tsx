import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';

import { Text } from '../Text';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Data Display Components/Divider',
  component: Divider,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    label: {
      description: 'The text in the divider.',
      control: 'text',
      table: { category: 'props', type: { summary: 'string' } },
    },
    role: {
      control: 'text',
      description: 'The semantic meaning of the element.',
      table: {
        type: { summary: 'AriaRole' },
        category: 'accessibility',
      },
    },
    as: {
      control: 'text',
      description: 'Determines which type of element the component should be rendered as.',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'ElementType' },
        category: 'props',
      },
    },
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: "The divider's variant.",
      table: { category: 'props', defaultValue: { summary: 'horizontal' }, type: { summary: 'horizontal | vertical' } },
    },
  },
  args: {
    label: '',
    variant: 'horizontal',
  },
};
export default meta;

export const Main: StoryObj<typeof Divider> = {
  render: (args) => (
    <Storybook.Container height="50px">
      <Divider {...args} />
    </Storybook.Container>
  ),
};

export const Variants: StoryObj<typeof Divider> = {
  render: (args) => (
    <SimpleGrid columns={2}>
      <Group variant="vertical" alignItems="center">
        <Text>Horizontal</Text>
        <Divider {...args} />
      </Group>
      <Group variant="vertical" alignItems="center">
        <Storybook.Container height="100px">
          <Text>Vertical</Text>
          <Divider {...args} variant="vertical" />
        </Storybook.Container>
      </Group>
    </SimpleGrid>
  ),
};

export const WithLabel: StoryObj<typeof Divider> = {
  render: (args) => (
    <Group variant="vertical" alignItems="center">
      <Text>Horizontal</Text>
      <Divider {...args} label="Or" />
    </Group>
  ),
};
