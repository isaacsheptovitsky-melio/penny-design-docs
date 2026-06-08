import type { StoryObj } from '@storybook/react-vite';

import { SkeletonCircle } from './SkeletonCircle';
import type { SkeletonCircleProps } from './SkeletonCircle.types';

/**
 * SkeletonCircle is used to display the loading state of some components.
 */
export default {
  title: 'Feedback Components/Skeletons/Skeleton Circle',
  component: SkeletonCircle,
  chromatic: { disableAnimations: true },
  argTypes: {
    diameter: {
      control: 'text',
      description: 'The diameter of the circle skeleton.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'skeleton-circle' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    'data-testid': 'skeleton-circle',
  },
};

export const Main: StoryObj<SkeletonCircleProps> = {};
