import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Text } from '@/components/dataDisplay/Text';

import { VisuallyHidden } from './VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Accessibility Components/Visually Hidden',
  component: VisuallyHidden,
  argTypes: {
    children: {
      control: false,
      description: 'The content to be hidden visually.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'visually-hidden' }, category: 'tests' },
    },
  },
  args: {
    children: 'This text is visually hidden.',
    'data-testid': 'visually-hidden',
  },
};
export default meta;

/**
 * Turn on your screen reader.<br/>
 * Use the keyboard to read the text.<br/>
 * After the text, the visually hidden element will be announced but it won't be visible on the screen.
 */
export const Main: StoryObj<typeof VisuallyHidden> = {
  render: (args) => (
    <Storybook.Container>
      <Text>This text is visible and will be read by the screen reader.</Text>
      <VisuallyHidden {...args} />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
