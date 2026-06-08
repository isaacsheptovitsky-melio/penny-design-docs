import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay';
import type { IconProps } from '@/components/foundations/Icon';

import { Typography } from '..';
import type { _OrderedParagraphProps, _UnorderedParagraphProps } from '../_ParagraphList/_ParagraphList.types';

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene';

const paragraph: _OrderedParagraphProps = { content };

const orderedList: _OrderedParagraphProps[] = [paragraph, paragraph, paragraph, paragraph];

const listWithIcons: _UnorderedParagraphProps[] = [
  { content, icon: 'truck' as IconProps['type'] },
  { content, icon: 'settings' as IconProps['type'] },
  { content, icon: 'shield' as IconProps['type'] },
];

const meta: Meta<typeof Typography.ParagraphList> = {
  title: 'Chromatic/Paragraph List [pattern]',
  component: Typography.ParagraphList,
  argTypes: {},
  args: {
    list: orderedList,
    type: 'ordered',
  },
};
export default meta;

export const Inverse: StoryObj<typeof Typography.ParagraphList> = {
  render: (args) => (
    <Storybook.Container backgroundColor="semantic.fill.inverse" color="semantic.text.inverse" padding="m">
      <Group spacing="l">
        <Group variant="vertical" hasDivider>
          <Text as="h2" color="semantic.text.inverse">
            Ordered
          </Text>
          <Typography.ParagraphList {...args} />
        </Group>
        <Group variant="vertical" hasDivider>
          <Text as="h2" color="semantic.text.inverse">
            Unordered
          </Text>
          <Typography.ParagraphList {...args} type="unordered" />
        </Group>
        <Group variant="vertical" hasDivider>
          <Text as="h2" color="semantic.text.inverse">
            Icons
          </Text>
          <Typography.ParagraphList {...args} type="unordered" list={listWithIcons} />
        </Group>
      </Group>
    </Storybook.Container>
  ),
};
