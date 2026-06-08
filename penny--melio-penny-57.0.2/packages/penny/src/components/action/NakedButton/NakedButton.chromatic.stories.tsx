import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';

import { NakedButton } from './NakedButton';

const meta: Meta<typeof NakedButton> = {
  title: 'Chromatic/Naked Button',
  component: NakedButton,
  args: {
    label: 'Button',
  },
};
export default meta;

export const Focused: StoryObj<typeof NakedButton> = {
  render: (args) => (
    <Group>
      <NakedButton {...args} variant="primary" label="primary" />
      <NakedButton {...args} variant="secondary" label="secondary" />
      <NakedButton {...args} variant="critical" label="critical" />
      <Storybook.Container
        padding="xs"
        borderRadius="global.200"
        bgColor="semantic.surface.inverse"
        width="fit-content"
      >
        <NakedButton {...args} variant="invert" label="invert" />
      </Storybook.Container>
    </Group>
  ),
  parameters: {
    pseudo: { focusVisible: true, focus: true },
  },
};
