import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';

import { CircularProgress } from './CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'Feedback Components/Circular Progress',
  component: CircularProgress,
  argTypes: {
    percentage: {
      control: 'number',
      description: 'Sets current progress percentage state.',
      type: { required: true, name: 'number' },
      table: { category: 'props', type: { summary: 'number' } },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'circular-progress' }, category: 'tests' },
    },
    transition: {
      control: 'text',
      description:
        'CSS timing for the circular progress transition (e.g., `0.6s ease-in-out`). Should **not** include the CSS property (e.g., `stroke-dasharray`).',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: '0.6s ease' },
        category: 'props',
      },
    },
  },
  args: {
    percentage: 70,
    transition: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof CircularProgress> = {};

export const CustomTransition: StoryObj<typeof CircularProgress> = {
  render: (args) => (
    <Group width="fit-content" spacing="xxl">
      <Group variant="vertical" alignItems="center">
        <Text as="p">1.5s ease-in-out</Text>
        <CircularProgress {...args} transition="1.5s ease-in-out" />
      </Group>

      <Group variant="vertical" alignItems="center">
        <Text as="p">Without transition</Text>
        <CircularProgress {...args} transition={null} />
      </Group>
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Demo: StoryObj<typeof CircularProgress> = {
  render: (args) => {
    const [progress, setProgress] = useState(0);

    const progressRef = useRef(() => {});

    useEffect(() => {
      progressRef.current = () => {
        if (progress > 100) {
          setProgress(0);
        } else {
          const diff = Math.random() * 10;
          setProgress(progress + diff);
        }
      };
    });

    useEffect(() => {
      const timer = setInterval(() => {
        progressRef.current();
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }, []);

    return <CircularProgress {...args} percentage={progress} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
