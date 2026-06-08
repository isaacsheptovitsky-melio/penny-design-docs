import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { Slide } from './Slide';

const directions = ['bottom', 'left', 'right', 'top'];

const meta: Meta<typeof Slide> = {
  title: 'Foundations/Transitions/Slide',
  component: Slide,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    direction: {
      control: 'select',
      options: directions,
      description: 'The direction to slide from.',
      table: {
        defaultValue: { summary: 'right' },
        type: { summary: getUnionTypeSummary(directions) },
        category: 'props',
      },
    },
    in: {
      control: 'boolean',
      description: 'Show the component; triggers the enter or exit states.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    unmountOnExit: {
      control: 'boolean',
      description: 'If true, the element will unmount when `in={false}` and animation is done.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'slide' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    direction: 'right',
    in: false,
    unmountOnExit: true,
    'data-testid': 'slide',
  },
};
export default meta;

export const Main: StoryObj<typeof Slide> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(args.in ?? false);

    const isSide = args.direction === 'left' || args.direction === 'right';

    return (
      <>
        <Button onClick={() => setIsOpen(!isOpen)} label="Click Me" />
        <Slide {...args} in={isOpen} style={{ zIndex: 10 }} onClick={() => setIsOpen(false)}>
          <Storybook.ContentPlaceholder height={isSide ? '100%' : '300px'} />
        </Slide>
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
