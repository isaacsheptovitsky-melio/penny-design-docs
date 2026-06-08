import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Text } from '@/components/dataDisplay/Text';

import { Group } from './Group';

const meta: Meta<typeof Group> = {
  title: 'Chromatic/Group',
  component: Group,
};
export default meta;

export const WithDividers: StoryObj<typeof Group> = {
  render: (args) => {
    const elements = ['Element 1', 'Element 2', 'Element 3'].map((label) => (
      <Storybook.ContentPlaceholder key={label} width="120px" height="120px" label={label} />
    ));

    return (
      <Group variant="vertical" alignItems="flex-start">
        <Text textStyle="heading3">Horizontal</Text>
        <Group variant="horizontal" hasDivider>
          {elements}
        </Group>
        <Text textStyle="heading3">Vertical</Text>
        <Group {...args} variant="vertical" hasDivider>
          {elements}
        </Group>
      </Group>
    );
  },
};
