import type { Preview } from '@storybook/react-vite';
import type { StoryFn } from '@storybook/react-vite';
import React from 'react';

import { defaultDesignTokens } from '../src/theme/foundations/tokens/defaultDesignTokens';
import { BreakpointProvider } from '../src/theme/providers/BreakpointProvider';
import { TokensProvider } from '../src/theme/providers/TokensProvider';
import { Blockquote, Code, H2, H3, HR, P, Table, TD, TH } from './docs/DocComponents';

const withPennyTheme = (Story: StoryFn) => (
  <TokensProvider {...defaultDesignTokens} cssVarsRoot=":root">
    <BreakpointProvider>
      <Story />
    </BreakpointProvider>
  </TokensProvider>
);

const preview: Preview = {
  decorators: [withPennyTheme],
  parameters: {
    options: {
      storySort: {
        order: [
          '✦ Design Guidelines',
          'Foundations',
          ['Color Tokens', '*'],
          'UX Patterns',
          ['Buttons vs. Links', 'Delete', 'Feedback', '*'],
          'Components',
          ['Action', ['Button', 'Icon Button', 'Naked Button', '*'], 'Navigation', ['Link', '*'], '*'],
          '*',
        ],
      },
    },
    controls: {
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        headingSelector: 'h2, h3',
        title: 'On this page',
      },
      components: {
        h2: H2,
        h3: H3,
        p: P,
        blockquote: Blockquote,
        hr: HR,
        table: Table,
        th: TH,
        td: TD,
        code: Code,
      },
    },
    viewMode: 'docs',
  },
  tags: ['autodocs'],
};

export default preview;
