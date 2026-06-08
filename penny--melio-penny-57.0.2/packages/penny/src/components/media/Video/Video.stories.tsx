import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';

import { Video } from './Video';

const meta: Meta<typeof Video> = {
  title: 'Media Components/Video',
  component: Video,
  argTypes: {
    src: {
      control: 'text',
      description: 'The path to the video.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'string' }, category: 'props' },
    },
    hideControls: {
      control: 'boolean',
      description: 'If specified, hides the default browser controls for video playback.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    autoPlay: {
      control: 'boolean',
      description:
        'If specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data. This will also set `isMuted` to be true.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    isMuted: {
      control: 'boolean',
      description: 'If set, the audio will be initially silenced. Will be set to true if `autoPlay` is specified.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    loop: {
      control: 'boolean',
      description:
        'If specified, the browser will automatically seek back to the start upon reaching the end of the video.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    width: {
      control: 'text',
      description: "The width of the video's display area. Either in pixels or percentages.",
      table: { type: { summary: 'string' }, category: 'props' },
    },
    height: {
      control: 'text',
      description: "The height of the video's display area. Either in pixels or percentages.",
      table: { type: { summary: 'string' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'video' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    src: 'https://cdn.free-stock.video/2252023/leaf-leaf-plant-green-close-up-nature-backgrounds-73843-small.mp4',
    autoPlay: false,
    isMuted: false,
    loop: false,
    hideControls: false,
    'data-testid': 'video',
  },
};
export default meta;

export const Main: StoryObj<typeof Video> = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const AutoPlay: StoryObj<typeof Video> = {
  args: {
    autoPlay: true,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Muted: StoryObj<typeof Video> = {
  args: {
    isMuted: true,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Loop: StoryObj<typeof Video> = {
  args: {
    loop: true,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const HideControls: StoryObj<typeof Video> = {
  args: {
    hideControls: true,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const CustomSize: StoryObj<typeof Video> = {
  render: (args) => (
    <SimpleGrid columns={2} gridGap="s">
      <Group variant="vertical">
        <Text textStyle="body2Semi">Pixels</Text>
        <Video {...args} height={150} width={300} />
      </Group>
      <Group variant="vertical">
        <Text textStyle="body2Semi">Percentages</Text>
        <Video {...args} height="100%" width="75%" />
      </Group>
    </SimpleGrid>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
