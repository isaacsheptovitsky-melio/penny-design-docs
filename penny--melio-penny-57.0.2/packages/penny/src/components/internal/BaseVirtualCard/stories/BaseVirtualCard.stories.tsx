import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';

import { getUnionTypeSummary } from '../../../../test-utils';
import { BaseVirtualCard } from '..';

const variants = ['white', 'black', 'brand'];

const meta: Meta<typeof BaseVirtualCard> = {
  title: 'Data Display Components/Virtual Card/Base Virtual Card',
  component: BaseVirtualCard,
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Determines the virtual card variant.',
      table: {
        defaultValue: { summary: 'white' },
        type: { summary: getUnionTypeSummary(variants) },
        category: 'props',
      },
    },
    backgroundImageSrc: {
      control: 'text',
      description: 'The source of the background image of the virtual card.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: "'base-virtual-card'" }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    'data-testid': 'base-virtual-card',
    variant: 'white',
  },
};
export default meta;

export const Main: StoryObj<typeof BaseVirtualCard> = {};

export const Variations: StoryObj<typeof BaseVirtualCard> = {
  render: (args) => (
    <Group variant="vertical" spacing="m">
      <BaseVirtualCard {...args} variant="white" />
      <BaseVirtualCard {...args} variant="black" />
      <BaseVirtualCard {...args} variant="brand" />
    </Group>
  ),
};

export const WithBackgroundImage: StoryObj<typeof BaseVirtualCard> = {
  render: (args) => (
    <Group variant="vertical" spacing="m">
      <BaseVirtualCard {...args} variant="white" backgroundImageSrc="/assets/virtual-card-bg.jpeg" />
    </Group>
  ),
};
