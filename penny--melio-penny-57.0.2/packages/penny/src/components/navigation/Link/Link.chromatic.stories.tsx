import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Chromatic/Link',
  component: Link,
};
export default meta;

export const Focused: StoryObj<typeof Link> = {
  render: (args) => <Link {...args} href="#" variant="standalone" label="Click me" />,
  parameters: {
    pseudo: { focusVisible: true },
  },
};
