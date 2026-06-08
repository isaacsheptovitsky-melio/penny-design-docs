import { capitalize } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { getDefaultIllustrations } from '@/theme/defaultIllustrations';

import { Illustration } from './Illustration';

const sizeOptions = ['small', 'medium', 'large'] as const;
const illustrationTypes = Object.keys(getDefaultIllustrations('')).sort();

/**
 * ** Pay attention: **<br />
 * The illustrations displayed here per partner may not reflect the most up-to-date or accurate versions.
 *
 * The design system provides the **default** set of illustration package, which partners can override as needed.
 *
 * For more details, please refer to the [theme documentation](?path=/docs/theme--docs).
 */
const meta: Meta<typeof Illustration> = {
  title: 'Foundations/Illustration',
  component: Illustration,
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'Determines the size of the illustration.',
      table: {
        category: 'props',
        type: { summary: sizeOptions.join(' | ') },
        defaultValue: { summary: 'medium' },
      },
    },
    type: {
      control: 'select',
      options: illustrationTypes,
      description: 'Determines the type of the illustration.',
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: { summary: illustrationTypes.join(' | ') },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'illustration' },
        category: 'tests',
      },
    },
  },
  args: {
    type: 'pending',
    size: 'medium',
  },
};
export default meta;

export const Main: StoryObj<typeof Illustration> = {};

export const Sizes: StoryObj<typeof Illustration> = {
  args: {
    ...Main.args,
    type: 'bank-missing',
  },
  render: (args) => (
    <Group spacing="l" width="full" justifyContent="space-evenly">
      {sizeOptions.map((size) => (
        <Group key={size} variant="vertical" alignItems="center">
          <Text textStyle="body1">{capitalize(size)}</Text>
          <Illustration {...args} size={size} />
        </Group>
      ))}
    </Group>
  ),
};

export const Types: StoryObj<typeof Illustration> = {
  render: (args) => (
    <Storybook.Gallery asset={<Illustration {...args} size="small" />} labels={illustrationTypes} alignItems="center" />
  ),
};
