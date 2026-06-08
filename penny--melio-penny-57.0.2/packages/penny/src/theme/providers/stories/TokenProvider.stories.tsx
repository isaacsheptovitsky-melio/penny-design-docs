import { Box } from '@chakra-ui/react';
import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Button, Group, NakedButton, TokensProvider } from '../../..';

const meta: Meta<typeof TokensProvider> = {
  title: 'Chromatic/Tokens Provider',
  // demonstration
  parameters: { a11y: { test: 'off' } },
  args: {},
};
export default meta;

export const Main: StoryObj<typeof TokensProvider> = {
  render: () => (
    <Group>
      <Box id="default">
        <TokensProvider cssVarsRoot="#default">
          <Button label="DEFAULT" />
        </TokensProvider>
      </Box>
      <Box id="global">
        <TokensProvider colors={{ global: { brand: { '700': 'blue' } } }} cssVarsRoot="#global">
          <Button label="GLOBAL" />
        </TokensProvider>
      </Box>
      <Box id="semantic">
        <TokensProvider colors={{ semantic: { action: { primary: { rest: 'blue' } } } }} cssVarsRoot="#semantic">
          <Button label="SEMANTIC" />
        </TokensProvider>
      </Box>
      <Box id="component">
        <TokensProvider
          colors={{ component: { button: { textPrimary: { rest: { label: 'blue' } } } } }}
          cssVarsRoot="#component"
        >
          <NakedButton label="COMPONENT" />
        </TokensProvider>
      </Box>
    </Group>
  ),
};
