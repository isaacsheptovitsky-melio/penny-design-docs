import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';

import { LinearProgressIndicator } from './LinearProgressIndicator';
import { LinearProgressRoot } from './LinearProgressRoot';
import { LinearProgressTrack } from './LinearProgressTrack';

const meta: Meta<typeof LinearProgressRoot> = {
  title: 'Chromatic/Linear Progress',
  component: LinearProgressRoot,
};
export default meta;

export const Steps: StoryObj<typeof LinearProgressRoot> = {
  render: () => {
    const max = 3;
    return (
      <SimpleGrid columns={4} gap="m">
        {Array.from(Array(max + 1), (_, index) => (
          <Group variant="vertical" key={index}>
            ({index}/{max})
            <LinearProgressRoot value={index} max={max}>
              <LinearProgressTrack>
                <LinearProgressIndicator />
              </LinearProgressTrack>
            </LinearProgressRoot>
          </Group>
        ))}
      </SimpleGrid>
    );
  },
};
