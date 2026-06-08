import type { StoryObj } from '@storybook/react-vite';

import { Skeleton } from './Skeleton';
import type { SkeletonProps } from './Skeleton.types';

/**
 * Skeleton is used to display the loading state of some components.
 */
export default {
  title: 'Feedback Components/Skeletons/Skeleton',
  component: Skeleton,
  chromatic: { disableAnimations: true },
  argTypes: {
    height: {
      control: 'text',
      description: 'The height of the skeleton.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'skeleton' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    'data-testid': 'skeleton',
  },
};

export const Main: StoryObj<SkeletonProps> = {};
