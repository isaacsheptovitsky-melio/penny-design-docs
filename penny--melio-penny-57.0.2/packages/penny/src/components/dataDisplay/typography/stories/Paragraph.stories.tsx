import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';

import { Text } from '../../Text';
import { Typography } from '..';

const title = 'Lorem ipsum dolor sit amet';
const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene';

const meta: Meta<typeof Typography.Paragraph> = {
  title: 'Data Display Components/Typography/Paragraph [pattern]',
  component: Typography.Paragraph,
  argTypes: {
    content: {
      control: 'text',
      description: 'The content of the paragraph.',
      table: {
        category: 'props',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    title: {
      control: 'text',
      description: 'The title of the paragraph.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    size: {
      control: 'select',
      description: 'The size of the paragraph.',
      options: ['small', 'large'],
      table: {
        category: 'props',
        defaultValue: { summary: 'small' },
        type: {
          summary: 'small | large',
        },
      },
    },
  },
  args: {
    content,
    size: 'small',
  },
};
export default meta;

export const Main: StoryObj<typeof Typography.Paragraph> = {
  render: (args) => <Typography.Paragraph {...args} />,
};

export const WithTitle: StoryObj<typeof Typography.Paragraph> = {
  render: (args) => <Typography.Paragraph {...args} title={title} />,
};

export const Sizes: StoryObj<typeof Typography.Paragraph> = {
  render: (args) => (
    <Group spacing="l">
      <Group variant="vertical" hasDivider>
        <Text as="h2">Small</Text>
        <Typography.Paragraph {...args} title={title} />
      </Group>
      <Group variant="vertical" hasDivider>
        <Text as="h2">Large</Text>
        <Typography.Paragraph {...args} title={title} size="large" />
      </Group>
    </Group>
  ),
};

export const FormattedTitleAndContent: StoryObj<typeof Typography.Paragraph> = {
  render: (args) => (
    <Typography.Paragraph
      {...args}
      title={
        <>
          This is a <u>formatted</u> title
        </>
      }
      content={
        <>
          This is <u>formatted</u> content
        </>
      }
    />
  ),
};
