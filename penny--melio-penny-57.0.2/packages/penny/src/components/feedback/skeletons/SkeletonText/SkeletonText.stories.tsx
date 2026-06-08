import type { StoryObj } from '@storybook/react-vite';

import { themeSpaceKeys } from '@/theme/foundations/spaces';

import { SkeletonText } from './SkeletonText';
import type { SkeletonTextProps } from './SkeletonText.types';

/**
 * SkeletonText is used to display the loading state of some components.
 */
export default {
  title: 'Feedback Components/Skeletons/Skeleton Text',
  component: SkeletonText,
  chromatic: { disableAnimations: true },
  argTypes: {
    spacing: {
      control: 'select',
      options: themeSpaceKeys,
      description: 'The spacing between the lines of the text skeleton.',
      table: { type: { summary: Object.values(themeSpaceKeys).join(' | ') }, category: 'props' },
    },
    numberOfLines: {
      control: 'number',
      description: 'The number of lines to present in the skeleton.',
      table: { type: { summary: 'number' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'skeleton-text' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    'data-testid': 'skeleton-text',
  },
};

export const Main: StoryObj<SkeletonTextProps> = {};
