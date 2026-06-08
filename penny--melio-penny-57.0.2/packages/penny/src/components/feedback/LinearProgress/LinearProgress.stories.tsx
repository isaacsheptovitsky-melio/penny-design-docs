import type { Meta, StoryObj } from '@storybook/react-vite';

import { extractComponentSource } from '@/test-utils/storybook.utils';

import { WithInitialAnimationExample } from './LinearProgress.examples';
import LinearProgressExamplesRaw from './LinearProgress.examples?raw';
import { LinearProgressIndicator } from './LinearProgressIndicator';
import { LinearProgressRoot } from './LinearProgressRoot';
import { LinearProgressTrack } from './LinearProgressTrack';

const childrenPropType = `
type LinearProgressContextValue = {
  value: number;
  max: number;
  percentage: number;
};`;

const meta: Meta<typeof LinearProgressRoot> = {
  title: 'Feedback Components/Linear Progress [composable]',
  component: LinearProgressRoot,
  subcomponents: { LinearProgressTrack, LinearProgressIndicator },
  argTypes: {
    children: {
      table: {
        type: {
          summary: `ReactNode | ((props: LinearProgressContextValue) => ReactNode)`,
          detail: childrenPropType,
        },
      },
    },
  },
  args: {
    value: 30,
    max: 100,
    'data-testid': 'linear-progress',
    children: undefined,
  },
};

export default meta;

export const Main: StoryObj<typeof LinearProgressRoot> = {
  render: (args) => (
    <LinearProgressRoot {...args}>
      <LinearProgressTrack>
        <LinearProgressIndicator />
      </LinearProgressTrack>
    </LinearProgressRoot>
  ),
};

export const WithInitialAnimation: StoryObj<typeof LinearProgressRoot> = {
  render: () => <WithInitialAnimationExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(LinearProgressExamplesRaw, 'WithInitialAnimationExample') } },
  },
};
