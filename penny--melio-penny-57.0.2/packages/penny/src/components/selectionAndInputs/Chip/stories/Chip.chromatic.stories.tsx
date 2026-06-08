import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Chip } from '../Chip';

const meta: Meta<typeof Chip> = {
  title: 'Chromatic/Chip',
  component: Chip,
};
export default meta;

export const Hover: StoryObj<typeof Chip> = {
  render: (args) => <Chip {...args} label="Filter" />,
  parameters: {
    pseudo: { hover: true },
  },
};

export const Focused: StoryObj<typeof Chip> = {
  render: (args) => <Chip {...args} label="Filter" />,
  parameters: {
    pseudo: { focusVisible: true },
  },
};

export const Pressed: StoryObj<typeof Chip> = {
  render: (args) => <Chip {...args} label="Filter" />,
  parameters: {
    pseudo: { active: true },
  },
};
