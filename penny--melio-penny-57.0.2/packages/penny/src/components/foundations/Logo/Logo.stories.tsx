import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';

import { Logo } from './Logo';

/**
 * ** Pay attention: **<br />
 * The Logos displayed here per partner may not reflect the most up-to-date or accurate versions.
 *
 * The design system provides the **default** set of logo package, which partners can override as needed.
 *
 * For more details, please refer to the [theme documentation](?path=/docs/theme--docs).
 */

const meta: Meta<typeof Logo> = {
  title: 'Foundations/Logo',
  component: Logo,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Determines the size of the logo.',
      table: { defaultValue: { summary: 'large' }, type: { summary: 'small | large' }, category: 'props' },
    },
    type: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Determines the type of the logo.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'light | dark' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'logo' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    type: 'dark',
    size: 'large',
    'data-testid': 'logo',
  },
};
export default meta;

export const Main: StoryObj<typeof Logo> = {
  render: (args) => (
    <Storybook.Container
      bgColor={args.type === 'light' ? 'global.brand.700' : undefined}
      padding="s"
      borderRadius="global.200"
    >
      <Logo {...args} />
    </Storybook.Container>
  ),
};

export const Sizes: StoryObj<typeof Logo> = {
  render: (args) => (
    <Group variant="vertical">
      <Text textStyle="body1">Small</Text>
      <Storybook.Container bgColor="global.brand.700" padding="s" borderRadius="global.200">
        <Logo {...args} type="light" size="small" />
      </Storybook.Container>
      <Text textStyle="body1">Large</Text>
      <Storybook.Container bgColor="global.brand.700" padding="s" borderRadius="global.200">
        <Logo {...args} type="light" size="large" />
      </Storybook.Container>
    </Group>
  ),
};

export const Types: StoryObj<typeof Logo> = {
  render: (args) => (
    <Group variant="vertical">
      <Text textStyle="body1">Light</Text>
      <Storybook.Container bgColor="global.brand.700" padding="s" borderRadius="global.200">
        <Logo {...args} type="light" />
      </Storybook.Container>
      <Text textStyle="body1">Dark</Text>
      <Storybook.Container paddingX="s" borderRadius="global.200">
        <Logo {...args} type="dark" />
      </Storybook.Container>
    </Group>
  ),
};
