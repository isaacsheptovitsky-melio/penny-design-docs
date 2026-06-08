import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay';
import type { IconProps } from '@/components/foundations/Icon';
import { Link } from '@/components/navigation/Link';

import { Typography } from '..';
import type { _OrderedParagraphProps, _UnorderedParagraphProps } from '../_ParagraphList/_ParagraphList.types';
import { PARAGRAPH_LIST_DEFAULT_DATA_TEST_ID } from '../_ParagraphList/_ParagraphList.utils';

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene';

const paragraph: _OrderedParagraphProps = { content };

const orderedList: _OrderedParagraphProps[] = [paragraph, paragraph, paragraph, paragraph];

const reactNodeList: _OrderedParagraphProps[] = [
  {
    content: (
      <>
        This is <strong>bold</strong> and <em>italic</em> content
      </>
    ),
  },
  { content: 'Plain string content' },
  {
    content: (
      <>
        Content with a <Link href="#" label="link" variant="inline" /> inside
      </>
    ),
    title: (
      <>
        Title with <u>underline</u>
      </>
    ),
  },
];

const listWithIcons: _UnorderedParagraphProps[] = [
  { content, icon: 'truck' as IconProps['type'] },
  { content, icon: 'settings' as IconProps['type'] },
  { content, icon: 'shield' as IconProps['type'] },
];

const listWithIconsAndTitles: _UnorderedParagraphProps[] = listWithIcons.map((item, index) => ({
  ...item,
  title: `Title ${index + 1}`,
}));

const paragraphType = `{
  title?: ReactNode;
  content?: ReactNode;
  icon?: IconProps['type'];
}[]`;

const meta: Meta<typeof Typography.ParagraphList> = {
  title: 'Data Display Components/Typography/Paragraph List [pattern]',
  component: Typography.ParagraphList,
  argTypes: {
    list: {
      control: false,
      description: "An array of the prargraph's props.",
      table: {
        category: 'props',
        type: {
          summary: 'Paragraph[]',
          detail: paragraphType,
        },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the paragraphs.',
      options: ['small', 'large'],
      table: {
        category: 'props',
        defaultValue: { summary: 'small' },
        type: {
          summary: 'small | large',
        },
      },
    },
    type: {
      control: 'select',
      description: 'The type of the list.',
      options: ['ordered', 'unordered'],
      table: {
        category: 'props',
        type: {
          summary: 'ordered | unordered',
        },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: PARAGRAPH_LIST_DEFAULT_DATA_TEST_ID },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    list: orderedList,
    type: 'ordered',
    size: 'small',
  },
};
export default meta;

export const Main: StoryObj<typeof Typography.ParagraphList> = {
  render: (args) => <Typography.ParagraphList {...args} />,
};

export const Ordered: StoryObj<typeof Typography.ParagraphList> = {
  render: (args) => (
    <Group spacing="l">
      <Group variant="vertical" hasDivider>
        <Text as="h2">Small</Text>
        <Typography.ParagraphList {...args} />
      </Group>
      <Group variant="vertical" hasDivider>
        <Text as="h2">Large</Text>
        <Typography.ParagraphList {...args} size="large" />
      </Group>
    </Group>
  ),
};

export const UnorderedWithBullets: StoryObj<typeof Typography.ParagraphList> = {
  render: (args) => (
    <Group spacing="l">
      <Group variant="vertical" hasDivider>
        <Text as="h2">Small</Text>
        <Typography.ParagraphList {...args} type="unordered" />
      </Group>
      <Group variant="vertical" hasDivider>
        <Text as="h2">Large</Text>
        <Typography.ParagraphList {...args} type="unordered" size="large" />
      </Group>
    </Group>
  ),
};

export const UnorderedWithIcons: StoryObj<typeof Typography.ParagraphList> = {
  render: (args) => (
    <Group spacing="l">
      <Group variant="vertical" hasDivider>
        <Text as="h2">Small</Text>
        <Typography.ParagraphList {...args} type="unordered" list={listWithIcons} />
      </Group>
      <Group variant="vertical" hasDivider>
        <Text as="h2">Large</Text>
        <Typography.ParagraphList {...args} type="unordered" size="large" list={listWithIcons} />
      </Group>
    </Group>
  ),
};

export const WithTitles: StoryObj<typeof Typography.ParagraphList> = {
  render: (args) => (
    <Group spacing="l">
      <Group variant="vertical" hasDivider>
        <Text as="h2">Small</Text>
        <Typography.ParagraphList {...args} type="unordered" list={listWithIconsAndTitles} />
      </Group>
      <Group variant="vertical" hasDivider>
        <Text as="h2">Large</Text>
        <Typography.ParagraphList {...args} type="unordered" size="large" list={listWithIconsAndTitles} />
      </Group>
    </Group>
  ),
};

export const FormattedTitleAndContent: StoryObj<typeof Typography.ParagraphList> = {
  render: (args) => (
    <Group spacing="l">
      <Group variant="vertical" hasDivider>
        <Text as="h2">Small</Text>
        <Typography.ParagraphList {...args} list={reactNodeList} />
      </Group>
      <Group variant="vertical" hasDivider>
        <Text as="h2">Large</Text>
        <Typography.ParagraphList {...args} size="large" list={reactNodeList} />
      </Group>
    </Group>
  ),
};
