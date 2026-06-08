import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Collapse } from './Collapse';

const meta: Meta<typeof Collapse> = {
  title: 'Foundations/Transitions/Collapse',
  component: Collapse,
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
    animateOpacity: {
      control: 'boolean',
      description: 'If true, the opacity of the content will be animated',
      table: { defaultValue: { summary: 'true' } },
    },
    endingHeight: {
      control: 'text',
      description: 'Show the component; triggers the enter or exit states',
      table: { defaultValue: { summary: 'auto' } },
    },
    startingHeight: {
      control: 'text',
      description: 'The height you want the content in its collapsed state.',
      table: { defaultValue: { summary: '0' } },
    },
    unmountOnExit: {
      control: 'boolean',
      description: 'If true, the element will unmount when `in={false}` and animation is done',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    in: isUsingVisualTesting(),
    unmountOnExit: false,
    animateOpacity: true,
    endingHeight: 'auto',
    startingHeight: '0',
  },
};
export default meta;

export const Main: StoryObj<typeof Collapse> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(args.in ?? false);

    return (
      <>
        {!isUsingVisualTesting() && <Button onClick={() => setIsOpen((value) => !value)} label="Click Me" />}
        <Collapse {...args} in={isOpen}>
          <Storybook.Container
            padding="xl"
            color="white"
            marginTop="s"
            backgroundColor="global.informative.600"
            borderRadius="global.200"
          >
            Collapse
          </Storybook.Container>
        </Collapse>
      </>
    );
  },
};
