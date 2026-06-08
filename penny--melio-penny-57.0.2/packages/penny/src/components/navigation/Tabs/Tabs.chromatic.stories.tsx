import { Box } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Chromatic/Tabs',
  component: Tabs,
};
export default meta;

export const LabelWithWhitespace: StoryObj<typeof Tabs> = {
  render: () => (
    <Box width="300px">
      <Tabs
        activeTab="tab1"
        onChange={() => {}}
        tabs={[
          { name: 'tab1', label: 'Tab With Spaces' },
          { name: 'tab2', label: 'Another Tab Label' },
          { name: 'tab3', label: 'Long Tab Label With Multiple Words' },
        ]}
        aria-label="Tabs with whitespace labels in constrained width"
      />
    </Box>
  ),
};
