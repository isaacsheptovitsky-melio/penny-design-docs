import { Box } from '@chakra-ui/react';
import type { StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { SegmentedControl, SegmentedControlItem } from '../index';

const meta = {
  title: 'Chromatic/Segmented Control',
  component: SegmentedControl,
};

export default meta;

export const EqualWidthSegments: StoryObj<typeof SegmentedControl> = {
  render: () => {
    const [value, setValue] = useState('short');

    return (
      <Box width="600px">
        <SegmentedControl isFullWidth onChange={(event) => setValue(event.target.value)}>
          <SegmentedControlItem value="short" checked={value === 'short'}>
            Short
          </SegmentedControlItem>
          <SegmentedControlItem value="medium" checked={value === 'medium'}>
            Medium Length
          </SegmentedControlItem>
          <SegmentedControlItem value="long" checked={value === 'long'}>
            Very Very Long Label Text
          </SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl onChange={(event) => setValue(event.target.value)}>
          <SegmentedControlItem value="short" checked={value === 'short'}>
            Short
          </SegmentedControlItem>
          <SegmentedControlItem value="medium" checked={value === 'medium'}>
            Medium Length
          </SegmentedControlItem>
          <SegmentedControlItem value="long" checked={value === 'long'}>
            Very Very Long Label Text
          </SegmentedControlItem>
        </SegmentedControl>
      </Box>
    );
  },
};
