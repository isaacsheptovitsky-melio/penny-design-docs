import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '@/components/action/Button';
import { Card } from '@/components/containers/cards/Card';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';

import { Fade } from './Fade';

const meta: Meta<typeof Fade> = {
  title: 'Foundations/Transitions/Fade',
  component: Fade,
  argTypes: {
    in: {
      control: 'boolean',
      description: 'Show the component; triggers the enter or exit states',
      table: { defaultValue: { summary: 'false' } },
    },
    unmountOnExit: {
      control: 'boolean',
      description: 'If true, the element will unmount when `in={false}` and animation is done',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    in: false,
    unmountOnExit: false,
  },
};
export default meta;

export const FadeTransition: StoryObj<typeof Fade> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(args.in ?? false);

    return (
      <Group spacing="s" variant="vertical" width="fit-content">
        <Button onClick={() => setIsOpen((value) => !value)} label="Click Me" />
        <Fade {...args} in={isOpen}>
          <Card paddingX="none" paddingY="none">
            <Container paddingX="xl" paddingY="xl" backgroundColor="light" width="full">
              Fade
            </Container>
          </Card>
        </Fade>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
