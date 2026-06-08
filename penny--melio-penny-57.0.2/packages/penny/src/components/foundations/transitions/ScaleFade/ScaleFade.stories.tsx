import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '@/components/action/Button';
import { Card } from '@/components/containers/cards/Card';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { ScaleFade } from './ScaleFade';

const meta: Meta<typeof ScaleFade> = {
  title: 'Foundations/Transitions/Scale Fade',
  component: ScaleFade,
  parameters: {
    // We'll manually decide how to snapshot this.
    storyshots: { disable: true },
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  argTypes: {
    in: {
      control: 'boolean',
      description: 'Show the component; triggers the enter or exit states',
      table: { defaultValue: { summary: 'false' } },
    },
    initialScale: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'The initial scale of the element',
      table: { defaultValue: { summary: '0.95' } },
    },
    reverse: {
      control: 'boolean',
      description: 'If true, the element will transition back to exit state',
      table: { defaultValue: { summary: 'false' } },
    },
    unmountOnExit: {
      control: 'boolean',
      description: 'If true, the element will unmount when `in={false}` and animation is done',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    in: isUsingVisualTesting(),
    initialScale: 0.95,
    reverse: false,
    unmountOnExit: false,
  },
};
export default meta;

export const Main: StoryObj<typeof ScaleFade> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(args.in ?? false);

    return (
      <Group spacing="s" variant="vertical" width="fit-content">
        {!isUsingVisualTesting() && <Button onClick={() => setIsOpen((value) => !value)} label="Click Me" />}
        <ScaleFade {...args} in={isOpen}>
          <Card paddingX="none" paddingY="none">
            <Container paddingX="xl" paddingY="xl" backgroundColor="light" width="full">
              Scale fade
            </Container>
          </Card>
        </ScaleFade>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
