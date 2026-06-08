import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';

import { Container } from '@/components/containers/Container';

import { IconButton } from '../../action/IconButton';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Chromatic/Tooltip',
  component: Tooltip,
  args: {
    children: <IconButton data-testid="trigger" variant="naked" icon="help-circle" aria-label="Info" size="small" />,
    content: 'Did you know? A group of ferrets is called a "business".',
  },
};
export default meta;

export const PlacementBottom: StoryObj<typeof Tooltip> = {
  render: (args) => (
    <Container paddingBottom="xxxl">
      <Tooltip {...args} placement="bottom" />
    </Container>
  ),
  play: async () => userEvent.hover(screen.getByTestId('trigger')),
};
